import React from "react";
import "./post.css"

interface PostProps{
  userId:number
  id:number
  title:string;
  imgUrl:string;
}

function Post(props:PostProps):ReactElement {
  const {userId, id, title, imgUrl} = props

  return (
    <div className="post-wrapper" id={`${id}`} data-user={userId} >
      <h2 className="post-title">{title}</h2>
      <img className="post-img" src={imgUrl} alt="posting" />
      <div className="post-action">
          <span>수정</span>
          <span>삭제</span>
      </div>
    </div>
  )
}

export default Post