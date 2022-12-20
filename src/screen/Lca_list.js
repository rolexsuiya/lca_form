import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import usePagination from "@mui/material/usePagination";
import TablePagination from "@mui/material/TablePagination";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Grid } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#F5F5F5",
    fontSize: 17,

    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StylePagination = styled(TablePagination)({
  "& .MuiToolbar-root": {
    paddingLeft: "0px !important",
  },
});

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const LcaList = () => {
  const [data, setData] = useState(null);

  const [orderColumn, setorderColumn] = useState("empMail");
  const [orderType, setOrderType] = useState("asc");

  const sortTablecloum = async (columnKey, type) => {
    // "role" === "EName";
    if (columnKey === orderColumn) {
      const response = await sortTablecloumn(
        orderType === "asc" ? "desc" : "asc",
        columnKey,
        type
      );
      debugger;
      setOrderType(orderType === "asc" ? "desc" : "asc");
      setorderColumn(columnKey);
    } else {
      const response = await sortTablecloumn("asc", columnKey, type);
      debugger;
      setOrderType("asc");
      setorderColumn(columnKey);
    }
  };

  const sortTablecloumn = (order, columnKey, type) => {
    if (order === "asc") {
      if (type === "string") {
        let sortedData = data.sort((value1, value2) =>
          value2[columnKey] < value1[columnKey]
            ? 1
            : value2[columnKey] > value1[columnKey]
            ? -1
            : 0
        );

        return sortedData;
      } else if (type === "object") {
        let sortedData = data.sort((value1, value2) =>
          value2[columnKey]["label"] < value1[columnKey]["label"]
            ? 1
            : value2[columnKey]["label"] > value1[columnKey]["label"]
            ? -1
            : 0
        );
        return sortedData;
      }
    } else if (order === "desc") {
      if (type === "string") {
        let sortedData = data.sort((value1, value2) =>
          value1[columnKey] < value2[columnKey]
            ? 1
            : value1[columnKey] > value2[columnKey]
            ? -1
            : 0
        );

        return sortedData;
      } else if (type === "object") {
        let sortedData = data.sort((value1, value2) =>
          value1[columnKey]["label"] < value2[columnKey]["label"]
            ? 1
            : value1[columnKey]["label"] > value2[columnKey]["label"]
            ? -1
            : 0
        );
        return sortedData;
      }
    }
  };

  let navigate = useNavigate();

  const List = styled("ul")({
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    marginTop: "12px",
  });

  const [myPage, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  useEffect(() => {
    let data = localStorage.getItem("showList");
    let mapData = JSON.parse(data);
    setData(mapData);
  }, []);

  const handleDelete = (id) => {
    let dele = localStorage.getItem("showList");
    let deleteData = JSON.parse(dele);
    let deleted = deleteData.filter((row) => row?.id != id);
    localStorage.setItem("showList", JSON.stringify(deleted));
    toast.success("data deleted Successfully");
    setData(deleted);
  };

  const handleEdit = (row) => {
    navigate("/LcaEdit", {
      state: { row: row },
    });
  };
  const { items } = usePagination({
    count: Math.ceil(data?.length / rowsPerPage),
  });
  const nextBtn = () => {
    if (myPage * rowsPerPage + rowsPerPage < data.length) {
      setPage((pre) => pre + 1);
    }
  };

  const preBtn = () => {
    if (myPage > 0) {
      setPage((pre) => pre - 1);
    }
  };
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Toaster />
        <AppBar position="static" color="secondary">
          <Box
            display="flex"
            direction="row"
            justifyContent="space-between"
            sx={{ padding: "20px 34px" }}
          >
            <Typography variant="h6" color="primary" component="div">
              LCA REQUESTS
            </Typography>
            <Button href="/LcaEdit" variant="contained">
              ADD NEW
            </Button>
          </Box>
        </AppBar>

        <Box padding={4}>
          <TableContainer component={Paper} sx={{ height: "500px" }}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell
                    key={1}
                    sx={{ cursor: "pointer" }}
                    onClick={() => sortTablecloum("clasfition", "object")}
                  >
                    LCA Number&nbsp;&uarr;&darr;
                  </StyledTableCell>
                  <StyledTableCell
                    key={2}
                    sx={{ cursor: "pointer" }}
                    onClick={() => sortTablecloum("EName", "string")}
                    align="left"
                  >
                    ETA Name&nbsp;&uarr;&darr;
                  </StyledTableCell>
                  <StyledTableCell
                    key={3}
                    sx={{ cursor: "pointer" }}
                    onClick={() => sortTablecloum("role", "object")}
                    align="left"
                  >
                    Job Role&nbsp;&uarr;&darr;
                  </StyledTableCell>
                  <StyledTableCell
                    key={4}
                    sx={{ cursor: "pointer" }}
                    onClick={() => sortTablecloum("country", "object")}
                    align="left"
                  >
                    State&nbsp;&uarr;&darr;
                  </StyledTableCell>
                  <StyledTableCell
                    key={5}
                    sx={{ cursor: "pointer" }}
                    onClick={() => sortTablecloum("location", "object")}
                    align="left"
                  >
                    City&nbsp;&uarr;&darr;
                  </StyledTableCell>
                  <StyledTableCell
                    key={6}
                    sx={{ cursor: "pointer" }}
                    onClick={() => sortTablecloum("visa", "object")}
                    align="left"
                  >
                    Status&nbsp;&uarr;&darr;
                  </StyledTableCell>
                  <StyledTableCell
                    key={7}
                    sx={{ cursor: "pointer" }}
                    onClick={() => sortTablecloum("empMail", "string")}
                    align="left"
                  >
                    Email&nbsp;&uarr;&darr;
                  </StyledTableCell>
                  <StyledTableCell key={8} align="center">
                    Edit
                  </StyledTableCell>
                  <StyledTableCell key={9} align="center">
                    Delete
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data &&
                  data
                    ?.slice(
                      myPage * rowsPerPage,
                      myPage * rowsPerPage + rowsPerPage
                    )
                    .map((row) => (
                      <StyledTableRow key={row?.id}>
                        <StyledTableCell
                          component="th"
                          scope="row"
                          key={row?.id}
                        >
                          {row?.clasfition?.label}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {row?.EName}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {row?.role?.label}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {row?.country?.label}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {row?.location?.label}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {row?.visa?.label}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {row?.empMail}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <EditIcon
                            sx={{ cursor: "pointer" }}
                            color="primary"
                            onClick={() => handleEdit(row)}
                          />
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <DeleteIcon
                            color="primary"
                            sx={{ cursor: "pointer" }}
                            onClick={() => handleDelete(row?.id)}
                          />
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Grid container>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <Box
                display="flex"
                direction="row"
                justifyContent="flex-start"
                mt={2}
              >
                <StylePagination
                  rowsPerPageOptions={[5, 10, 15]}
                  component="div"
                  count={data?.length}
                  rowsPerPage={rowsPerPage}
                  page={myPage}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={6} lg={6}>
              <Box
                display="flex"
                direction="row"
                justifyContent="flex-end"
                mt={2}
              >
                <List>
                  {items.map(({ page, type, selected }, index) => {
                    let children = null;

                    if (type === "start-ellipsis" || type === "end-ellipsis") {
                      children = ".....";
                    } else if (type === "page") {
                      children = (
                        <Button
                          size="small"
                          variant={
                            myPage == page - 1 ? "contained" : "outlined"
                          }
                          type="button"
                          onClick={() => {
                            setPage(page - 1);
                          }}
                          style={{
                            fontWeight: selected ? "bold" : undefined,
                          }}
                        >
                          {page}
                        </Button>
                      );
                    } else {
                      children = (
                        <Button
                          variant="outlined"
                          type="button"
                          size="small"
                          onClick={() => {
                            type == "next" ? nextBtn() : preBtn();
                          }}
                        >
                          {type}
                        </Button>
                      );
                    }
                    return (
                      <Typography variant="subtitle1" key={index}>
                        {" "}
                        {children}
                      </Typography>
                    );
                  })}
                </List>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default LcaList;
