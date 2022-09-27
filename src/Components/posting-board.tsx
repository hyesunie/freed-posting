import React from 'react';
import { PostInfo } from '..';
import { PostPageAction } from '../pages/Home';

import Post from './post';
import './posting-board.css';

interface PostingBoardInitState {
  postList: PostInfo[];
  pageDispatcher: (param: PostPageAction) => void;
}
interface PostingBoardProps {
  initState: PostingBoardInitState;
}

function PostingBoard({ initState }: PostingBoardProps): ReactElement {
  const { postList, pageDispatcher } = initState;

  return (
    <div className="posting__board-wrapper">
      <ul className="posting__board-list">
        {postList.map((postInfo) => {
          const imgURL = `https://place-hold.it/300x300/aaa/000000&text=
        ${postInfo.title}`;
          return (
            <li>
              <Post
                id={Number(postInfo.id)}
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
