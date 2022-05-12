import React, { useState } from "react";
import { Route, Switch, Link } from "react-router-dom";
import { authService } from "../fbase";
import Auth from "../routes/auth/Auth";

function AppRouter({isLoggedIn}){
  const logout = ()=>{
    authService.signOut();
  }
  return (
    <div className="loginButton">
        {isLoggedIn
        ? <button onClick={logout}>로그아웃</button>
        : null
          // :  <Link to="/login">로그인</Link>
        }
    </div>
  )
}
export default AppRouter;