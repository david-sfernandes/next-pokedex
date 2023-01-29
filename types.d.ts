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
  types: TypeProps[];
  sprite: string;
}

type TypeProps = {
  slot: number;
  type: {
    name: string;
    url: string;
  }
}