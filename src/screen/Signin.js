import {
  Alert,
  Box,
  Button,
  InputAdornment,
  Link,
  Paper,
  Snackbar,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import DraftsIcon from "@mui/icons-material/Drafts";
import LockIcon from "@mui/icons-material/Lock";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const StyledText = styled(TextField)({
  marginBottom: "30px",
  "& .MuiInputBase-root": {
    padding: "0 ",
  },
});

const SignIn = () => {
  let navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
    error: {
      email: "",
      password: "",
    },
  });

  const handeleChange = (key, value) => {
    const error = data?.error;
    error[key] = "";
    setData({ ...data, [key]: value, error });
  };

  const validateForm = () => {
    var isValid = true;
    const error = data?.error;
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (data?.email?.length === 0) {
      isValid = false;
      error.email = "Email is Required";
    }
    if (data?.password?.length === 0) {
      isValid = false;
      error.password = "Password is Required";
    }
    if (data?.email && regexEmail.test(data?.email) === false) {
      isValid = false;
      error.email = "Please Enter Valid Email";
    }
    if (
      data?.email &&
      regexEmail.test(data?.email) === true &&
      data?.password
    ) {
      navigate("/LcaList");
    }
    if (error.password && error.email) {
      setOpen(true);
      // alert("Please Enter Email and Password");
    }
    setData({ ...data, error });

    return isValid;
  };

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handeleSumit = () => {
    if (validateForm()) {
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        direction: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: "auto",
        marginTop: "150px",
        padding: "10px",
        "& > :not(style)": {
          m: 1,
          width: 500,
          height: "auto",
        },
      }}
    >
      <Paper elevation={3} sx={{ padding: "35px" }}>
        <Stack>
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <Alert
              onClose={handleClose}
              severity="error"
              sx={{ width: "100%" }}
            >
              Please Enter Email and Password!
            </Alert>
          </Snackbar>
          <Typography
            variant="h4"
            display="flex"
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{ marginBottom: "45px", color: "#456a70" }}
          >
            SIGN IN
          </Typography>
          <StyledText
            helperText={data?.error?.email}
            onChange={(e) => handeleChange("email", e.target.value)}
            placeholder="Enter Email Id"
            type={"email"}
            error={data?.error?.email ? true : false}
            InputProps={{
              startAdornment: (
                <InputAdornment
                  position="start"
                  sx={{ backgroundColor: "#D3DADD", padding: "28px 20px" }}
                >
                  <DraftsIcon sx={{ fontSize: "1.3rem" }} />
                </InputAdornment>
              ),
            }}
          />
          <StyledText
            helperText={data?.error?.password}
            onChange={(e) => handeleChange("password", e.target.value)}
            placeholder="Enter Password"
            name="password"
            error={data?.error?.password ? true : false}
            type={"password"}
            InputProps={{
              startAdornment: (
                <InputAdornment
                  position="start"
                  sx={{ backgroundColor: "#D3DADD", padding: "27px 20px" }}
                >
                  <LockIcon sx={{ fontSize: "1.3rem" }} />
                </InputAdornment>
              ),
            }}
          />
          <Box
            sx={{ marginTop: "15px" }}
            display="flex"
            direction="row"
            justifyContent="space-between"
          >
            <Link href="/Reset" color="primary" underline="always">
              Forgot Password?
            </Link>
            <Button variant="contained" onClick={() => handeleSumit()}>
              SIGN IN
            </Button>
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
};

export default SignIn;
