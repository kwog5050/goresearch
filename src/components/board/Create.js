import React, { useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid"
import { dbService, storageService } from "../../fbase";
import { addDoc, collection, serverTimestamp, Timestamp } from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "firebase/storage";

import "../../sass/subPage/board/boardCreate.scss"

function Create({ userObj, setSubBannerImage }) {
  const { pageId } = useParams();

  const [catNo, setCatNo] = useState("");
  const [product, setProduct] = useState("");
  const [size, setSize] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [view, setView] = useState(0);
  const history = useHistory();
  const onSubmit = async (event) => {
    event.preventDefault();
    let attachmentUrl = "";
    if (attachment !== "") {
      const fileRef = ref(storageService, `${userObj.email}/${uuidv4()}`);
      const response = await uploadString(fileRef, attachment, "data_url");
      attachmentUrl = await getDownloadURL(response.ref);
    }
    const nweetObj = {
      catNo,
      product,
      size,
      title,
      content,
      view,
      createAt: serverTimestamp(),
      userId: userObj.email,
      nickname: userObj.email === "admin@naver.com" ? "최고관리자" : userObj.email,
      attachmentUrl,
    }
    await addDoc(collection(dbService, pageId), nweetObj);
    setCatNo("");
    setProduct("");
    setSize("");
    setTitle("");
    setContent("");
    setAttachment("");
    history.goBack(-1);
  }
  const onChange = (event) => {
    const { target: { value, name } } = event;
    if (name === "Cat_No") {
      setCatNo(value);
    }
    if (name === "Product") {
      setProduct(value);
    }
    if (name === "Size") {
      setSize(value);
    }
    if (name === "title") {
      setTitle(value);
    }
    if (name === "content") {
      setContent(value);
    }
    if (name === "view") {
      setView(value);
    }
  }

  const [attachment, setAttachment] = useState("");
  const onFileChange = (event) => {
    const { target: { files }, } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  }
  const onClearPhoto = () => {
    if (attachment !== "") {
      setAttachment("");
    }
  }
  return (
    <>
      <div className="container" style={{ padding:"50px 0px" }}>
        <div className="wrap">
          <h3>게시글 작성</h3>
          {
            pageId !== "event"
              ? <form className="create" onSubmit={onSubmit}>
                <input name="Cat_No" type="text" placeholder="Cat_No" value={catNo} onChange={onChange} maxLength={120} />
                <input name="Product" type="text" placeholder="Product" value={product} onChange={onChange} maxLength={120} />
                <input name="Size" type="text" placeholder="Size" value={size} onChange={onChange} maxLength={120} />
                <input type="submit" value="작성" />
              </form>
              : <form className="create" onSubmit={onSubmit}>
                <input type="hidden" value={0} name="view" />

                <input name="title" type="text" placeholder="제목" value={title} onChange={onChange} maxLength={120} />
                <textarea name="content" type="text" placeholder="내용" value={content} onChange={onChange} />
                <div className="file">
                  <input type="file" accept="image/*" onChange={onFileChange} />
                  <img src={attachment} alt="" />
                  <button type="button" onClick={onClearPhoto}><i class="fas fa-times"></i></button>
                </div>
                <input type="submit" value="작성" />
                <Link className="back" to="/subPage/event/event/1">취소</Link>
              </form>
          }
        </div>
      </div>
    </>
  )
}

export default Create;