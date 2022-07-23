import React from 'react';
import { Reset } from 'styled-reset';
import './App.css';
import { readPostInfo } from './api';
import Home from './pages/Home';
import useAsync from './Hooks/useAsync';

export interface PostInfoData {
  userId: number;
  id: number;
  title: string;
}

function App(): ReactElement {
  const state = useAsync<PostInfoData[]>(readPostInfo);
  return (
    <div>
      <Reset />
      <div className="app">
        {state.loading ? (
          <p>로딩중...</p>
        ) : (
          <Home postData={state.data ?? []} />
        )}
      </div>
    </div>
  );
}

export default App;
