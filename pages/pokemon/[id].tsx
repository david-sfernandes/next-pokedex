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
import Link from "next/link";
import { Card } from "../../components/Card";
import GenderSwitcher from "../../components/GenderSwitcher";
import Layout from "../../components/Layout";

export default function PokemonPage() {
  const { id } = useRouter().query;
  const [pokemon, setPokemon] = useState<Pokemon>();
  const [specie, setSpecie] = useState<PokemonSpecie>();
  const [evoChain, setEvoChain] = useState<EvoChain | null>();
  const [isShiny, setIsShiny] = useState(false);
  const [isDefault, setIsDefault] = useState(true);
  const srcImg = `front${isShiny ? "_shiny" : ""}${
    isDefault && !isShiny ? "_default" : ""
  }${!isDefault ? "_female" : ""}`;

  type FromMapKey = keyof typeof fromMap;
  const fromMap = {
    grass: "from-grass to-green-700",
    normal: "from-normal to-yellow-100",
    water: "from-water to-blue-600",
    fire: "from-fire to-orange-700",
    electric: "from-electric to-yellow-500",
    ice: "from-ice to-blue-300",
    fighting: "from-fighting to-red-600",
    psychic: "from-psychic to-pink-500",
    dark: "from-dark to-amber-900",
    bug: "from-bug to-lime-500",
    ground: "from-ground to-ambar-500",
    poison: "from-poison to-purple-600",
    ghost: "from-ghost to-violet-700",
    dragon: "from-dragon to-indigo-800",
    fairy: "from-fairy to-pink-400",
    steel: "from-steel to-slate-500",
    rock: "from-rock to-ambar-500",
    flying: "from-flying to-indigo-500",
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
          sprites: sprites.other.home.front_default
            ? sprites.other.home
            : sprites.other["official-artwork"],
          types,
        })
      );
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
      .then((res) => res.json())
      .then(({ evolution_chain, flavor_text_entries }) =>
        setSpecie({
          evoChainUrl: evolution_chain?.url,
          flavorText: flavor_text_entries[0]?.flavor_text,
        })
      );
  }, [id]);

  useEffect(() => {
    fetch(specie?.evoChainUrl)
      .then((res) => res.json())
      .then((res) => setEvoChain(res.chain));
  }, [specie]);

  return (
    <Layout
      title={
        pokemon
          ? pokemon.name.charAt(0).toUpperCase() +
            pokemon.name.slice(1) +
            " | Pokédex"
          : "Pokémon"
      }
    >
      <main
        className={`pokemonPage w-full ${
          pokemon
            ? fromMap[pokemon.types[0].type.name as FromMapKey]
            : "from-gray-800 to-gray-800"
        }`}
      >
        <Image src={"/bg-img.png"} fill alt="background" className="absolute" />
        {pokemon && (
          <div
            className="flex flex-col items-center justify-end max-w-5xl w-full
              min-h-screen z-10"
          >
            <div className="h-[260px]" />
            <div className="p-6 bg-gray-800 flex flex-col items-center rounded-t-3xl w-full">
              <section className="-mt-64 grid grid-cols-[1fr_450px_1fr] items-baseline">
                {pokemon.id > 1 && (
                  <Link href={`/pokemon/${pokemon.id - 1}`}>
                    <ChevronLeftIcon className="altPage" />
                  </Link>
                )}
                <div className="relative col-start-2 h-[450px] w-[450px] max-w-full">
                  <Image
                    src={`${
                      pokemon.sprites.front_default
                        ? pokemon.sprites[srcImg as keyof Sprites]
                        : "/substitute.png"
                    }`}
                    alt={pokemon.name + " image"}
                    fill
                    className="object-contain"
                  />
                </div>
                {pokemon.id < 1008 && (
                  <Link href={`/pokemon/${pokemon.id + 1}`}>
                    <ChevronRightIcon className="altPage" />
                  </Link>
                )}
              </section>
              {pokemon.sprites.front_default == null && (
                <p className="my-4 text-gray-300">
                  We don't have this pokémon image yet.
                </p>
              )}
              <section className="flex space-x-6 items-center mt-4">
                {pokemon.sprites.front_female && (
                  <GenderSwitcher
                    isDefault={isDefault}
                    setIsDefault={setIsDefault}
                  />
                )}
                {pokemon.sprites.front_default && (
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
                )}
              </section>
              <h1 className="text-4xl capitalize font-bold mt-6">
                {pokemon.name}{" "}
                <span className="font-normal text-gray-200">#{pokemon.id}</span>
              </h1>
              <div className="text-xl p-2">
                {specie && (
                  <p className="md:max-w-2xl text-center">
                    {specie.flavorText?.replace("\f", " ")}
                  </p>
                )}
              </div>
              <section className="flex p-4 items-center space-x-3">
                {pokemon.types.map((t) => (
                  <TypePill key={t.type.name} type={t.type.name} lg />
                ))}
              </section>
              <section className="flex space-x-4 items-center p-2">
                <Measure type="height" value={pokemon.height} />
                <Measure type="weight" value={pokemon.weight} />
              </section>

              <section className="w-full text-center flex flex-col items-center">
                <h2 className="font-bold text-3xl p-4">Evolutions</h2>
                {evoChain && <EvoLine chain={evoChain} />}
                {evoChain == null && pokemon.id && (
                  <Card
                    url={`https://pokeapi.co/api/v2/pokemon/${pokemon.id}`}
                  />
                )}
              </section>
            </div>
          </div>
        )}
      </main>
    </Layout>
  );
}
