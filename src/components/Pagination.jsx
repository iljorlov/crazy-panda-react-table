import React, { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export const Pagination = ({
  currentPage,
  setCurrentPage,
  data,
  entriesPerPage,
  selectedPaginatorPage,
  setSelectedPaginatorPage,
}) => {
  useEffect(() => {
    setSelectedPaginatorPage(0);
  }, [setSelectedPaginatorPage]);

  // get total number of pages from fetched data length
  let pages = [];
  let totalPages = data.length / entriesPerPage;
  for (let i = 1; i < totalPages + 1; i++) {
    pages.push(i);
  }

  // give 10 pages max for pagination container
  let numberOfPagesToShow = 10;
  let paginatorPages = [];
  for (let page = 0; page < pages.length / numberOfPagesToShow; page++) {
    let newPage = [];
    for (let i = 0; i < numberOfPagesToShow; i++) {
      if (page * 10 + i + 1 > pages[pages.length - 1]) {
        break;
      }
      newPage.push(page * 10 + i + 1);
    }
    paginatorPages.push(newPage);
  }

  const handleClick = (page) => {
    setCurrentPage(page);
  };

  const handleNext = () => {
    if (selectedPaginatorPage < paginatorPages.length - 1) {
      setSelectedPaginatorPage(selectedPaginatorPage + 1);
    }
  };
  const handlePrev = () => {
    if (selectedPaginatorPage > 0) {
      setSelectedPaginatorPage(selectedPaginatorPage - 1);
    }
  };

  return (
    <>
      {paginatorPages.length > 0 ? (
        <div className="pagination-container">
          <div className="pagination-block">
            <span className="next-prev" onClick={handlePrev}>
              &lt;
            </span>
            {paginatorPages[selectedPaginatorPage].map((page) => (
              <div className="pagination-link" key={uuidv4()}>
                {page === currentPage ? (
                  <span
                    className="selected-page"
                    value={page}
                    onClick={() => handleClick(page)}
                  >
                    {page}
                  </span>
                ) : (
                  <span value={page} onClick={() => handleClick(page)}>
                    {page}
                  </span>
                )}
              </div>
            ))}
            <span className="next-prev" onClick={handleNext}>
              &gt;
            </span>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};
