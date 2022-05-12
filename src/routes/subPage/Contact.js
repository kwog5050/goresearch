import React from "react";
import { Route, Switch, Link, useHistory, useParams } from "react-router-dom";

import "../../sass/subPage/contact.scss";

function Contact({ setSubBannerImage, title }) {
  setSubBannerImage("contact");
  return (
    <div className="container">
      <div className="wrap">
        <div className="title">
          <h2>{title}</h2>
        </div>

        <form className="contact" action="/mail/mail.php" method="post">
          <input type="text" name="name" placeholder="이름" />
          <input type="text" name="tel" placeholder="연락처" />
          <textarea name="context" placeholder="내용"></textarea>
          <input type="submit" value="제출하기" />
        </form>
      </div>
    </div>
  )
}

export default Contact;