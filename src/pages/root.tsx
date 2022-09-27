import React from 'react';
import { Outlet, Form, Link } from 'react-router-dom';

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
