import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Login from "../Login";

import { MenuList } from "../../data/Menu";

function Header({ isLoggedIn, logo, setSubBannerImage }) {
  const [menuBoxOn, setMenuBoxOn] = useState(false);
  const [menuOn, setMenuOn] = useState(false);
  useEffect(() => {
    setMenuBoxOn(false);
    setMenuOn(false);
  }, [useParams()]);
  
  return (
    <header className={logo === "메인로고" ? "main" : "sub"}>
      <Login isLoggedIn={isLoggedIn}></Login>
      <div className="wrap">
        <div className="flexBox">
          <a href="/" id="logo">
            <img src={`/image/${logo}.png`} alt="" />
          </a>
          <ul className="pc">
            {
              MenuList.map((a, i) => {
                return (
                  <li key={i}>
                    <Link to={a.url}>{a.name}</Link>
                    {
                      a.subMenu.length > 2
                        ? <ol>
                          {
                            a.subMenu.map((b, j) => {
                              return (
                                <li><Link to={`/subPage/intro/${j + 1}`}>{b}</Link></li>
                              )
                            })
                          }
                        </ol>
                        : null
                    }
                  </li>
                )
              })
            }
          </ul>
          <div className="mobile">
            <div className="button"><i className="fas fa-bars" onClick={()=>{setMenuBoxOn(!menuBoxOn)}}></i></div>
            <ul className={menuBoxOn === false ? "" : "on"}>
              {
                MenuList.map((a, i) => {
                  return (
                    <li key={i}>
                      {
                        a.name === "회사소개"
                          ? <span onClick={()=>{setMenuOn(!menuOn)}}>{ a.name }</span>
                          : <Link to={a.url}>{a.name}</Link>
                      }
                      
                      {
                        a.subMenu.length > 2
                          ? <ol className={menuOn === false ? "" : "on"}>
                            {
                              a.subMenu.map((b, j) => {
                                return (
                                  <li><Link to={`/subPage/intro/${j + 1}`}>{b}</Link></li>
                                )
                              })
                            }
                          </ol>
                          : null
                      }
                    </li>
                  )
                })
              }
            </ul>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header;