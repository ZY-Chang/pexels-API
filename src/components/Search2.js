import React from "react";

const Search2 = ({ search, setInput }) => {
  // 取得輸入欄位的值
  const inputHandler = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className="search">
      <input onChange={inputHandler} type="text" />
      <button onClick={search}>Search</button>
    </div>
  );
};

export default Search2;
