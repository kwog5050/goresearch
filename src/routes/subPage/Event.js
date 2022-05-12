import React from "react";
import { Route, Switch, Link, useParams } from "react-router-dom";
import Read from "../../components/board/Read";
import ReadDetail from "../../components/board/ReadDetail";

function Event({ setSubBannerImage, userObj, title, pageType }) {
  setSubBannerImage("event");
  const { pageId } = useParams();
  return (
    <div className="container">
      <div className="wrap">
        <div className="title">
          <h2>{title}</h2>
        </div>
        <Switch>
          <Route exact path={`/subPage/event/:pageId/:boardNum`}>
            <Read userObj={userObj} pageType={pageType}></Read>
          </Route>
          <Route path={'/subPage/event/:pageId/detail/:boardId'}>
            <ReadDetail userObj={userObj}></ReadDetail>
          </Route>
        </Switch>
      </div>
    </div>
  )
}

export default Event;