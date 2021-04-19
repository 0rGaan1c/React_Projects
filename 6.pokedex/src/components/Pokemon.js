import React, { useEffect, useState } from "react";
import Heading from "./Heading";

const Pokemon = ({
  match: {
    params: { id },
  },
}) => {
  const [pokemonData, setPokemonData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function fetchPokemon() {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await response.json();
      setPokemonData(data);
      setIsLoading(false);
    }
    fetchPokemon();
  }, [id]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <Heading />
      <h1>{pokemonData.name}</h1>
      <img
        src={pokemonData.sprites.other.dream_world.front_default}
        alt={pokemonData.name}
      />
      <h3>Experience {pokemonData.base_experience}</h3>
      <h3>Weight {pokemonData.weight}</h3>
      <h3>Height {pokemonData.height}</h3>
      <h3>Moves</h3>
      {pokemonData.moves.map((move, index) => {
        return <span key={index}>{move.move.name} </span>;
      })}
    </div>
  );
};

export default Pokemon;
