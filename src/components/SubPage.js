import React, { useState, useEffect, Suspense } from "react";
import { Route, Switch, Link, useHistory, useParams } from "react-router-dom";
import Create from "./board/Create";
import Read from "./board/Read";
import Brand from "../routes/subPage/Brand";
import Intro from "../routes/subPage/Intro";
import Product from "../routes/subPage/Product";
import Event from "../routes/subPage/Event";
import Contact from "../routes/subPage/Contact";

import { MenuList } from "../data/Menu";

import "../sass/subPage/subBanner.scss";

function SubPage({ userObj, setLogo, subBannerImage, setSubBannerImage }) {
  setLogo("서브로고");
  const { pageType, pageId } = useParams();
  const [subMenuOn, setSubMenuOn] = useState(false);
  const [subSmailMenuOn, setSubSmailMenuOn] = useState(false);
  useEffect(() => {
    setSubMenuOn(false);
    setSubSmailMenuOn(false);
  }, [pageType, pageId])

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pageType])
  
  let title = "";
  switch (subBannerImage) {
    case "intro":
      title = "회사소개"
      break;
    case "brand":
      title = "브랜드"
      break;
    case "product":
      title = "제품안내"
      break;
    case "event":
      title = "이벤트"
      break;
    case "contact":
      title = "고객센터"
      break;

    default:
      break;
  }

  const history = useHistory();
  const historyBack = () => {
    alert("로그인 후 이용 가능합니다.");
    history.goBack();
  }

  let [suspenseStyle, setSuspenseStyle] = useState({
    textAlign: "center",
    padding: "200px 0px",
  })

  return (
    <>
      <div className="subBanner">
        <img src={`/image/subPage/${subBannerImage}.jpg`} alt="" />
        <div className="wrap">
          <h3>{title}</h3>
        </div>
        <nav>
          <div className="wrap">
            <a href="/" className="home">
              <i class="fas fa-home"></i>
            </a>
            <div>
              <span onClick={() => { setSubMenuOn(!subMenuOn) }}>{title}<i class="fas fa-caret-down"></i></span>
              <ul className={subMenuOn === false ? "" : "on"}>
                {
                  MenuList.map((a, i) => {
                    return (
                      <li key={i}><Link onClick={() => { setSubMenuOn(false) }} to={a.url}>{a.name}</Link></li>
                    )
                  })
                }
              </ul>
            </div>
            {
              pageType === "intro"
                ? <div>
                  <span onClick={() => { setSubSmailMenuOn(!subSmailMenuOn) }}>{MenuList[0].subMenu[pageId - 1]}<i class="fas fa-caret-down"></i></span>
                  <ul className={subSmailMenuOn === false ? "" : "on"}>
                    {
                      MenuList[0].subMenu.map((a, i) => {
                        return (
                          <li><Link onClick={() => { setSubSmailMenuOn(false) }} to={`${i + 1}`}>{a}</Link></li>
                        )
                      })
                    }
                  </ul>
                </div>
                : null
            }
          </div>
        </nav>
      </div>
      <Switch>
        <Route path="/subPage/intro/:pageId">
          <Suspense fallback={<div style={suspenseStyle}><img src="/image/loding.gif" alt="" /></div>}>
            <Intro setSubBannerImage={setSubBannerImage} title={title}></Intro>
          </Suspense>
        </Route>
        <Route path="/subPage/brand/1">
          <Suspense fallback={<div style={suspenseStyle}><img src="/image/loding.gif" alt="" /></div>}>
            <Brand setSubBannerImage={setSubBannerImage} title={title}></Brand>
          </Suspense>
        </Route>
        <Route path="/subPage/product/:pageId" >
          <Suspense fallback={<div style={suspenseStyle}><img src="/image/loding.gif" alt="" /></div>}>
            <Product setSubBannerImage={setSubBannerImage} title={title} userObj={userObj} pageType={pageType}></Product>
          </Suspense>
        </Route>
        <Route path="/subPage/event/:pageId" >
          <Suspense fallback={<div style={suspenseStyle}><img src="/image/loding.gif" alt="" /></div>}>
            <Event setSubBannerImage={setSubBannerImage} title={title} userObj={userObj} pageType={pageType}></Event>
          </Suspense>
        </Route>
        <Route path="/subPage/contact/1">
          <Suspense fallback={<div style={suspenseStyle}><img src="/image/loding.gif" alt="" /></div>}>
            <Contact setSubBannerImage={setSubBannerImage} title={title}></Contact>
          </Suspense>

        </Route>

        <Route path="/board/create/:pageId">
          {
            userObj === null
              ? historyBack
              : <Create setSubBannerImage={setSubBannerImage} userObj={userObj}></Create>
          }
        </Route>
      </Switch>
    </>
  )
}

export default SubPage;