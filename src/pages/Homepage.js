import React, { useState, useEffect } from "react";
import Search from "../components/Search2";
import Pictrue from "../components/Pictrue";

const Homepage = () => {
  // 來自於search input 所以一開始是空字串
  const [input, setInput] = useState("");
  // 放搜尋出來的圖片
  let [photo, setPhoto] = useState(null);
  // 頁面原本是1，載入更多變成234...（進入網頁預設顯示1，載入的第一頁是2）
  let [page, setPage] = useState(1);
  // 追蹤我們目前查的東西（按下search時，input裡面的東西）
  // 原本是用input判斷去加載頁面，但如果沒有按下search，加載出來的就不對
  let [currentSearch, setCurrentSearch] = useState("");

  // API
  const auth = "4ZuXOjvb2pRuQo5vJS3pkwhSEk27X9PAwlia0HaObe1BDTp3GJzF1Jyk";
  const initURL = "https://api.pexels.com/v1/curated?page=1&per_page=18";
  const searchURL = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=18&page=1`;

  // 獲得推薦圖片，或是搜尋圖片
  const search = async (url) => {
    // 重置page
    setPage(2);
    // fetch 呼叫API，搜尋相片
    const dataFetch = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: auth,
      },
    });
    // 搜尋出來的相片放進state
    let parseData = await dataFetch.json();
    setPhoto(parseData.photos);
    // 查看搜尋內容
    // console.log(parseData);

    // 按下search後，改變currentSearch
  };

  // 一進入頁面就執行search，解決需要按search 才有圖片顯示的問題
  useEffect(() => {
    search(initURL);
  }, []);

  // 從推薦相片或是搜尋相片中獲得更多圖片
  const morePicture = async () => {
    let newURL;
    // 推薦圖片
    if (input === "") {
      newURL = `https://api.pexels.com/v1/curated?page=${page}&per_page=18`;
    } else {
      newURL = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=18&page==${page}`;
    }
    setPage(page + 1);
    const dataFetch = await fetch(newURL, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: auth,
      },
    });
    // 搜尋出來的相片放進state
    let parseData = await dataFetch.json();
    setPhoto(photo.concat(parseData.photos));
  };

  useEffect(() => {
    if (currentSearch === "") {
      search(initURL);
    } else {
      search(searchURL);
    }
  }, [currentSearch]);

  return (
    <div style={{ minHeight: "100vh" }}>
      <Search
        search={() => {
          // 這邊會遇到closure的問題，currentSearch會抓到最一開始的空字串，需要使用useEffect
          setCurrentSearch(input);
        }}
        setInput={setInput}
      />
      <div className="pictures">
        {/* 在進行search之前 photo 都是 null，無法使用map */}
        {/* 所以要加上 photo && (null（falsly value) && 不管什麼東西都是 false)*/}
        {/* div.picture 裡面的資料不會顯示，直到 data 被改變 */}
        {photo &&
          photo.map((d) => {
            return <Pictrue data={d} />;
          })}
      </div>
      <div className="more">
        <button onClick={morePicture}>Load More</button>
      </div>
    </div>
  );
};

export default Homepage;
