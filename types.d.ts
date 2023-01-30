type CardProps = {
  img: string;
  name: string;
  types: string[];
  id: number;
}

type ResultData = {
  name: string;
  url: string;
}

type PokemonCard = {
  id: number;
  name: string;
  types: Type[];
  sprite: string;
}

type Type = {
  slot: number;
  type: {
    name: string;
    url: string;
  }
}

type Sprites = {
  front_default: string
  front_female: string | null;
  front_shiny: string;
  front_shiny_female: string | null;
}

//https://pokeapi.co/api/v2/pokemon/{id}
type Pokemon = {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: Sprites;
  types: Type[];
}

//https://pokeapi.co/api/v2/pokemon-species/{id}
type PokemonSpecie = {
  evoChainUrl: url;
  flavorText: string | null;
}

// https://pokeapi.co/api/v2/evolution-chain/{evochainid}/
type EvoChain = {
  is_baby: boolean;
  species: ResultData;
  evolves_to: EvoChain[];
}