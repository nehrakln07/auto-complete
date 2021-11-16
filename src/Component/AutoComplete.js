import React from "react";

// Debounce function
function debounce(fn, delay) {
  var timer = null;
  return function () {
    var context = this,
      args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  };
}

export default class CustomAutocomplete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchedText: "",
      isShow: false,
      loading: false,
    };
  }

  handleChange = (e) => {
    const { value: nextValue } = e.target;

    this.setState((prevState) => ({
      ...prevState,
      searchedText: nextValue,
      isShow: true,
      loading: true,
    }));

    // debounce user input to avoid multiple api call
    const debouncedSave = debounce(
      () => {
          this.props.handleInputChange(nextValue);
          this.setState((prevState) => ({
            ...prevState,
            loading: false,
          }));
        },
      1000
    );
    debouncedSave();
  };

  handleItemClick = (e) => {
    const value = e.currentTarget.innerText;
    this.setState((prevState) => ({
      ...prevState,
      searchedText: value,
      isShow: false,
    }));
    this.props.handleItemClick(value);
  };

  getHighlightedText = (text, highlight) => {
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

  render() {
    const { placeholder, options, isLoading, inputRef } = this.props;
    const { isShow, searchedText, loading } = this.state;
    return (
      <div className="autocomplete_container">
        <input
          type={"text"}
          inputRef={inputRef}
          placeholder={placeholder}
          value={searchedText}
          onChange={this.handleChange}
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
                        <li key={key} value={item.value} onClick={this.handleItemClick}>
                          {this.getHighlightedText(item.value, searchedText)}
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
}
