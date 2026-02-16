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

    evolutionUrl: speciesData.evolution_chain.url,
  };
}
