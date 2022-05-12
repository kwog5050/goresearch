import React from "react";
import { Switch, Route } from "react-router-dom";
import { MenuList } from "../../data/Menu";
import Map from "../../components/map/KakaoMap";

function Loction() {
  return (
    <>
      <div className="wrap">
        <div className="title">
          <h3>{MenuList[0].subMenu[2]}</h3>
        </div>
        <ul className="loction">
          <li>
            {Map("35.83723818403252", "128.75412735501573", "map1")}
            <h4>본사</h4>
            <ul>
              <li><img src="/image/subPage/intro/loction.png" alt="" />경상북도 경산시 대학로 280 201호</li>
              <li><img src="/image/subPage/intro/tel.png" alt="" />Tel : 053-710-4790</li>
              <li><img src="/image/subPage/intro/fex.png" alt="" />Fax : 053-289-3490</li>
            </ul>
          </li>
          <li>
            {Map("35.90964731080826", "128.61328718990978", "map2")}
            <h4>대구 사무소</h4>
            <ul>
              <li><img src="/image/subPage/intro/loction.png" alt="" />대구광역시 북구 유통단지로 103 2층 10호</li>
              <li><img src="/image/subPage/intro/tel.png" alt="" />Tel : 053-710-4790</li>
              <li><img src="/image/subPage/intro/fex.png" alt="" />Fax : 053-289-3490</li>
            </ul>
          </li>
        </ul>
      </div>
    </>
  )
}

export default Loction;