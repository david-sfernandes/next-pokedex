import Image from "next/image";
import Link from "next/link";
import { memo, useEffect, useState } from "react";
import LoadingCard from "./LoadingCard";
import TypePill from "./TypePill";

export const Card = ({ url }: { url: string }) => {
  const [pokemon, setPokemon] = useState<PokemonCard | null>();

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then(({ id, name, sprites, types }) =>
        setPokemon({
          id,
          name,
          sprite:
            sprites.other.home.front_default ||
            sprites.other["official-artwork"].front_default,
          types,
        })
      );
  }, [url]);

  console.log(`render ${url}`);

  return (
    <>
      {pokemon ? (
        <Link
          href={`/pokemon/${pokemon.id}`}
          className="card"
        >
          <Image
            src={pokemon.sprite}
            height={100}
            width={100}
            className="w-52 z-10 m-auto"
            alt={pokemon.name}
          />
          <div className="bg-gray-700 rounded-2xl shadow-md p-4 pt-32 -mt-28">
            <h3 className="font-semibold capitalize text-2xl">
              {pokemon.name}
              <span className="font-normal text-gray-200"> #{pokemon.id}</span>
            </h3>
            <div className="flex justify-center space-x-2 mt-2">
              {pokemon.types.map((type) => (
                <TypePill key={type.type.name} type={type.type.name} />
              ))}
            </div>
          </div>
        </Link>
      ) : (
        <LoadingCard />
      )}
    </>
  );
};

export const MemoCard = memo(({ url }: { url: string }) => {
  return <Card url={url} />;
});
