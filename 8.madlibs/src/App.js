import React, { useState } from "react";
import Input from "./Input";
import { countries } from "./countries";
import { adjectivesList } from "./adjectives";
import { nounsList } from "./nounsList";
import plur from "plur";

const App = () => {
  const [noun, setNoun] = useState("");
  const [nouns, setNouns] = useState("");
  const [noun1, setNoun1] = useState("");
  const [noun2, setNoun2] = useState("");
  const [place, setPlace] = useState("");
  const [adjective, setAdjective] = useState("");
  const [loading, setLoading] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(false);
  };

  const reset = () => {
    setNoun("");
    setNouns("");
    setNoun1("");
    setNoun2("");
    setPlace("");
    setAdjective("");
    setLoading(true);
  };

  const handleChange = (e) => {
    const attribute = e.target.getAttribute("name");
    const value = e.target.value;
    if (attribute === "noun") {
      setNoun(value);
    } else if (attribute === "nouns") {
      setNouns(value);
    } else if (attribute === "noun1") {
      setNoun1(value);
    } else if (attribute === "place") {
      setPlace(value);
    } else if (attribute === "adjective") {
      setAdjective(value);
    } else if (attribute === "noun2") {
      setNoun2(value);
    }
  };

  const randomNumber = (length) => {
    return Math.floor(Math.random() * length);
  };

  const random = () => {
    const randomPlace = randomNumber(countries.length);
    setPlace(countries[randomPlace].country);

    const randomAdjective = randomNumber(adjectivesList.length);
    setAdjective(adjectivesList[randomAdjective]);

    const randomNoun = randomNumber(nounsList.length);
    setNoun(nounsList[randomNoun]);

    const randomNoun1 = randomNumber(nounsList.length);
    setNoun1(nounsList[randomNoun1]);

    const randomNoun2 = randomNumber(nounsList.length);
    setNoun2(nounsList[randomNoun2]);

    const randomNouns = randomNumber(nounsList.length);
    setNouns(plur(nounsList[randomNouns], 4));
  };

  return (
    <>
      <h1>Mad Libs</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <p>Noun </p>
          <Input name={"noun"} value={noun} handleChange={handleChange} />
        </div>
        <div>
          <p>Noun(Plural) </p>
          <Input name={"nouns"} value={nouns} handleChange={handleChange} />
        </div>
        <div>
          <p>Noun </p>
          <Input name={"noun1"} value={noun1} handleChange={handleChange} />
        </div>
        <div>
          <p>Place </p>
          <Input name={"place"} value={place} handleChange={handleChange} />
        </div>
        <div>
          <p>Adjective </p>
          <Input
            name={"adjective"}
            value={adjective}
            handleChange={handleChange}
          />
        </div>
        <div>
          <p>Noun </p>
          <Input name={"noun2"} value={noun2} handleChange={handleChange} />
        </div>
        <button type="submit">MadLibs</button>
      </form>
      <div className="btn">
        <button type="submit" onClick={reset}>
          Reset
        </button>
        <button type="submit" onClick={random}>
          Random
        </button>
      </div>
      {!loading ? (
        <div className="story">
          <p>
            Be kind to your <span>{noun}</span>-footed
            {` `} <span>{`${nouns}`}</span>
            {`. `}
            For a duck may be somebody's <span>{noun1}</span>, Be kind to your
            {` `} <span>{`${nouns}`}</span> in {` `}
            <span>{`${place}`}</span>
            {`, `}
            Where the weather is always <span>{adjective}</span>. You may think
            that this is the <span>{noun2}</span>, Well it is.
          </p>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default App;
