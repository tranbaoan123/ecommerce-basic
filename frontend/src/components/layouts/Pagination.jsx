const Pagination = ({ records, page, setPage }) => {
  const paginationItemList = Math.ceil(records / 4);
  const result = Array.from({ length: paginationItemList }, (_, i) => i + 1);
  console.log(result);

  return (
    <div className="d-flex gap-2">
      {result?.map((item) => (
        <div
          className={page === item ? "pagination-btn active" : "pagination-btn"}
          key={item}
          onClick={() => setPage(item)}
        >
          {item}
        </div>
      ))}
    </div>
  );
};

export default Pagination;
