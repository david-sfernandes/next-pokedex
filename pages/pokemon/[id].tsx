import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Measure from "../../components/Measure";
import TypePill from "../../components/TypePill";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { SparklesIcon as SolidSparklesIcon } from "@heroicons/react/24/solid";
import EvoLine from "../../components/EvoLine";
import MaleIcon from "../../components/MaleIcon";
import FemaleIcon from "../../components/FemaleIcon";
import LoadingCard from "../../components/LoadingCard";
import Link from "next/link";

export default function Pokemon() {
  const { id } = useRouter().query;
  const [pokemon, setPokemon] = useState<Pokemon>();
  const [specie, setSpecie] = useState<PokemonSpecie>();
  const [evoChain, setEvoChain] = useState<EvoChain>();
  const [isShiny, setIsShiny] = useState(false);
  const [isDefault, setIsDefault] = useState(true);
  const srcImg = `front${isShiny ? "_shiny" : ""}${
    isDefault && !isShiny ? "_default" : ""
  }${!isDefault ? "_female" : ""}`;

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
  };

  useEffect(() => {
    setEvoChain(null);
    setIsDefault(true);
    setIsShiny(false);
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
      className={`flex min-h-screen flex-col items-center justify-center bg-gray-800 
      text-white bg-gradient-to-b to-gray-900 px-2 relative
      ${
        pokemon
          ? fromMap[pokemon.types[0].type.name as fromMapT]
          : "from-gray-900"
      }`}
    >
      <Image src={"/bg-img.png"} fill alt="background" className="absolute animate-pulse-slow" />
      {pokemon && (
        <main
          className="flex flex-col items-center justify-end max-w-5xl w-full
        min-h-screen z-10"
        >
          <div className="h-[260px]" />
          <div className="p-6 bg-gray-800 flex flex-col items-center rounded-t-3xl w-full">
            <div className="-mt-72 grid grid-cols-[1fr_450px_1fr] items-baseline">
              {pokemon.id > 1 && (
                <Link href={`/pokemon/${pokemon.id - 1}`}>
                  <ChevronLeftIcon className="h-14 text-gray-200 bg-gray-700 border-8 border-gray-700 rounded-full" />
                </Link>
              )}
              <Image
                src={`${pokemon.sprites[srcImg as keyof Sprites]}`}
                alt={pokemon.name + " image"}
                width={imgSize}
                height={imgSize}
                className="col-start-2"
              />
              {pokemon.id < 1279 && (
                <Link href={`/pokemon/${pokemon.id + 1}`}>
                  <ChevronRightIcon className="h-14 text-gray-200 bg-gray-700 border-8 border-gray-700 rounded-full" />
                </Link>
              )}
            </div>
            <div className="flex space-x-6 items-center">
              {pokemon.sprites.front_female && (
                <div className="flex">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      value=""
                      defaultChecked={!isDefault}
                      onClick={() => setIsDefault((isDefault) => !isDefault)}
                      className="sr-only peer"
                    />
                    <div
                      className="w-[78px] h-[41px] bg-gray-200 peer-focus:outline-none hover:ring-blue-800 rounded-full peer 
                dark:bg-gray-700 peer-checked:after:translate-x-full 
                peer-checked:after:border-white after:content-[''] after:absolute 
                after:top-[3px] after:left-[3px] after:bg-white after:border-gray-300 
                after:border after:rounded-full after:h-9 after:w-9 after:transition-all 
                dark:border-gray-600 flex justify-between items-center p-2"
                    >
                      <MaleIcon />
                      <FemaleIcon />
                    </div>
                  </label>
                </div>
              )}
              <button
                onClick={() => setIsShiny((shiny) => !shiny)}
                className={`border rounded-full border-gray-700 p-2 ${
                  isShiny && "bg-gray-700"
                } transform transition-all duration-100 ease-in`}
              >
                {isShiny ? (
                  <SolidSparklesIcon className="h-7 text-yellow-500" />
                ) : (
                  <SparklesIcon className="h-7" />
                )}
              </button>
            </div>
            <h1 className="text-4xl capitalize font-bold mt-6">
              {pokemon.name}{" "}
              <span className="font-medium text-gray-200">#{pokemon.id}</span>
            </h1>
            <p className="text-xl p-2">
              {specie && (
                <p className="md:max-w-2xl text-center">
                  {specie.flavorText?.replace("\f", " ")}
                </p>
              )}
            </p>
            <div className="flex p-4 items-center space-x-3">
              {pokemon.types.map((t) => (
                <TypePill type={t.type.name} lg />
              ))}
            </div>
            <section className="flex space-x-4 items-center p-2">
              <Measure type="height" value={pokemon.height} />
              <Measure type="weight" value={pokemon.weight} />
            </section>
            <section className="w-full text-center">
              <h2 className="font-bold text-3xl p-4">Evolutions</h2>
              {evoChain ? <EvoLine chain={evoChain} /> : <LoadingCard />}
            </section>
          </div>
        </main>
      )}
    </div>
  );
}
