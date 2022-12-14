import {
  Box,
  Button,
  InputAdornment,
  Link,
  Paper,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import DraftsIcon from "@mui/icons-material/Drafts";

import React, { useState } from "react";

const StyledText = styled(TextField)({
  marginBottom: "30px",
  "& .MuiInputBase-root": {
    padding: "0 ",
  },
});

const SignIn = () => {
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
    if (data?.email?.length === 0) {
      isValid = false;
      error.email = "Email is Required";
    }
    setData({ ...data, error });
    return isValid;
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
          <Typography
            variant="h5"
            display="flex"
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{ marginBottom: "45px", color: "#456a70" }}
          >
            RESET YOUR PASSWORD?
          </Typography>
          <Typography
            variant="body1"
            sx={{ marginBottom: "20px", color: "#728691;" }}
          >
            Please provide the email address that you used when you signed up
            for your Immidart account.
          </Typography>
          <Typography
            variant="body1"
            sx={{ marginBottom: "20px", color: "#728691;" }}
          >
            We will send you an email hat will allow you to reset your password.
          </Typography>
          <StyledText
            name="email"
            helperText={data?.error?.email}
            onChange={(e) => handeleChange("email", e.target.value)}
            error={data?.error?.email ? true : false}
            placeholder="Enter Email Id"
            type={"email"}
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
          <Box
            sx={{ marginTop: "15px" }}
            display="flex"
            direction="row"
            justifyContent="space-between"
          >
            <Link href="/" color="primary" underline="always">
              Back to Sign In
            </Link>
            <Button variant="contained" onClick={(e) => handeleSumit(e)}>
              SEND CODE
            </Button>
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
};

export default SignIn;
