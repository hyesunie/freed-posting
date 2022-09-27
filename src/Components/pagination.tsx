import React from 'react';
import { PostPageAction } from '../pages/Home';
import './pagination.css';

interface PaginationInitState {
  length: number;
  selectedIdx: number;
  movePageDispatcher: (postAction: PostPageAction) => void;
}
interface PaginationProps {
  initState: PaginationInitState;
}

function Pagination({ initState }: PaginationProps): ReactElement {
  const { length, selectedIdx, movePageDispatcher } = initState;
  const pageCount = length / 5;

  const renderPageNumber = (): JSX.Element[] => {
    const pageNumberList = [];

    const onClickPage = (
      e:
        | React.MouseEvent<HTMLLIElement, MouseEvent>
        | React.KeyboardEvent<HTMLLIElement>
    ): void => {
      const $target = e.target as HTMLLIElement;
      movePageDispatcher({ next: 'page', nextData: $target.innerText });
    };
    // eslint-disable-next-line no-plusplus
    for (let i = 1; i < pageCount + 1; i++) {
      pageNumberList.push(
        <li
          key={String(i)}
          className="pagination__element"
          role="presentation"
          onClick={onClickPage}
          onKeyDown={onClickPage}
        >
          {i}
        </li>
      );
    }

    return pageNumberList;
  };

  return (
    <section className="pagination">
      <ul className="pagination__list">{renderPageNumber()}</ul>
    </section>
  );
}

export default Pagination;
