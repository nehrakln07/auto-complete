import React, { useState, useRef } from "react";

import CustomAutocomplete from "./Component/AutoComplete";
import CustomAutocompleteWithHooks from "./Component/AutoCompleteWithHooks";

import "./App.scss";

function App() {
  const [options, setOptions] = useState([]);
  const [optionsHook, setOptionsHook] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingHook, setIsLoadingHook] = useState(true);


  const inputRef = useRef(null);
  const inputRefH = useRef(null);

  const handleInputChange = (searchedText) => {
    setIsLoading(true);
    //calling api call to get data on input change
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((res) => {
        if (res) {
          // filtering on client side as api is not supporting
          const filteredRes = res
            .map((_i) => {
              return { value: _i.name };
            })
            .filter((_i) =>
              _i.value.toLowerCase().includes(searchedText.toLowerCase())
            );
          setIsLoading(false);
          setOptions(filteredRes ? filteredRes : []);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        setOptions([]);
      });
  };

  const handleInputChangeHook = (searchedText) => {
    setIsLoadingHook(true);
    //calling api call to get data on input change
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((res) => {
        if (res) {
          // filtering on client side as api is not supporting
          const filteredRes = res
            .map((_i) => {
              return { value: _i.name };
            })
            .filter((_i) =>
              _i.value.toLowerCase().includes(searchedText.toLowerCase())
            );
          setIsLoadingHook(false);
          setOptionsHook(filteredRes ? filteredRes : []);
        }
      })
      .catch((err) => {
        setIsLoadingHook(false);
        setOptionsHook([]);
      });
  };

  const handleItemClick = () => {
    //Callback for selected Item
  };

  return (
    <div className="app">
      <div className="container">
        <h2>Class AutoComplete Component</h2>
        <div className="wrapper-container">
          <CustomAutocomplete
            placeholder="Enter text to search"
            options={options}
            inputRef={inputRef}
            isLoading={isLoading}
            handleInputChange={handleInputChange}
            handleItemClick={handleItemClick}
          />
        </div>
      </div>
      <div className="container">
        <h2>Hooks AutoComplete Component</h2>
        <div className="wrapper-container">
          <CustomAutocompleteWithHooks
            placeholder="Enter text to search"
            options={optionsHook}
            inputRef={inputRefH}
            isLoading={isLoadingHook}
            handleInputChange={handleInputChangeHook}
            handleItemClick={handleItemClick}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
