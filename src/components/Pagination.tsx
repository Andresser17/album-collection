import React from "react";
import ReactPaginate from "react-paginate";
// Icons
import {
  MdKeyboardArrowLeft as ArrowPrevious,
  MdKeyboardArrowRight as ArrowNext,
} from "react-icons/md";
// Styles
import styles from "./Pagination.module.css";

interface PaginationProps {
  pageCount: number;
  limit?: number;
  selected: number;
  setSelected: Function;
}

function Pagination({
  pageCount = 1,
  limit = 10,
  selected = 1,
  setSelected,
}: PaginationProps) {
  const handlePageClick = (e: { selected: number }) => {
    setSelected(e.selected * limit);
  };

  return (
    <ReactPaginate
      containerClassName={styles.container}
      pageClassName={styles["button-li"]}
      pageLinkClassName={styles.button}
      activeClassName={styles["button-active"]}
      previousLabel={<ArrowPrevious className={styles.arrow} />}
      previousClassName={styles["arrow-button-li"]}
      previousLinkClassName={styles["arrow-button"]}
      nextLabel={<ArrowNext className={styles.arrow} />}
      nextClassName={styles["arrow-button-li"]}
      nextLinkClassName={styles["arrow-button"]}
      onPageChange={handlePageClick}
      pageCount={Math.ceil(pageCount / limit)}
    />
  );
}

export default Pagination;
