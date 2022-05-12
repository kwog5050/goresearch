import React,{useState} from "react";
import { Route, Switch, Link, useHistory, useParams } from "react-router-dom";

import { Links } from "../../data/BrandLink";

import "../../sass/subPage/brand.scss";

function Brand({setSubBannerImage, title}) {
  setSubBannerImage("brand");

  const imageList = [];
  for (let i = 0; i < 25; i++){
    imageList.push(
      <li><a href={Links[i]} target="_blank"><img src={`/image/brand${i + 1}.png`} alt="" /></a></li>
    )
  }
  return (
    <div className="container">
      <div className="wrap">
        <div className="title">
          <h2>{ title }</h2>
        </div>

        <ul className="brandImage">
          {imageList}
        </ul>
      </div>
    </div>
  )
}

export default Brand;