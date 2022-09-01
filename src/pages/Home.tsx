import React, { useEffect, useReducer } from 'react';
import './Home.css';
import { PostInfoData } from '../App';
import PostingBoard from '../Components/posting-board';
import Pagination from '../Components/pagination';

interface HomeProps {
  postData: PostInfoData[];
}

export interface PostState {
  postInfoList: PostInfoData[];
  currentPost: PostInfoData[] | null;
  length: number;
}

export interface PostAction {
  next: 'search' | 'page' | 'init';
  nextData: string | number | null;
}

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

function Home({ postData }: HomeProps): ReactElement {
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
