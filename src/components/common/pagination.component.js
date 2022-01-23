import _ from "lodash";
const Pagination = ({ totalItem, pageCount, activePage, onClickPage }) => {
  const totalPages = Math.ceil(totalItem / pageCount);
  const pages = _.range(1, totalPages + 1, 1);

  if (totalItem <= pageCount) return null;

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        <li
          onClick={() =>
            activePage - 1 >= 1 ? onClickPage(activePage - 1) : null
          }
          className="page-item"
        >
          <a className="page-link">Previous</a>
        </li>
        {pages.map((item) => {
          return (
            <li
              onClick={() => onClickPage(item)}
              className={item === activePage ? "page-item active" : "page-item"}
            >
              <a className="page-link">{item}</a>
            </li>
          );
        })}

        <li
          onClick={() =>
            activePage + 1 <= totalPages ? onClickPage(activePage + 1) : null
          }
          className="page-item"
        >
          <a className="page-link">Next</a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
