import React, { useState, useEffect } from "react";
import Character from "../Character/Character";
import Header from "../Header/Header";
import "./characters.css";

function Characters() {
  const [isLoading, setIsLoading] = useState(true);
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [isMinorLoading, setIsMinorLoading] = useState(false);

  useEffect(() => {
    // Storing it in a separate .graphql/.gql file is also possible
    var query = `
query ($id: Int, $page: Int) { # Define which variables will be used in the query (id)
  Media (id: $id, type: ANIME) { # Insert our variables into the query arguments (id) (type: ANIME is hard-coded in the query)
    characters(page: $page) {
      edges {
        node {
          id
          name {
            full
          }
          image {
           large 
          }
        }
      }
    }
  }
}
`;

    // Define our query variables and values that will be used in the query request
    var variables = {
      id: 1735,
      page: page,
    };

    // Define the config we'll need for our Api request
    var url = "https://graphql.anilist.co",
      options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          query: query,
          variables: variables,
        }),
      };

    // Make the HTTP Api request
    fetch(url, options)
      .then(handleResponse)
      .then(handleData)
      .catch(handleError);

    function handleResponse(response) {
      return response.json().then(function (json) {
        return response.ok ? json : Promise.reject(json);
      });
    }

    function handleData(data) {
      setCharacters((c) => {
        return [...c, data];
      });
      setIsLoading(false);
      setIsMinorLoading(false);
    }

    function handleError(error) {
      console.error(error);
    }
  }, [page]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <Header />
      <ul>
        {characters.map((character, index) => {
          return <Character key={index} {...character} page={page} />;
        })}
      </ul>
      {isMinorLoading && <h3 className="minor-loading">Loading...</h3>}
      {page < 12 ? (
        <div
          className="load-more"
          onClick={() => {
            setPage(page + 1);
            setIsMinorLoading(!isMinorLoading);
          }}
        >
          Load more
        </div>
      ) : null}
    </>
  );
}

export default Characters;
