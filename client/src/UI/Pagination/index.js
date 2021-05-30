import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

const Pager = (props) => {
  const {
    totalPages,
    currentPage,
    totalItems,
    startIndex,
    endIndex,
    itemsText,
    href,
  } = props.pager;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  let PaginationNumberedItems;

  PaginationNumberedItems = pages.map((page) => {
    let isActive = page === currentPage ? "active" : "";

    return (
      <PaginationItem key={page} className={isActive}>
        <PaginationLink href={`${href}?page=${page}`}>{page}</PaginationLink>
      </PaginationItem>
    );
  });

  const isPreviousButtonDisabled = currentPage === 1 ? "disabled" : " ";

  const isNextButtonDisabled = currentPage === totalPages ? "disabled" : " ";

  const previousPage = isPreviousButtonDisabled ? currentPage - 1 : "";

  const nextPage = isNextButtonDisabled ? currentPage + 1 : "";

  return (
    <>
      <Pagination listClassName="justify-content-end">
        <PaginationItem className={isPreviousButtonDisabled}>
          <PaginationLink previous href={`${href}?page=${previousPage}`} />
        </PaginationItem>

        {PaginationNumberedItems}

        <PaginationItem className={isNextButtonDisabled}>
          <PaginationLink next href={`${href}?page=${nextPage}`} />
        </PaginationItem>
      </Pagination>

      <p className="d-flex flex-row-reverse">
        Showing {startIndex + 1} to {endIndex + 1} of {totalItems} {itemsText}
      </p>
    </>
  );
};

export default Pager;
