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

export type PokemonDetail = {
  id: number;
  name: string;
  image: string;

  types: string[];

  height: number;
  weight: number;

  abilities: {
    name: string;
    isHidden: boolean;
  }[];

  stats: {
    name: string;
    value: number;
  }[];

  description: string;

  genus: string;
  color: string;
  habitat: string | null;
  eggGroups: string[];

  evolutionUrl: string;
};

export type Pokemons = {
  id: number;
  name: string;
  img: string;
  types: { name: string }[];
};
