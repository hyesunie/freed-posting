import React from 'react';
import { Outlet, Form, Link } from 'react-router-dom';
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
      <div id="sidebar">
        <section>
          <form id="search-form" role="search">
            <input placeholder="Search" type="search" />
          </form>
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </section>
        <nav>
          <ul>
            <li>
              <Link to="posting/1">전체 포스팅 보기</Link>
            </li>
          </ul>
        </nav>
      </div>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Root;
