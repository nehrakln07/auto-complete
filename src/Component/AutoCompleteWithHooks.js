import React, { useState, useEffect, useRef } from "react";

// Debounce logic
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  return debouncedValue;
}

// hooks to avoid first render
function useDidUpdateEffect(fn, inputs) {
  const didMountRef = useRef(false);

  useEffect(() => {
    if (didMountRef.current) return fn();
    else didMountRef.current = true;
  }, inputs);
}

function CustomAutocompleteWithHooks(props) {
  const [searchedText, setSearchedText] = useState("");
  const [isShow, setIsShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const debouncedSearchText = useDebounce(searchedText, 500);

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchedText(value);
    setIsShow(true);
    setLoading(true);
  };

  useDidUpdateEffect(() => {
      //Adding debounce for better performance
    props.handleInputChange(debouncedSearchText);
    setLoading(false);
  }, [debouncedSearchText]);

  const handleItemClick = (e) => {
    const value = e.currentTarget.innerText;
    setSearchedText(value);
    setIsShow(false);
    props.handleItemClick(value);
  };

  // heighlight text logic
  const getHighlightedText = (text, highlight) => {
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return (
      <span>
        {" "}
        {parts.map((part, i) => (
          <span
            key={i}
            style={
              part.toLowerCase() === highlight.toLowerCase()
                ? { fontWeight: "bold" }
                : {}
            }
          >
            {part}
          </span>
        ))}{" "}
      </span>
    );
  };

  const { placeholder, options, isLoading, inputRef } = props;
  return (
    <div className="autocomplete_container">
      <input
        type={"text"}
        inputRef={inputRef}
        placeholder={placeholder}
        value={searchedText}
        onChange={handleChange}
      />
      {isShow ? (
        <>
          {isLoading || loading ? (
            <div className="loading">Loading options...</div>
          ) : (
            <>
              {options.length ? (
                <ul className="menu-options">
                  {options.map((item, key) => {
                    return (
                      <li
                        key={key}
                        value={item.value}
                        onClick={handleItemClick}
                      >
                        {getHighlightedText(item.value, searchedText)}
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <div className="no-result">No result found</div>
              )}
            </>
          )}
        </>
      ) : null}
    </div>
  );
}


export default CustomAutocompleteWithHooks;