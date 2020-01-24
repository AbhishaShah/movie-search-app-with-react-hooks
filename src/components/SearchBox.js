import React, {useState} from "react";

const SearchBox = ({search, placeholder}) => {
  const [searchVal, setSearchVal] = useState();

  const handleSearchVal = e => {
    setSearchVal(e.target.value);
  };

  const resetSearchVal = () => {
    setSearchVal("");
  };

  const callSearchFunction = e => {
    e.preventDefault();
    search(searchVal);
    resetSearchVal();
  };

  return (
    <form className="search-form">
      <input
        type="text"
        className="search-box"
        placeholder={placeholder}
        value={searchVal}
        onChange={handleSearchVal}
      />
      <button type="submit" className="submit-btn" onClick={callSearchFunction}>
        Search
      </button>
    </form>
  );
};

export default SearchBox;
