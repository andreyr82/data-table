import { memo } from 'react';

const MAX_PAGES = 10;
const OFFSET_PAGES = 5;

const Pagination = memo(({ page, pagesCount, onChangePage }) => {
  const showPages = pagesCount > MAX_PAGES ? MAX_PAGES : pagesCount;

  function getStartPage() {
    let startPage = page - OFFSET_PAGES;

    if (startPage >= 1) {
      if (startPage + showPages > pagesCount) {
        startPage = pagesCount - (showPages - 1);
      }
    } else {
      startPage = 1;
    }

    return startPage;
  }

  const startPage = getStartPage();
  const endPage = startPage + showPages
  const pages = [];
  for (let i = startPage; i < endPage; i++) {
    pages.push(
      <li className="page-item" key={i}>
        <button className={`page-link ${i === page ? 'active' : ''}`} onClick={() => onChangePage(i)}>{i}</button>
      </li>
    )
  }


  return (
      <ul className="pagination">
        <li className={`page-item ${startPage === 1 ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => onChangePage(1)}>&laquo;</button>
        </li>
        {pages}
        <li className={`page-item ${startPage + 10 >= pagesCount ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => onChangePage(pagesCount)}>&raquo;</button>
        </li>
      </ul>
  )
});

export default Pagination;