// 設定每一張圖片

import React from "react";

const Pictrue = ({ data }) => {
  return (
    <div className="picture">
      <p>photographer:{data.photographer}</p>
      <div className="image">
        <img src={data.src.large} alt="" />
      </div>
      <p>
        <a target="_blank" href={data.src.large}>
        Download Image
        </a>
      </p>
    </div>
  );
};

export default Pictrue;
