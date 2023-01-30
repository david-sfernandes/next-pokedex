import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Measure from "../../components/Measure";
import TypePill from "../../components/TypePill";
import { SparklesIcon } from "@heroicons/react/24/outline";
import EvoLine from "../../components/EvoLine";
import MaleIcon from "../../components/MaleIcon";
import FemaleIcon from "../../components/FemaleIcon";

export default function Pokemon() {
  const { id } = useRouter().query;
  const [pokemon, setPokemon] = useState<Pokemon>();
  const [specie, setSpecie] = useState<PokemonSpecie>();
  const [evoChain, setEvoChain] = useState<EvoChain>();
  type fromMapT = keyof typeof fromMap;
  const fromMap = {
    normal: "from-normal",
    fire: "from-fire",
    water: "from-water",
    electric: "from-electric",
    grass: "from-grass",
    ice: "from-ice",
    fighting: "from-fighting",
    poison: "from-poison",
    ground: "from-ground",
    flying: "from-flying",
    psychic: "from-psychic",
    bug: "from-bug",
    rock: "from-rock",
    ghost: "from-ghost",
    dragon: "from-dragon",
    dark: "from-dark",
    steel: "from-steel",
    fairy: "from-fairy",
  }

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, { cache: "force-cache" })
      .then((res) => res.json())
      .then(({ id, name, height, weight, sprites, types }) =>
        setPokemon({
          id,
          name,
          height,
          weight,
          sprites: sprites.other.home,
          types,
        })
      );
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
      .then((res) => res.json())
      .then(({ evolution_chain, flavor_text_entries }) =>
        setSpecie({
          evoChainUrl: evolution_chain.url,
          flavorText: flavor_text_entries[0]?.flavor_text,
        })
      );
  }, [id]);

  useEffect(() => {
    fetch(specie?.evoChainUrl)
      .then((res) => res.json())
      .then((res) => setEvoChain(res.chain));
  }, [specie]);

  const imgSize = 450;

  return (
    <div
      className={`flex min-h-screen flex-col items-center justify-center bg-gray-800 text-white bg-gradient-to-b 
      ${ pokemon ? fromMap[pokemon.types[0].type.name as fromMapT] : "from-gray-900"} to-gray-900`}
    >
      {pokemon && (
        <main className="flex flex-col items-center justify-end mx-2 max-w-5xl w-full
        min-h-screen">
          <div className="h-[230px]"/>
          <div className="p-6 bg-gray-800 flex flex-col items-center rounded-t-3xl w-full">
            <Image
              src={pokemon.sprites.front_default}
              alt={pokemon.name + " image"}
              width={imgSize}
              height={imgSize}
              className="-mt-80"
            />
            <div className="flex space-x-4">
              <div className="flex space-x-2">
                <MaleIcon/>
                <FemaleIcon/>
              </div>
                <SparklesIcon className="h-7"/>
            </div>
            <h1 className="text-4xl capitalize font-bold mt-6">
              {pokemon.name}{" "}
              <span className="font-medium text-gray-200">#{pokemon.id}</span>
            </h1>
            <p className="text-xl p-2">
              {/* /f */}
              {specie && <p className="md:max-w-2xl text-center">{specie.flavorText?.replace('\f', ' ')}</p>}
            </p>
            <div className="flex p-4 items-center">
              {pokemon.types.map((t) => (
                <TypePill type={t.type.name} lg/>
              ))}
            </div>
            <section className="flex space-x-4 items-center p-2">
              <Measure type="height" value={pokemon.height} />
              <Measure type="weight" value={pokemon.weight} />
            </section>
            <section className="w-full">
              <h2 className="font-semibold text-3xl p-4">Evolutions</h2>
              {evoChain && <EvoLine chain={evoChain} />}
            </section>
          </div>
        </main>
      )}
    </div>
  );
}
