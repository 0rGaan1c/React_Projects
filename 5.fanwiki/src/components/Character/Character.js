import React from "react";
import { Link } from "react-router-dom";
import "./Character.css";

function Character(props) {
  const data = props.data.Media.characters.edges;

  return (
    <>
      <div className="main">
        {data.map((item) => {
          return (
            <div className="info">
              <Link key={item.node.id} to={`/${item.node.id}/${props.page}`}>
                <img
                  className="img-main"
                  src={item.node.image.large}
                  alt={item.node.name.full}
                />
                <p>{item.node.name.full} </p>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Character;
