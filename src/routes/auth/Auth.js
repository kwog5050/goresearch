import React, { useState, useEffect } from "react";
import { authService } from "../../fbase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { Route, Switch, useParams, useHistory } from "react-router-dom";

import "../../sass/login.scss";

function Auth({ isLoggedIn, setLogo }) {
  setLogo("서브로고")
  const [email, setEamil] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(false); //로그인체크
  const [error, setError] = useState("");
  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEamil(value);
    } else if (name === "password") {
      setPassword(value);
    }
  }
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let data;
      if (newAccount) {
        // 회원가입
        data = await createUserWithEmailAndPassword(authService, email, password);
      } else {
        // 로그인
        data = await signInWithEmailAndPassword(authService, email, password);
      }
      console.log(data);
    } catch (error) {
      if ("Firebase: Error (auth/email-already-in-use)." === error.message) {
        setError("이미 존재하는 아이디입니다.");
      } else if ("Firebase: Password should be at least 6 characters (auth/weak-password)." === error.message) {
        setError("비밀번호 6자리 이상 입력해주세요.");
      } else if ("Firebase: Error (auth/wrong-password)." === error.message) {
        setError("비밀번호 오류입니다 재확인부탁드립니다.");
      } else {
        setError("알 수 없는 에러입니다 관리자에게 문의 부탁드립니다.");
      }
    }
  }

  //로그인 회원가입 토글
  const toggleAccount = () => {
    setNewAccount(!newAccount);
  }

  const { params } = useParams();
  const history = useHistory();
  useEffect(() => {
    if (params === "login") {
      if (isLoggedIn === true) {
        history.push("/");
      }
    }
  })

  return (
    <>
      <Switch>
        <Route path="/login">
          <form className="login" onSubmit={onSubmit}>
            <h3>로그인</h3>
            <input type="email" name="email" placeholder="Email" required value={email} onChange={onChange} />
            <input type="password" name="password" placeholder="Password" required value={password} onChange={onChange} />
            <input type="submit" value={!newAccount ? "로그인" : "회원가입"} />
            {error}
            {/* <span onClick={toggleAccount}>{!newAccount ? "회원가입" : "로그인"}</span> */}
          </form>
        </Route>
      </Switch>
    </>
  )
}

export default Auth;