import React from "react";
import "./post.css"
import {SELECTOR} from "../const"

interface PostProps{
  userId:number
  id:number
  title:string;
  imgUrl:string;
}

function Post(props:PostProps):ReactElement {
  const {userId, id, title, imgUrl} = props
// TODO: 클래스 네임 객체라서 rerendering 되는지 확인 해야할듯!
  return (
    <div className={SELECTOR.POST_WRAPPER} id={`${id}`} data-user={userId} >
      <h2 className={SELECTOR.POST_TITLE}>{title}</h2>
      <img className={SELECTOR.POST_IMG} src={imgUrl} alt="posting" />
      <div className={SELECTOR.POST_ACTION}>
          <span>수정</span>
          <span>삭제</span>
      </div>
    </div>
  )
}

export default Post