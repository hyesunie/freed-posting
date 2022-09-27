import React, { useEffect, useReducer } from 'react';
import './Home.css';
import PostingBoard from '../Components/posting-board';
import Pagination from '../Components/pagination';
import { PostInfo } from '..';
import { usePostList } from '../app/store';

export interface PostPageState {
  postInfoList: PostInfo[];
  currentPost: PostInfo[] | null;
  length: number;
}

export interface PostPageAction {
  next: 'search' | 'page' | 'init';
  nextData: string | number | null;
}

function reducer(
  { postInfoList, currentPost, length }: PostPageState,
  action: PostPageAction
): PostPageState {
  const searchPost = (keyword: string): PostPageState => {
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

  const searchPage = (pageNumber: number): PostPageState => {
    const newCurrentPost = postInfoList.filter(
      (_, idx) => pageNumber === idx / 5 + 1
    );
    return { postInfoList, currentPost: newCurrentPost, length };
  };

  const initCurrentPost = (): PostPageState => {
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
  const postList = usePostList();

  const initialState = {
    postInfoList: postList,
    currentPost: null,
    length: postList.length,
  };

  const [state, dispatcher] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatcher({ next: 'init', nextData: null });
  }, []);

  return (
    <div className="home-wrapper">
      <PostingBoard
        initState={{
          postList: state.currentPost ?? [],
          pageDispatcher: dispatcher,
        }}
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
