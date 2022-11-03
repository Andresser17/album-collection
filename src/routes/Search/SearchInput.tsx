import React, { useState, useEffect } from "react";
import styles from "./SearchInput.module.css";

function SearchInput({
  defaultSearch,
  getSearch,
}: {
  defaultSearch: string;
  getSearch: (value: string) => void;
}) {
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    getSearch(value);
  };

  useEffect(() => {
    setValue(defaultSearch);
  }, [defaultSearch]);

  return (
    <div className={styles.container}>
      <input
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setValue(e.currentTarget.value);
        }}
        type="search"
        className={styles.input}
      />
      <button onClick={handleSubmit} className={styles.button}>
        Search
      </button>
    </div>
  );
}

export default SearchInput;
