import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { dbService } from "../../fbase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";

import "../../sass/subPage/board/boardEdit.scss";

function Update({ nweetObj, pageId }) {
  const history = useHistory();

  const [edtiting, setEdtiting] = useState(false);
  const [newCatNo, setNewCatNo] = useState(nweetObj.catNo);
  const [newProduct, setNewProduct] = useState(nweetObj.product);
  const [newSize, setNewSize] = useState(nweetObj.size);
  //삭제
  const onDeleteClick = async () => {
    const ok = window.confirm("정말로 삭제 하시겠습니까?");
    if (ok) {
      await deleteDoc(doc(dbService, `${pageId}`, `${nweetObj.id}`));
    }
  }

  //수정
  const onSubmit = async (event) => {
    event.preventDefault();
    await updateDoc(doc(dbService, `${pageId}`, `${nweetObj.id}`), {
      catNo: newCatNo,
      product: newProduct,
      size: newSize,
    });
    setEdtiting(false);
    history.go(0);
  }

  const onChange = (event) => {
    const { target: { value, name } } = event;
    if (name === "Cat_No") {
      setNewCatNo(value);
    }
    if (name === "Product") {
      setNewProduct(value);
    }
    if (name === "Size") {
      setNewSize(value);
    }
  }
  return (
    <>
      {
        edtiting === false
          ? <div className="edit">
            <button onClick={() => { onDeleteClick() }}>삭제</button>
            <button onClick={() => { setEdtiting(!edtiting) }}>수정</button>
          </div>
          : <div>
            <div className="edit">
              <button onClick={() => { onDeleteClick() }}>삭제</button>
              <button onClick={() => { setEdtiting(!edtiting) }}>수정</button>
            </div>
            <div className="updata">
              <h5>게시글 수정</h5>
              <form className="" onSubmit={onSubmit}>
                <input name="Cat_No" type="text" placeholder="Cat_No" onChange={onChange} maxLength={120} />
                <input name="Product" type="text" placeholder="Product" onChange={onChange} maxLength={120} />
                <input name="Size" type="text" placeholder="Size" onChange={onChange} maxLength={120} />
                <div className="buttons">
                  <input type="submit" value="작성" />
                  <button onClick={() => { setEdtiting(false) }}>닫기</button>
                </div>
              </form>
            </div>
          </div>
      }
    </>
  )
}

export default Update;