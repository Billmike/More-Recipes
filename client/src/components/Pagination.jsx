import React from 'react';
import ReactPaginate from 'react-paginate';

const Pagination = props => (
  <div>
    <ReactPaginate
      previousLabel="Previous"
      nextLabel="Next"
      breakLabel={<a href="">...</a>}
      breakClassName="page-link"
      onPageChange={props.handlePaginationChange}
      pageCount={props.pageCount}
      containerClassName="pagination pagination-lg custom-pagination"
      pageLinkClassName="page-link"
      nextLinkClassName="page-link"
      previousLinkClassName="page-link"
      disabledClassName="disabled"
      pageClassName="page-item"
      previousClassName="page-item"
      nextClassName="page-item"
      activeClassName="active"
      subContainerClassName="pages pagination"
    />
  </div>
);

export default Pagination;
