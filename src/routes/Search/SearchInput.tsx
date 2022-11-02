import React from "react";
import styles from "./SearchInput.module.css";

function SearchInput() {
  return (
    <div className={styles.container}>
      <input type="search" className={styles.input} />
      <button className={styles.button}>Search</button>
    </div>
  );
}

export default SearchInput;
