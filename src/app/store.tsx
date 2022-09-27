import React, {
  createContext,
  Dispatch,
  ReactNode,
  useReducer,
  useContext,
} from 'react';
import { PostInfo } from '../index';

interface StoreInfo {
  state: PostInfo;
  setState: () => void;
}

type PostsAction =
  | { type: 'add'; post: PostInfo }
  | { type: 'delete'; id: string };

export type PostsDispatch = Dispatch<PostsAction>;
const PostStateContext = createContext<PostInfo[] | null>(null);
const PostsDispatchContext = createContext<PostsDispatch>(() => null);

function reducer(state: PostInfo[] | [], action: PostsAction): PostInfo[] {
  function updateLocalStorage(newState: PostInfo[]): void {
    localStorage.setItem('postList', JSON.stringify(newState));
  }

  switch (action.type) {
    case 'add': {
      const newState = [...state, action.post];
      updateLocalStorage(newState);
      return newState;
    }
    case 'delete': {
      const newState = state.filter((post) => post.id !== action.id);
      updateLocalStorage(newState);
      return newState;
    }
    default:
      throw new Error('지원하지 않는 action입니다.');
  }
}

// eslint-disable-next-line react/function-component-definition
export const PostsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const storageData = localStorage.getItem('postList');
  const initState = storageData ? JSON.parse(storageData) : [];

  const [state, dispatch] = useReducer(reducer, initState);

  return (
    <PostStateContext.Provider value={state}>
      <PostsDispatchContext.Provider value={dispatch}>
        {children}
      </PostsDispatchContext.Provider>
    </PostStateContext.Provider>
  );
};

export function usePostList(): PostInfo[] {
  const state = useContext(PostStateContext);
  if (!state) throw new Error('PostStateContext를 찾을 수 없습니다.');

  return state;
}

export function usePostListDispatch(): PostsDispatch {
  const dispatch = useContext(PostsDispatchContext);
  if (!dispatch) throw new Error('PostsdispatchContext를 찾을 수 없습니다.');

  return dispatch;
}
