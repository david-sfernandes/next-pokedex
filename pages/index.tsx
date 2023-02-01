import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import Card from "../components/Card";
import LoadingCard from "../components/LoadingCard";
import TypePill from "../components/TypePill";

const Home: NextPage = () => {
  const [pokemonList, setPokemonList] = useState<ResultData[]>([]);
  const [offset, setOffset] = useState(5);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=5&offset=0")
      .then((res) => res.json())
      .then((res) => setPokemonList(res.results));
  }, []);

  const loadMore = () => {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=5&offset=${offset}`)
      .then((res) => res.json())
      .then((res) =>
        setPokemonList((pokemonList) => [...pokemonList, ...res.results])
      )
      .then(() => setOffset((offset) => offset + 5));
  };

  const loadingArr = new Array(8).fill(null);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-800 text-white">
      <Head>
        <title>Pokedex</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center text-center py-5">
        <h1 className="text-6xl font-bold">Pokedex</h1>
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 max-w-5xl">
          {pokemonList.length > 0 ? (
            pokemonList.map((pokemon) => (
              <Card key={pokemon.name} url={pokemon.url} />
            ))
          ) : loadingArr.map(() => <LoadingCard/>)}
        </section>
        <button
          onClick={() => loadMore()}
          className="bg-blue-600 border-blue-300 rounded-full px-16 py-2
        text-2xl font-semibold m-6 hover:brightness-90 hover:shadow-lg hover:scale-105 
        transform transition-all duration-100 ease-out active:brightness-75"
        >
          Load more
        </button>
      </main>
      <footer className="w-full p-4 bg-gray-700 text-slate-200">
        <a
          href="https://github.com/david-sfernandes"
          className="flex hover:underline items-center justify-center"
        >
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="h-8 w-8 fill-slate-200 mx-2"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 2C6.477 2 2 6.463 2 11.97c0 4.404 2.865 8.14 6.839 9.458.5.092.682-.216.682-.48 0-.236-.008-.864-.013-1.695-2.782.602-3.369-1.337-3.369-1.337-.454-1.151-1.11-1.458-1.11-1.458-.908-.618.069-.606.069-.606 1.003.07 1.531 1.027 1.531 1.027.892 1.524 2.341 1.084 2.91.828.092-.643.35-1.083.636-1.332-2.22-.251-4.555-1.107-4.555-4.927 0-1.088.39-1.979 1.029-2.675-.103-.252-.446-1.266.098-2.638 0 0 .84-.268 2.75 1.022A9.607 9.607 0 0 1 12 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.372.202 2.386.1 2.638.64.696 1.028 1.587 1.028 2.675 0 3.83-2.339 4.673-4.566 4.92.359.307.678.915.678 1.846 0 1.332-.012 2.407-.012 2.734 0 .267.18.577.688.48 3.97-1.32 6.833-5.054 6.833-9.458C22 6.463 17.522 2 12 2Z"
            ></path>
          </svg>
          By David Sousa
        </a>
      </footer>
    </div>
  );
};

export default Home;
