import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useState } from "react";
import styled from "styled-components";
import moment from "moment";

const TableWrapper = styled.div`
  margin-top: 1px;
  transition: all 0.5s ease-in-out;
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
`;

export default function PrintSimpleTable({ rows, columns, title, bgColor }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const HandleDoubleClick = (e) => {
    // Placeholder for double-click functionality
  };

  const BorderColor = `border-[${bgColor}]`;

  return rows.length === 0 ? (
    <div></div>
  ) : (
    <TableWrapper isAct={false}>
      <Paper sx={{ width: "100%" }}>
        <TableContainer
          className={`border-none ${
            bgColor ? BorderColor : "border-main"
          } border-t-white`}
          sx={{ borderRadius: "10px 10px 10px 10px" }}
        >
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column, index) => (
                  <TableCell
                    key={index}
                    align={column.align}
                    className="select-none"
                    style={{
                      minWidth: column.minWidth,
                      backgroundColor: bgColor ? bgColor : "#ffffff",
                      color: "black",
                      fontWeight: "600",
                      fontSize: "1rem",
                      fontFamily: "'Quicksand', sans-serif",
                      borderBottom: "2px solid #465462",
                      textAlign:
                        column.id === "qty" ||
                        column.id === "price" ||
                        column.id === "total"
                          ? "center"
                          : "left",
                    }}
                  >
                    {column.title}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={index}
                  style={{ cursor: "pointer" }}
                >
                  {columns.map(({ format, id }, key) => {
                    let value = row[id];
                    if (id === "qty" || id === "price") {
                      value = Number(value).toLocaleString();
                    }
                    if (id === "total") {
                      value = (
                        Number(row.qty) * Number(row.price)
                      ).toLocaleString();
                    }
                    return (
                      <TableCell
                        onClick={HandleDoubleClick}
                        className={`font-[Roboto] select-none`}
                        style={{
                          fontWeight: "400",
                          fontSize: "0.95rem",
                          color: bgColor ? bgColor : "#465462",
                          textAlign:
                            id === "qty" || id === "price" || id === "total"
                              ? "center"
                              : "left",
                        }}
                      >
                        {format && typeof value === "number"
                          ? format(value)
                          : id === "date"
                          ? moment(new Date(value * 1000)).format("DD/MM/YY")
                          : value || "N/A"}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </TableWrapper>
  );
}
