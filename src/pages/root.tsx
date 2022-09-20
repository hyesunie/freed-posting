import React from 'react';
import { Outlet } from 'react-router-dom';
import { readPostInfo } from '../api';

export interface PostInfoData {
  userId: number;
  id: number;
  title: string;
}

function setPostInfo(newPostInfo: PostInfoData[]): void {
  localStorage.setItem('postInfo', JSON.stringify(newPostInfo));
}

export const loader = async (): Promise<PostInfoData[]> => {
  const postInfo = await readPostInfo<PostInfoData[]>();
  setPostInfo(postInfo);
  return postInfo;
};

function Root(): ReactElement {
  return (
    <div>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Root;
