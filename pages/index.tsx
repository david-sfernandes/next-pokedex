import { ArrowPathRoundedSquareIcon } from "@heroicons/react/24/outline";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MemoCard } from "../components/Card";
import Header from "../components/Header";
import Layout from "../components/Layout";
import LoadingCard from "../components/LoadingCard";

const Home: NextPage = () => {
  const [pokemonList, setPokemonList] = useState<ResultData[]>([]);
  const [nextUrl, setNextUrl] = useState("");
  const [randomId, setRandomId] = useState(1);

  const setRandomPokemon = () => {
    setRandomId(Math.floor(Math.random() * 1008) + 1);
  };

  useEffect(() => {
    setRandomPokemon();
    fetch("https://pokeapi.co/api/v2/pokemon?limit=12&offset=0")
      .then((res) => res.json())
      .then((res) => {
        setNextUrl(res.next);
        setPokemonList(res.results);
      });
  }, []);

  const loadMore = () => {
    fetch(nextUrl)
      .then((res) => res.json())
      .then((res) => {
        setNextUrl(res.next);
        setPokemonList((pokemonList) => [...pokemonList, ...res.results]);
      });
  };

  const loadingArr = new Array(9).fill(null);

  return (
    <Layout title="Pokédex">
      <main className="home">
        <div className="m-2">
          <h1 className="text-6xl font-bold mb-3">Pokédex</h1>
          <Link
            target="_blank"
            href={`/pokemon/${randomId}`}
            onClick={() => setRandomPokemon()}
            className="btn flex gap-2 font-medium text-lg items-center"
          ><ArrowPathRoundedSquareIcon className="h-6" /> Random Pokémon</Link>
        </div>

        <section className="pokedex">
          {pokemonList.length > 0
            ? pokemonList.map((pokemon) => (
                <MemoCard key={pokemon.name} url={pokemon.url} />
              ))
            : loadingArr.map((_, i) => <LoadingCard key={`loading-${i}`} />)}
        </section>
        <button
          onClick={() => loadMore()}
          className="btn text-2xl font-semibold"
        >
          Load more
        </button>
      </main>
      <footer className="flex items-center justify-center p-3 w-full text-sm">
        <p>Make with <a href="https://pokeapi.co/" className="font-medium hover:underline">PokéAPI</a></p>
      </footer>
    </Layout>

  );
};

export default Home;
