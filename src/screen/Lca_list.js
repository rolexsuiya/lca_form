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

  let navigate = useNavigate();

  // const arrayData = [
  //   {
  //     name: "LCA_17 Dec 21_0354",
  //     case_number: "LCA_17 Dec 21_0354",
  //     role: "Associate",
  //     state: "Ghana",
  //     city: "Ghana",
  //     status: "Utilized Lca",
  //     email: "Email update",
  //     add: "add",
  //     dustbin: "delete",
  //   },
  //   {
  //     name: "LCA_17 Dec 21_0354",
  //     case_number: "LCA_17 Dec 21_0354",
  //     role: "Associate",
  //     state: "Ghana",
  //     city: "Ghana",
  //     status: "Utilized Lca",
  //     email: "Email update",
  //     add: "add",
  //     dustbin: "delete",
  //   },
  //   {
  //     name: "LCA_17 Dec 21_0354",
  //     case_number: "LCA_17 Dec 21_0354",
  //     role: "Associate",
  //     state: "Ghana",
  //     city: "Ghana",
  //     status: "Utilized Lca",
  //     email: "Email update",
  //     add: "add",
  //     dustbin: "delete",
  //   },
  //   {
  //     name: "LCA_17 Dec 21_0354",
  //     case_number: "LCA_17 Dec 21_0354",
  //     role: "Associate",
  //     state: "Ghana",
  //     city: "Ghana",
  //     status: "Utilized Lca",
  //     email: "Email update",
  //     add: "add",
  //     dustbin: "delete",
  //   },
  //   {
  //     name: "LCA_17 Dec 21_0354",
  //     case_number: "LCA_17 Dec 21_0354",
  //     role: "Associate",
  //     state: "Ghana",
  //     city: "Ghana",
  //     status: "Utilized Lca",
  //     email: "Email update",
  //     add: "add",
  //     dustbin: "delete",
  //   },
  //   {
  //     name: "LCA_17 Dec 21_0354",
  //     case_number: "LCA_17 Dec 21_0354",
  //     role: "Associate",
  //     state: "Ghana",
  //     city: "Ghana",
  //     status: "Utilized Lca",
  //     email: "Email update",
  //     add: "add",
  //     dustbin: "delete",
  //   },
  //   {
  //     name: "LCA_17 Dec 21_0354",
  //     case_number: "LCA_17 Dec 21_0354",
  //     role: "Associate",
  //     state: "Ghana",
  //     city: "Ghana",
  //     status: "Utilized Lca",
  //     email: "Email update",
  //     add: "add",
  //     dustbin: "delete",
  //   },
  // ];
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
    setRowsPerPage(parseInt(event.target.value));
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
    if (myPage * rowsPerPage > 0) {
      setPage((pre) => pre - 1);
    }
  };
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
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
            {/* <Typography variant="h6" color="primary" component="div">
              ADD NEW
            </Typography> */}
          </Box>
        </AppBar>

        <Box padding={4}>
          <TableContainer component={Paper} sx={{ height: "500px" }}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>
                    LCA Number&nbsp;&uarr;&darr;
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    ETA Name&nbsp;&uarr;&darr;
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    Job Role&nbsp;&uarr;&darr;
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    State&nbsp;&uarr;&darr;
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    City&nbsp;&uarr;&darr;
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    Status&nbsp;&uarr;&darr;
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    Email&nbsp;&uarr;&darr;
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    Edit&nbsp;&uarr;&darr;
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    Delete&nbsp;&uarr;&darr;
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
                    ?.map((row) => (
                      <StyledTableRow key={row?.id}>
                        <StyledTableCell component="th" scope="row">
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
                  rowsPerPageOptions={[7, 14, 23]}
                  component="div"
                  count={7}
                  page={myPage}
                  onPageChange={handleChangePage}
                  rowsPerPage={rowsPerPage}
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
