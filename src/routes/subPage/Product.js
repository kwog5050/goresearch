import React, { useState } from "react";
import {Route, Switch, Link, useParams } from "react-router-dom";
import Read from "../../components/board/Read";

import "../../sass/subPage/product.scss"

function Product({setSubBannerImage, title, userObj, pageType}) {
  setSubBannerImage("product");
  const { pageId } = useParams();
  const brandList = [
    { name: "Agdia", url: "agdia", image: "agdia" },
    { name: "Aprep kit", url: "aprepKit", image: "genomicBase" },
    { name: "BioActs", url: "bioActs", image: "bioActs" },
    { name: "BIOMAX", url: "biomax", image: "biomax" },
    { name: "Bioer", url: "bioer", image: "bioer" },
    { name: "BioPure", url: "bioPure", image: "genomicBase" },
    { name: "BioSan", url: "bioSan", image: "bioSan" },
    { name: "CELEMICS", url: "celemics", image: "celemics" },
    { name: "Ebiogen", url: "ebiogen", image: "ebiogen" },
    { name: "Eppendorf", url: "eppendorf", image: "eppendorf" },
    { name: "GENOMICBASE", url: "genomicBase", image: "genomicBase" },
    { name: "KisanBio", url: "kisanBio", image: "kisanBio" },
    { name: "Life Real", url: "lifeReal", image: "lifeReal" },
    { name: "Maestrongen", url: "maestrongen", image: "maestrongen" },
    { name: "Major Science", url: "majorScience", image: "majorScience" },
    { name: "MitsuiEC", url: "mitsuiEc", image: "mitsuiEc" },
    { name: "MP Biomedicals", url: "mpBiomedicals", image: "mpBiomedicals" },
    { name: "N-BIOTEK", url: "n-biotek", image: "n-biotek" },
    { name: "NKMAX", url: "nkmax", image: "nkmax" },
    { name: "Rephile", url: "rephile", image: "rephile" },
    { name: "SFC", url: "sfc", image: "sfc" },
    { name: "Solgent", url: "solgent", image: "solgent" },
    { name: "Stakpure", url: "stakpure", image: "stakpure" },
    { name: "Tokken", url: "tokken", image: "tokken" },
    { name: "ToolGen", url: "toolGen", image: "toolGen" },
    { name: "ThermoFisher SCIENTIFIC", url: "thermoFisherScientfic", image: "thermoFisher" },
    { name: "WATSON BIOLAB", url: "watsonBiolab", image: "watsonBiolab" },
  ];
  
  let imageUrl = "";
  for (let i = 0; i < brandList.length; i++) {
    if (pageId === brandList[i].url) {
      imageUrl = brandList[i].image;
    }
  }
  return (
    <div className="container">
      <div className="wrap">
        <div className="title">
          <h2>{ title }</h2>
        </div>

        <div className="grid">
          <nav>
            <span>브랜드 리스트</span>
            <ul>
              {
                brandList.map((a, i) => {
                  return (
                    <li key={i} className={pageId === a.url ? "on" : ""}><Link to={`/subPage/product/${a.url}/1`}>{ a.name }</Link></li>
                  )
                })
              }
            </ul>
          </nav>

          <div className="board">
            <div className="banner">
              <img src={`/image/subPage/product/${imageUrl}.png`} alt="" />
              <Link to="/subPage/contact/1">견적 및 주문하기</Link>
            </div>
            <div>
              <Switch>
                <Route path={`/subPage/product/:pageId/:boardNum`}>
                  <Read userObj={userObj} pageType={pageType}></Read>
                </Route>
              </Switch>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product;