import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { authService } from "../fbase";

import Header from "../components/common/Header"
import Main from "../routes/Main";
import Auth from "../routes/auth/Auth";
import Footer from "./common/Footer";
import SubPage from "./SubPage";

import "../sass/common/common.scss";

function App() {
  const [logo, setLogo] = useState("");
  const [subBannerImage, setSubBannerImage] = useState("");

  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    })
  }, []);

  return (
    <>
      <Header logo={logo} setLogo={setLogo} isLoggedIn={isLoggedIn}></Header>
      <Switch>
        <Route exact path="/:params">
          <Auth isLoggedIn={isLoggedIn} setLogo={setLogo}></Auth>
        </Route>
        <Route exact path="/">
          <Main setLogo={setLogo}></Main>
        </Route>
        <Route path="/:params/:pageType/:pageId">
          <SubPage setLogo={setLogo} subBannerImage={subBannerImage} setSubBannerImage={setSubBannerImage} userObj={userObj}></SubPage>
        </Route>
      </Switch>
      <Footer></Footer>
    </>
  );
}

export default App;
