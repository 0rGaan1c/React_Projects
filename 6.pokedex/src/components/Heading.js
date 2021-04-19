import React from "react";
import styles from "./heading.module.css";

const Heading = () => {
  return (
    <div className={styles.header}>
      <h1 className={styles.header_h1}>Pokédex</h1>
    </div>
  );
};

export default Heading;
