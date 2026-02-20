import { PokemonDetail } from '@/types/pokemon';
import { request } from './client';

type PokemonListParams = {
  limit?: number;
  offset?: number;
};

export async function getPokemonList({ limit, offset }: PokemonListParams) {
  return request(`/pokemon/?limit=${limit}&offset=${offset}`);
}

export async function getAllPokemons() {
  return request(`/pokemon?limit=1350&offset=0`);
}

export const getPokemonIdByUrl = (url: string) => {
  const parts = url.split('/');
  return parts[parts.length - 2];
};

export async function getPokemonDetails(id: number): Promise<PokemonDetail> {
  const [pokemonRes, speciesRes] = await Promise.all([
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`),
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`),
  ]);

  const pokemonData = await pokemonRes.json();
  const speciesData = await speciesRes.json();

  const evolutionRes = await fetch(speciesData.evolution_chain.url);
  const evolutionData = await evolutionRes.json();

  const englishEntries = speciesData.flavor_text_entries.filter(
    (item: any) => item.language.name === 'en'
  );

  const entry =
    englishEntries.find((item: any) => item.version.name === 'sword') ||
    englishEntries.find((item: any) => item.version.name === 'shield') ||
    englishEntries[englishEntries.length - 1];

  const description =
    entry?.flavor_text
      .replace(/\f/g, ' ')
      .replace(/\n/g, ' ')
      .replace(/\s+/g, ' ')
      .trim() || '';

  const genusEntry = speciesData.genera.find(
    (g: any) => g.language.name === 'en'
  );

  const habitat = speciesData.habitat ? speciesData.habitat.name : null;

  function getEvolutions(
    chain: any
  ): { name: string; minLevel: number | null }[] {
    const result: { name: string; minLevel: number | null }[] = [];
    let current = chain;

    result.push({
      name: current.species.name,
      minLevel: null,
    });

    while (current.evolves_to.length > 0) {
      const next = current.evolves_to[0];
      const details = next.evolution_details[0];

      result.push({
        name: next.species.name,
        minLevel: details?.min_level || null,
      });

      current = next;
    }

    return result;
  }
  const evolutionList = getEvolutions(evolutionData.chain);

  const evolutions = await Promise.all(
    evolutionList.map(
      async (item: { name: string; minLevel: number | null }) => {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${item.name}`
        );
        const data = await res.json();

        return {
          name: data.name[0].toUpperCase() + data.name.slice(1),
          image: data.sprites.other['official-artwork'].front_default,
          minLevel: item.minLevel,
        };
      }
    )
  );

  return {
    id: pokemonData.id,
    name: pokemonData.name,
    image: pokemonData.sprites.other['official-artwork'].front_default,

    types: pokemonData.types.map((t: any) => t.type.name),

    height: pokemonData.height / 10,
    weight: pokemonData.weight / 10,

    abilities: pokemonData.abilities.map((a: any) => ({
      name: a.ability.name[0].toUpperCase() + a.ability.name.slice(1),
      isHidden: a.is_hidden,
    })),

    stats: pokemonData.stats.map((s: any) => ({
      name: s.stat.name,
      value: s.base_stat,
    })),

    description,

    genus: genusEntry?.genus || '',
    color: speciesData.color.name,
    habitat: habitat[0].toUpperCase() + habitat.slice(1),

    eggGroups: speciesData.egg_groups.map(
      (e: any) => e.name[0].toUpperCase() + e.name.slice(1)
    ),

    evolutions,
    moves: pokemonData.moves.map((item: any) => ({
      name: item.move.name[0].toUpperCase() + item.move.name.slice(1),
      url: item.move.url,
    })),
  };
}
