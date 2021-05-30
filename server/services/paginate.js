const config = require('config')[process.env.NODE_ENV];
const maxPages = config.get('maxPages');
const paginate = (totalItems, currentPage, pageSize = 15) => {
  let totalPages = Math.ceil(totalItems / pageSize);

  if (currentPage < 1) {
    currentPage = 1;
  } else if (currentPage > totalPages) {
    currentPage = totalPages;
  }

  let startPage, endPage;

  if (totalPages <= maxPages) {
    startPage = 1;

    endPage = totalPages;
  } else {
    let maxPagesBeforeCurrentPage = Math.floor(maxPages / 2);

    let maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1;

    if (currentPage <= maxPagesBeforeCurrentPage) {
      startPage = 1;

      endPage = maxPages;
    } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
      startPage = totalPages - maxPages + 1;

      endPage = totalPages;
    } else {
      startPage = currentPage - maxPagesBeforeCurrentPage;

      endPage = currentPage + maxPagesAfterCurrentPage;
    }
  }

  let startIndex = (currentPage - 1) * pageSize;

  let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

  return {
    totalItems: totalItems,
    currentPage: currentPage,
    pageSize: pageSize,
    totalPages: totalPages,
    startIndex: startIndex,
    endIndex: endIndex,
  };
};

module.exports = paginate;
