import React, { useCallback } from 'react';
import { PostAction } from '../pages/Home';

interface PaginationProps {
  length: number;
  postDispatcher: (param: PostAction) => void;
}

function Pagination({ length, postDispatcher }: PaginationProps): ReactElement {
  const pageCount = length / 5;

  const renderPageNumber = (): JSX.Element[] => {
    const pageNumberList = [];
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const handlePageNumber = useCallback(
      (page: number) => {
        return postDispatcher({ next: 'page', nextData: page });
      },
      [length]
    );

    // eslint-disable-next-line no-plusplus
    for (let i = 1; i < pageCount + 1; i++) {
      pageNumberList.push(<li>{i}</li>);
    }

    return pageNumberList;
  };

  return <ul>{renderPageNumber()}</ul>;
}

export default Pagination;
