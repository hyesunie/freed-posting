import React, { useEffect, useReducer } from 'react';
import './Home.css';
import { useLoaderData } from 'react-router-dom';
import PostingBoard from '../Components/posting-board';
import Pagination from '../Components/pagination';
import { PostInfoData } from './root';

export interface PostState {
  postInfoList: PostInfoData[];
  currentPost: PostInfoData[] | null;
  length: number;
}

export interface PostAction {
  next: 'search' | 'page' | 'init';
  nextData: string | number | null;
}

export const loader = (): PostInfoData[] => {
  const postInfoString = localStorage.getItem('postInfo');
  if (!postInfoString) throw Error('불러올 포스팅이 없습니다.');

  const postInfoList = JSON.parse(postInfoString);
  return postInfoList;
};

function reducer(
  { postInfoList, currentPost, length }: PostState,
  action: PostAction
): PostState {
  const searchPost = (keyword: string): PostState => {
    // TODO: 정규식 추가하면 좋을듯
    const newcurrentPost = postInfoList.filter((post) =>
      post.title.includes(keyword)
    );

    return {
      postInfoList,
      currentPost: newcurrentPost,
      length,
    };
  };

  const searchPage = (pageNumber: number): PostState => {
    const newCurrentPost = postInfoList.filter(
      (_, idx) => pageNumber === idx / 5 + 1
    );
    return { postInfoList, currentPost: newCurrentPost, length };
  };

  const initCurrentPost = (): PostState => {
    const newCurrentPost = postInfoList.filter((_, idx) => idx >= 0 && idx < 5);

    return { postInfoList, currentPost: newCurrentPost, length };
  };

  switch (action.next) {
    case 'search': {
      return searchPost(String(action.nextData));
    }
    case 'page': {
      return searchPage(Number(action.nextData));
    }
    case 'init': {
      return initCurrentPost();
    }

    default:
      throw new Error(`Unhandled action type: ${action.next}`);
  }
}

function Home(): ReactElement {
  const postData = useLoaderData() as PostInfoData[];

  const initialState = {
    postInfoList: postData,
    currentPost: null,
    length: postData.length,
  };

  const [state, dispatcher] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatcher({ next: 'init', nextData: null });
  }, []);

  return (
    <div className="home-wrapper">
      <PostingBoard
        postInfoList={state.currentPost ?? []}
        postDispatcher={dispatcher}
      />
      <Pagination
        initState={{
          length: state.length,
          selectedIdx: 1,
          movePageDispatcher: dispatcher,
        }}
      />
    </div>
  );
}

export default Home;
