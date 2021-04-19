import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Heading from "./Heading";

const Pokemons = () => {
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
  const [nextUrl, setNextUrl] = useState("");
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hideBtn, setHideBtn] = useState(false);

  const getPokemons = async () => {
    const response = await fetch(url);
    const data = await response.json();
    let pokemonData = [];

    await Promise.all(
      data.results.map(async (pokemon) => {
        const response = await fetch(pokemon.url);
        const info = await response.json();
        const pokeInfo = {
          name: info.name,
          id: info.id,
          image: info.sprites.other.dream_world.front_default,
          fullData: info,
        };
        pokemonData.push(pokeInfo);
      })
    );

    setPokemons((prevState) => {
      return [...prevState, ...pokemonData];
    });
    setNextUrl(data.next);
    setLoading(false);
  };

  useEffect(() => {
    getPokemons();
  }, [url]);

  const loadMore = () => {
    if (nextUrl !== null) {
      setUrl(nextUrl);
    } else {
      setHideBtn(true);
    }
  };

  if (loading) {
    return <h1>Loading</h1>;
  }
  return (
    <div>
      <Heading />
      <ol>
        {pokemons.map((pokemon, index) => {
          return (
            <Link key={index} to={`/${pokemon.id}/${pokemon.name}`}>
              <li key={index}>
                {pokemon.name} <img src={pokemon.image} alt={pokemon.name} />
              </li>
            </Link>
          );
        })}
      </ol>
      {hideBtn || <button onClick={loadMore}>Load More</button>}
    </div>
  );
};

export default Pokemons;
