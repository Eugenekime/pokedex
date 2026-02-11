export type PokemonList = {
  name: string;
  url: string;
};

export type PokemonDetails = {
  id: number;
  name: string;

  sprites: {
    other: {
      ['official-artwork']: {
        front_default: string;
      };
    };
  };

  types: {
    type: {
      name: string;
    };
  }[];
};

export type Pokemons = {
  id: number;
  name: string;
  img: string;
  types: { name: string }[];
};
