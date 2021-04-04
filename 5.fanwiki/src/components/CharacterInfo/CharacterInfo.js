import React, { useState, useEffect } from "react";
import "./CharacterInfo.css";

function CharacterInfo({
  match: {
    params: { id, page },
  },
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [characterInfo, setCharacterInfo] = useState([]);

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
        description
        image {
          large
        }
      }
      role
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
      setCharacterInfo(data);
      setIsLoading(false);
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
      <div className="sep-info">
        {characterInfo.data.Media.characters.edges
          .filter((info) => info.node.id === parseInt(id))
          .map((info) => (
            <div className="content">
              <img src={info.node.image.large} alt={info.node.name.full} />
              <p key={info.node.id}>{info.node.description}</p>
            </div>
          ))}
      </div>
    </>
  );
}

export default CharacterInfo;
