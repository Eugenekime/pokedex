import { create } from 'zustand';
import { PokemonDetails, PokemonList, Pokemons } from '@/types/pokemon';

type Store = {
  pokemons: Pokemons[];
  setPokemons: (newPokemons: PokemonDetails[]) => void;
  typeForFilter: string | null;
  setTypeForFilter: (type: string | null) => void;
  pokemonSearchList: PokemonList[];
  setPokemonSearchList: (newList: PokemonList[]) => void;
  favoriteList: number[];
  setFavoriteList: (list: number[]) => void;
};

const useStore = create<Store>((set) => ({
  pokemons: [],
  setPokemons: (newPokemons) =>
    set((state) => {
      const newArr = newPokemons.map((obj) => ({
        id: obj.id,
        name: obj.name,
        img: obj.sprites.other['official-artwork'].front_default,
        types: obj.types.map((t) => ({
          name: t.type.name,
        })),
      }));
      return {
        pokemons: [...state.pokemons, ...newArr],
      };
    }),
  /// filter by types
  typeForFilter: null,
  setTypeForFilter: (type) => set({ typeForFilter: type }),
  /// searching
  pokemonSearchList: [],
  setPokemonSearchList: (newList) =>
    set((state) => ({
      pokemonSearchList: [...state.pokemonSearchList, ...newList],
    })),

  /// favorites
  favoriteList: [],
  toggleFavorite: () => {},
  setFavoriteList: (list) =>
    set({
      favoriteList: list,
    }),
}));

export default useStore;
