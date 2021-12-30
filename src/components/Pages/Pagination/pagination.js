import React from "react";
import "./pagination.css";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function Paginate({
  cardPerPage,
  totalCards,
  paginate,
  currentPage,
}) {

  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    paginate(value)
    setPage(value)
  };

  if (Math.ceil(totalCards / cardPerPage) < currentPage) {
    paginate(1);
  }

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalCards / cardPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pag-div">
     <Stack spacing={2}>
      <Pagination count={pageNumbers.length} page={page} onChange={handleChange} />
    </Stack>
    </div>
  );
}
