import React from 'react';
import { PostInfoData } from '../App';
import { PostAction } from '../pages/Home';
import Post from './post';
import './posting-board.css';

interface PostingBoardProps {
  postInfoList: PostInfoData[];
  postDispatcher: (param: PostAction) => void;
}

function PostingBoard({
  postInfoList,
  postDispatcher,
}: PostingBoardProps): ReactElement {
  return (
    <div className="posting__board-wrapper">
      <ul className="posting__board-list">
        {postInfoList.map((postInfo) => {
          const imgURL = `https://place-hold.it/300x300/aaa/000000&text=
        ${postInfo.title}`;
          return (
            <li>
              <Post
                userId={postInfo.userId}
                id={postInfo.id}
                title={postInfo.title}
                imgUrl={imgURL}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default PostingBoard;
