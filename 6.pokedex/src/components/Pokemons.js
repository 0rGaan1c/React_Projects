import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Heading from "./Heading";
import styles from "./pokemons.module.css";

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
        console.log(info);
        const pokeInfo = {
          name: info.name,
          id: info.id,
          image: info.sprites.other.dream_world.front_default,
          exp: info.base_experience,
          height: info.height,
          weight: info.weight,
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
    return <h1>Loading ...</h1>;
  }
  return (
    <div>
      <Heading />
      <div className={styles.main}>
        {pokemons.map((pokemon, index) => {
          return (
            <Link key={index} to={`/${pokemon.id}/${pokemon.name}`}>
              <div className={styles.pokemon_card}>
                <div className={styles.pokemon_img_card}>
                  <img
                    className={styles.pokemon_img}
                    src={pokemon.image}
                    alt={pokemon.name}
                  />
                </div>
                <div className={styles.pokemon_info}>
                  <h2 className={styles.pokemon_info_h2} key={index}>
                    {pokemon.name}
                  </h2>
                  <p className={styles.pokemon_info_p}>
                    <b>Experience: </b>
                    {pokemon.exp}
                  </p>
                  <p className={styles.pokemon_info_p}>
                    <b>Weight: </b>
                    {pokemon.weight}
                  </p>
                  <p className={styles.pokemon_info_p}>
                    <b>Height: </b>
                    {pokemon.height}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      {hideBtn || (
        <div className={styles.div_btn}>
          <button className={styles.btn} onClick={loadMore}>
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default Pokemons;
