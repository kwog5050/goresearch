import React, { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { dbService, storageService } from "../../fbase";
import { collection, query, orderBy, onSnapshot, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";

import "../../sass/subPage/board/boardDetail.scss";

function ReadDetail({userObj}) {
  const { pageId, boardId } = useParams();
  const history = useHistory();
  const back = () => {
    history.goBack();
  }

  const [nweets, setNweets] = useState([]);
  const getNweets = async () => {
    const q = query(collection(dbService, pageId), orderBy("createAt", "desc"));
    onSnapshot(q, (snapshot) => {
      const nweetArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNweets(nweetArr);
    })
  }
  useEffect(() => {
    getNweets();
  }, [pageId]);

  //게시글 페이지 띄우기
  let [date, setDate] = useState();
  for (let i = 0; i < nweets.length; i++) {
    if (boardId === nweets[i].id) {
      setNweets(nweets[i]);
      setDate(nweets[i].createAt.seconds);
    }
  }
  // 날짜 변환
  const today = new Date(date * 1000);

  const year = today.getFullYear();
  const month = ('0' + (today.getMonth() + 1)).slice(-2);
  const day = ('0' + today.getDate()).slice(-2);

  const dateString = year + '-' + month + '-' + day;

  //삭제
  const onDeleteClick = async () => {
    const ok = window.confirm("정말로 삭제 하시겠습니까?");
    if (ok) {
      history.goBack();
      await deleteDoc(doc(dbService, `${pageId}/${nweets.id}`));
      await deleteObject(ref(storageService, nweets.attachmentUrl));
    }
  }

  return (
    <>
      <div className="detailTitle">
        <div>
          <h5>{nweets.title}</h5>
          <span><i className="fas fa-eye"></i>{nweets.view}</span>
          <span><i className="fas fa-calendar-alt"></i>{dateString}</span>
        </div>
        <div className="editButtons">
          {
            userObj.email === nweets.nickname || nweets.nickname === "최고관리자"
              ? <button onClick={onDeleteClick}><i className="far fa-trash-alt"></i></button>
              : null
          }
          {/* <button onClick={back}><i class="fas fa-bars"></i></button> */}
          <Link to="/subPage/event/event/1"><i className="fas fa-bars"></i></Link>
        </div>
      </div>
      <div className="contents">
        {nweets.attachmentUrl && <img src={nweets.attachmentUrl}></img>}
        <p>{nweets.content}</p>
      </div>

    </>
  )
}

export default ReadDetail;