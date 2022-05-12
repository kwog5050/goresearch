import React, { useState, useEffect, Suspense } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { dbService } from "../../fbase";
import { collection, query, orderBy, onSnapshot, updateDoc, doc } from "firebase/firestore";

import "../../sass/subPage/board/boardRead.scss"
import Update from "./Edit";

function Read({ userObj, pageType }) {
  const { pageId, boardNum } = useParams();

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
  //검색 기능
  const [productSearch, setProductSecrch] = useState("");
  const [eventSearch, setEventSecrch] = useState("");
  const [productSearchSelect, setProductSearchSelect] = useState("Cat_No");
  const [eventSearchSelect, setEventSearchSelect] = useState("제목");
  const [booleanSearch, setBooleanSearch] = useState(false);
  const [data, setData] = useState(nweets);
  const history = useHistory();
  const productClick = () => {
    if (productSearchSelect == "Cat_No") {
      setData(
        nweets.filter((item) => {
          const re = new RegExp(productSearch, 'gi')
          return item.catNo.match(re)
        })
      )
      console.log(nweets.filter((item) => {
        const re = new RegExp(productSearch, 'gi')
        return item.catNo.match(re)
      }));
      console.log(data);
    } else if (productSearchSelect == "Product") {
      setData(
        nweets.filter((item) => {
          const re = new RegExp(productSearch, 'gi')
          return item.product.match(re)
        })
      )
    } else if (productSearchSelect == "Size") {
      setData(
        nweets.filter((item) => {
          const re = new RegExp(productSearch, 'gi')
          return item.size.match(re)
        })
      )
    }
    //검색 클릭하면 1페이지로
    history.push(`/subPage/${pageType}/${pageId}/1`);
    setBooleanSearch(true);
  }

  const eventClick = () => {
    if (eventSearchSelect == "제목") {
      setData(
        nweets.filter((item) => {
          const re = new RegExp(eventSearch, 'gi')
          return item.title.match(re)
        })
      )
    } else if (eventSearchSelect == "닉네임") {
      setData(
        nweets.filter((item) => {
          const re = new RegExp(eventSearch, 'gi')
          return item.nickname.match(re)
        })
      )
    }
    //검색 클릭하면 1페이지로
    history.push(`/subPage/${pageType}/${pageId}/1`);
    setBooleanSearch(true);
  }
  //검색 초기화
  useEffect(() => {
    setBooleanSearch(false);
    setProductSecrch("");
    setEventSecrch("");
  }, [pageId])
  //검색하면 새로운 화면으로
  useEffect(() => { }, [data])

  const onChange = (event) => {
    const { target: { value, name } } = event;
    if (name === "productSearch") {
      setProductSecrch(value);
    }
    if (name === "eventSearch") {
      setEventSecrch(value);
    }
    if (name === "productSearchSelect") {
      setProductSearchSelect(value);
    }
    if (name === "eventSearchSelect") {
      setEventSearchSelect(value);
    }
  }

  //현재 페이지
  const [nowPage, setNowPage] = useState(boardNum);

  //현재 페이지 최대 게시목록 갯수
  const [boardPerPage, setBoardPerPage] = useState(15);
  const indexOfLast = nowPage * boardPerPage;
  const indexOfFirst = indexOfLast - boardPerPage;
  let boardCount = 0;

  const pageNumbers = [];
  //검색 전후 감지
  if (booleanSearch == false) {
    //게시목록 갯수 셋팅
    boardCount = nweets.slice(indexOfFirst, indexOfLast);
    //페이징처리
    for (let i = 1; i <= Math.ceil(nweets.length / boardPerPage); i++) {
      const minNum = Math.ceil(boardNum) - 2;
      const maxNum = Math.ceil(boardNum) + 2;
      if (nweets.length > 5) {
        if (boardNum == 1) {
          if (maxNum + 2 >= i) {
            pageNumbers.push(i);
          }
        } else if (boardNum == 2) {
          if (minNum <= i && maxNum + 1 >= i) {
            pageNumbers.push(i);
          }
        } else if (boardNum == nweets.length) {
          if (minNum - 2 <= i) {
            pageNumbers.push(i);
          }
        } else if (boardNum == nweets.length - 1) {
          if (minNum - 1 <= i && maxNum >= i) {
            pageNumbers.push(i);
          }
        } else if (minNum <= i && maxNum >= i) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(i);
      }
    }
  } else {
    boardCount = data.slice(indexOfFirst, indexOfLast);

    for (let i = 1; i <= Math.ceil(data.length / boardPerPage); i++) {
      const minNum = Math.ceil(boardNum) - 2;
      const maxNum = Math.ceil(boardNum) + 2;
      if (data.length > 5) {
        if (boardNum == 1) {
          if (maxNum + 2 >= i) {
            pageNumbers.push(i);
          }
        } else if (boardNum == 2) {
          if (minNum <= i && maxNum + 1 >= i) {
            pageNumbers.push(i);
          }
        } else if (boardNum == data.length) {
          if (minNum - 2 <= i) {
            pageNumbers.push(i);
          }
        } else if (boardNum == data.length - 1) {
          if (minNum - 1 <= i && maxNum >= i) {
            pageNumbers.push(i);
          }
        } else if (minNum <= i && maxNum >= i) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(i);
      }
    }
  }

  //현재페이지 초기화
  useEffect(() => {
    setNowPage(boardNum);
  }, [boardNum])

  //로딩 스타일
  let [suspenseStyle, setSuspenseStyle] = useState({
    textAlign: "center",
    padding: "200px 0px",
  })

  return (
    <>
      {
        pageId !== "event"
          ? <div className="boardRead product">
            <div className="buttons">
              {
                userObj === null
                  ? <div></div>
                  : <Link to={`/board/create/${pageId}`}>글쓰기</Link>
              }
              <div className="search">
                <div>
                  <select name="productSearchSelect" onChange={onChange}>
                    <option value="Cat_No">Cat_No</option>
                    <option value="Product">Product</option>
                    <option value="Size">Size</option>
                  </select>
                  <i class="fas fa-angle-down"></i>
                </div>
                <input type="text" name="productSearch" placeholder="search" value={productSearch} onChange={onChange} />
                <button onClick={productClick}>검색</button>
              </div>
            </div>
            <ul className="title">
              <li>Cat_No</li>
              <li>Product</li>
              <li>Size</li>
            </ul>
            <Suspense fallback={<div style={suspenseStyle}><img src="/image/loding.gif" alt="" /></div>}>
              <ul className="boardList">
                {
                  nweets.length == 0
                    ? <div>현재 등록된 게시글이 없습니다.</div>
                    : boardCount.map((a, i) => {
                      return (
                        <li key={i}>
                          <p>{a.catNo}</p>
                          <p>{a.product}</p>
                          <p>{a.size}</p>
                          <div className="editButton">
                            {
                              userObj === null
                                ? null
                                : a.userId === userObj.email
                                  ? <Update nweetObj={a} pageId={pageId}></Update>
                                  : null
                            }
                          </div>
                        </li>
                      )
                    })
                }
              </ul>
            </Suspense>
            <ul className="pagingnetion">
              {
                pageNumbers.map((a, i) => {
                  return (
                    <li key={i} className={boardNum == a ? "on" : ""}><Link to={`/subPage/product/${pageId}/${a}`}>{a}</Link></li>
                  )
                })
              }
            </ul>
          </div>
          : <div className="boardRead event">
            <div className="buttons">
              {
                userObj === null
                  ? <div></div>
                  : <Link to={`/board/create/${pageId}`}>글쓰기</Link>
              }
              <div className="search">
                <div>
                  <select name="eventSearchSelect" onChange={onChange}>
                    <option value="제목">제목</option>
                    <option value="닉네임">닉네임</option>
                  </select>
                  <i class="fas fa-angle-down"></i>
                </div>
                <input type="text" name="eventSearch" placeholder="search" value={eventSearch} onChange={onChange} />
                <button onClick={eventClick}>검색</button>
              </div>
            </div>
            <ul className="title">
              <li>제목</li>
              <li>닉네임</li>
              <li>조회수</li>
              <li>날짜</li>
            </ul>
            <Suspense fallback={<div style={suspenseStyle}><img src="/image/loding.gif" alt="" /></div>}>
            <ul className="boardList">
              {
                nweets.length == 0
                  ? <div>현재 등록된 게시글이 없습니다.</div>
                  : boardCount.map((a, i) => {
                    //조회수 업데이트
                    const viewClick = async () => {
                      await updateDoc(doc(dbService, `${pageId}`, `${a.id}`), {
                        view: a.view + 1,
                      });
                    }

                    //날짜 변환
                    const today = new Date(a.createAt.seconds * 1000);

                    const year = today.getFullYear();
                    const month = ('0' + (today.getMonth() + 1)).slice(-2);
                    const day = ('0' + today.getDate()).slice(-2);

                    const dateString = month + '-' + day;
                    return (
                      <li key={i}>
                        <p><Link onClick={() => { viewClick() }} to={`/subPage/event/${pageId}/detail/${a.id}`}>{a.title}</Link></p>
                        <p>{a.nickname}</p>
                        <p>{a.view}</p>
                        <p>{dateString}</p>
                        {
                          pageId === "event"
                            ? null
                            : <div className="editButton">
                              {
                                userObj === null
                                  ? null
                                  : a.userId === userObj.email
                                    ? <Update nweetObj={a} pageId={pageId}></Update>
                                    : null
                              }
                            </div>
                        }
                      </li>
                    )
                  })
              }
            </ul>
            </Suspense>
            <ul className="pagingnetion">
              {
                pageNumbers.map((a, i) => {
                  return (
                    <li key={i} className={boardNum == a ? "on" : ""}><Link to={`/subPage/${pageType}/${pageId}/${a}`}>{a}</Link></li>
                  )
                })
              }
            </ul>
          </div>
      }
    </>
  )
}

export default Read;