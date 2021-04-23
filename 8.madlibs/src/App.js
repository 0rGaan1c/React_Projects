import React, { useState } from "react";
import { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from "react-dom";
import Input from "./Input";

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
    console.log(noun, nouns, noun1, place, adjective);
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
      <div class="btn">
        <button type="submit" onClick={reset}>
          Reset
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
