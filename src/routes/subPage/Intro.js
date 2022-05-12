import React from "react";
import { Switch, Route  } from "react-router-dom";
import { MenuList } from "../../data/Menu";
import Loction from "./Loction";

import "../../sass/subPage/intro.scss";

function Intro({ setSubBannerImage, title }) {
  setSubBannerImage("intro");
  return (
    <div className="container">
      <Switch>
        <Route exact path="/subPage/intro/1">
          <div className="bg">
            <div>
              <img src="/image/subPage/intro/bg.jpg" alt="" />
            </div>
            <div className="wrap">
              <div className="bgContent">
                <p>
                  From. <br />
                  지오리서치 임직원 일동
                </p>
                <p>
                  지오리서치 <br />
                  홈페이지를 찾아주셔서 <br />
                  감사합니다.
                </p>
              </div>
            </div>
          </div>

          <div className="wrap">
            <div className="content">
              <h4>안녕하세요 지오리서치입니다.</h4>
              <p>
                주식회사 지오리서치는 바이오 관련 전 분야에 사용되는 시약 및 기기 판매와 더불어, <br />
                실험자의 편의성과 연구결과 향상을 위한 다양한 분석 서비스를 제공함으로써 실험의 기초부터 분석까지 <br />
                Total Solution을 제공하는 바이오관련 전문업체입니다.
              </p>
              <p>
                주식회사 지오리서치는 고객맞춤 컨설팅을 제공하는 동시에 내부 시스템 체계확립을 통해 <br />
                고객만족을 추구하며 꾸준히 성장하고 있습니다.
              </p>
              <p>
                앞으로도 연구자의 입장에서 고품질의 제품 및 최상의 서비스를 지속적으로 제공할 수 있도록 <br />
                노력할 것이며, 고객의 실험에 기여할 수 있는 기업이 되겠습니다.
              </p>
              <p>
                감사합니다.
              </p>
            </div>
          </div>
        </Route>
        <Route exact path="/subPage/intro/2">
          <div className="wrap">
            <div className="title">
              <h3>{MenuList[0].subMenu[1]}</h3>
            </div>
            <img className="business" src="/image/subPage/intro/사업영역.png" alt="" />
          </div>
        </Route>
        <Route exact path="/subPage/intro/3">
          <Loction></Loction>
        </Route>
      </Switch>
    </div>
  )
}

export default Intro;