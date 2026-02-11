import { request } from './client';

type PokemonListParams = {
  limit?: number;
  offset?: number;
};

export function getPokemonList({ limit, offset }: PokemonListParams) {
  return request(`/pokemon/?limit=${limit}&offset=${offset}`);
}

export function getPokemonDetails(name: string) {
  return request(`/pokemon/${name}`);
}

export function getAllPokemons() {
  return request(`/pokemon?limit=1350&offset=0`);
}

export const getPokemonIdByUrl = (url: string) => {
  const parts = url.split('/');
  return parts[parts.length - 2];
};
