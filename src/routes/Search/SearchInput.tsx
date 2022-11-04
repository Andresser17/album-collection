import React, { useState, useEffect, useRef } from "react";
import styles from "./SearchInput.module.css";

function SearchInput({
  defaultSearch,
  getSearch,
}: {
  defaultSearch: string;
  getSearch: (value: string) => void;
}) {
  const [value, setValue] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    getSearch(value);
  };

  useEffect(() => {
    setValue(defaultSearch);
  }, [defaultSearch]);

  return (
    <div
      onClick={() => {
        if (!isFocus) setIsFocus(true);
        if (inputRef.current !== null) {
          inputRef.current.focus();
        }
      }}
      onBlur={() => {
        setIsFocus(false);
      }}
      className={`${styles.container} ${
        isFocus ? styles["container-focus"] : ""
      }`}
    >
      <input
        ref={inputRef}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleSubmit();
          }
        }}
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
