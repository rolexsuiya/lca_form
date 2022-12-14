import {
  AppBar,
  Box,
  Button,
  Grid,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Autocomplete from "@mui/material/Autocomplete";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Paper from "@mui/material/Paper";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import dayjs from "dayjs";
import nextId from "react-id-generator";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const StyledText = styled(TextField)({
  "& .MuiInputBase-root": {
    padding: "0 ",
    width: "100%",
  },
});

const StyledDate = styled(LocalizationProvider)({
  "& .MuiFormControl-root.MuiTextField-root": {
    padding: "0 ",
    width: "100%",
  },
});

const StyleTypo = styled(Typography)({
  marginBottom: "10px",
  fontSize: "1rem",
});

const StyleTab = styled(Tab)({
  padding: "20px",
  fontSize: "1rem",
  fontWeight: "bold",
  textTransform: "none",
});

const LcaEdit = () => {
  const [value, setValue] = React.useState(0);
  let idStud = nextId();
  let navigate = useNavigate();
  let editData = useLocation();

  const [data, setData] = useState({
    clasfition: "",
    role: "",
    location: "",
    empNum: "",
    EName: "",
    empCode: "",
    empMail: "",
    country: "",
    visa: "",
    assignment: "",
    permit: "",
    startDate: "",
    endDate: "",
    visaNum: "",

    error: {
      clasfition: "",
      role: "",
      location: "",
      empNum: "",
      EName: "",
      empCode: "",
      empMail: "",
      country: "",
      visa: "",
      assignment: "",
      permit: "",
      startDate: "",
      endDate: "",
      visaNum: "",
    },
  });

  const handeleChange = (key, value) => {
    const error = data?.error;
    error[key] = "";
    setData({ ...data, [key]: value, error });
  };

  const handeleDateChange = (key, value) => {
    if (key === "startDate") {
      setData({ ...data, endDate: "" });
    }
    const error = data?.error;
    error[key] = "";
    setData({ ...data, [key]: value, error });
  };

  const validateForm = () => {
    var isValid = true;
    const error = { ...data?.error };
    if (data?.clasfition?.length === 0 || data?.clasfition === null) {
      isValid = false;
      error["clasfition"] = true;
    }
    if (data?.role?.length === 0 || data?.role === null) {
      isValid = false;
      error["role"] = true;
    }
    if (data?.location?.length === 0 || data?.location === null) {
      isValid = false;
      error["location"] = true;
    }
    if (data?.empNum?.length === 0) {
      isValid = false;
      error["empNum"] = true;
    }
    if (data?.EName?.length === 0) {
      isValid = false;
      error["EName"] = true;
    }
    if (data?.empCode?.length === 0) {
      isValid = false;
      error["empCode"] = true;
    }
    if (data?.empMail?.length === 0) {
      isValid = false;
      error["empMail"] = true;
    }
    if (data?.country?.length === 0 || data?.country === null) {
      isValid = false;
      error["country"] = true;
    }
    if (data?.visa?.length === 0 || data?.visa === null) {
      isValid = false;
      error["visa"] = true;
    }
    if (data?.assignment?.length === 0) {
      isValid = false;
      error["assignment"] = true;
    }
    if (data?.permit?.length === 0) {
      isValid = false;
      error["permit"] = true;
    }
    if (data?.startDate?.length === 0) {
      isValid = false;
      error["startDate"] = true;
    }
    if (data?.endDate?.length === 0) {
      isValid = false;
      error["endDate"] = true;
    }
    if (data?.visaNum?.length === 0 || data?.visaNum === null) {
      isValid = false;
      error["visaNum"] = true;
    }
    setData({
      ...data,
      error: error,
    });
    return isValid;
  };
  useEffect(() => {
    if (editData?.state?.row?.id?.length > 0) {
      setData(editData?.state?.row);
    }
  }, [editData?.state?.row?.id]);

  const handeleSumit = () => {
    console.log(data);
    if (validateForm()) {
      console.log(data);
      console.log("calling");
      if (data.id) {
        let editId = data?.id;

        //OLD LOCAL DATA
        let oldData = JSON.parse(localStorage.getItem("showList") || "[]");
        // FIND INDEX
        const index = oldData.findIndex((val) => val?.id === editId);
        if (index !== -1) {
          oldData[index] = data;
          localStorage.setItem("showList", JSON.stringify(oldData));

          navigate("/LcaList");
        }
      } else if (data) {
        data["id"] = idStud;
        //OLD LOCAL DATA
        let oldData = JSON.parse(localStorage.getItem("showList") || "[]");

        oldData.push(data);
        localStorage.setItem("showList", JSON.stringify(oldData));
        navigate("/LcaList");
      }
    }
  };

  const handleChange = (event = "React.SyntheticEvent", newValue = number) => {
    setValue(newValue);
  };

  return (
    <>
      <Stack>
        <AppBar position="static" color="secondary">
          <Box sx={{ width: "100%" }}>
            <Tabs
              onChange={handleChange}
              value={value}
              aria-label="Tabs where selection follows focus"
              selectionFollowsFocus
            >
              <StyleTab label="LCA Info" sx={{ marginLeft: "30px" }} />
              <StyleTab label="Location & Posting Info" />
            </Tabs>
          </Box>
        </AppBar>
      </Stack>
      <Box padding={4} sx={{ paddingBottom: "100px" }}>
        <Grid container spacing={4} sx={{ marginBottom: "23px" }}>
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <Box display="flex" direction="row" justifyContent="space-between">
              <StyleTypo color="secondary.contrastText">
                LCA CLASIFICATION
              </StyleTypo>
              <InfoOutlinedIcon color="info" />
            </Box>
            <Autocomplete
              size="small"
              id="combo-box-demo"
              options={clasFition}
              value={data?.clasfition}
              onChange={(e, value) => handeleChange("clasfition", value)}
              sx={{ width: "100%" }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={data?.error?.clasfition ? true : false}
                  placeholder="Select"
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <Box display="flex" direction="row" justifyContent="space-between">
              <StyleTypo color="secondary.contrastText">ROLE</StyleTypo>
              <InfoOutlinedIcon color="info" />
            </Box>
            <Autocomplete
              value={data?.role}
              size="small"
              id="combo-box-demo"
              options={empRole}
              onChange={(e, value) => handeleChange("role", value)}
              sx={{ width: "100%" }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Select"
                  error={data?.error?.role ? true : false}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <Box display="flex" direction="row" justifyContent="space-between">
              <StyleTypo color="secondary.contrastText">
                NUMBER OF WORK LOCATIONS
              </StyleTypo>
              <InfoOutlinedIcon color="info" />
            </Box>
            <Autocomplete
              value={data?.location}
              disablePortal
              size="small"
              id="combo-box-demo"
              options={empLocation}
              onChange={(e, value) => handeleChange("location", value)}
              sx={{ width: "100%" }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Select"
                  error={data?.error?.location ? true : false}
                />
              )}
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography sx={{ paddingBottom: "10px" }}>
            EMPLOYEE PERSONAL INFORMATION
          </Typography>
        </Grid>

        <Grid
          container
          sx={{
            borderBottom: "1.5px solid lightGray",
            marginBottom: "23px",
            sm: 12,
            sx: 12,
          }}
        ></Grid>
        <Grid container spacing={4} sx={{ marginBottom: "23px" }}>
          <Grid item xs={12} sm={6} md={3} lg={3}>
            <StyleTypo color="secondary.contrastText">
              EMPLOYEE NUMBER
            </StyleTypo>
            <StyledText
              value={data?.empNum}
              placeholder="Enter Employee Number"
              sx={{ width: "100%" }}
              onChange={(e) => handeleChange("empNum", e.target.value)}
              error={data?.error?.empNum ? true : false}
              type={"text"}
              size="small"
              InputProps={{
                name: "empNum",
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={3}>
            <StyleTypo color="secondary.contrastText">
              EMPLOYEE FULL NAME
            </StyleTypo>
            <StyledText
              size="small"
              type="text"
              value={data?.EName}
              fullwidth
              placeholder="Enter Emploee Full Name"
              onChange={(e) => handeleChange("EName", e.target.value)}
              error={data?.error?.EName ? true : false}
              fullWidth
              id="fullWidth"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={3}>
            <StyleTypo color="secondary.contrastText">EMPLOYEE CODE</StyleTypo>
            <StyledText
              value={data?.empCode}
              placeholder="Enter Empyole Code"
              onChange={(e) => handeleChange("empCode", e.target.value)}
              error={data?.error?.empCode ? true : false}
              sx={{ width: "100%" }}
              type={"text"}
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={3}>
            <StyleTypo color="secondary.contrastText">
              OFFICAL EMAIL ID
            </StyleTypo>
            <StyledText
              value={data?.empMail}
              placeholder="Enter Offical email ID"
              onChange={(e) => handeleChange("empMail", e.target.value)}
              error={data?.error?.empMail ? true : false}
              sx={{ width: "100%", color: "728691" }}
              type={"text"}
              size="small"
            />
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Typography sx={{ paddingBottom: "10px" }}>
            ASSIGNMENT INFORMATION
          </Typography>
        </Grid>

        <Grid
          container
          sx={{
            borderBottom: "1.5px solid lightGray",
            marginBottom: "23px",
            sm: 12,
            sx: 12,
          }}
        ></Grid>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3} lg={3}>
            <StyleTypo color="secondary.contrastText">
              DESTINATION COUNTRY
            </StyleTypo>
            <Autocomplete
              disablePortal
              size="small"
              id="combo-box-demo"
              value={data?.country}
              options={empCountry}
              onChange={(e, value) => handeleChange("country", value)}
              sx={{ width: "100%" }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Select"
                  error={data?.error?.country ? true : false}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={3}>
            <StyleTypo color="secondary.contrastText">VISA TYPE</StyleTypo>
            <Autocomplete
              disablePortal
              size="small"
              id="combo-box-demo"
              value={data?.visa}
              options={empVisa}
              onChange={(e, value) => handeleChange("visa", value)}
              sx={{ width: "100%" }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Select"
                  error={data?.error?.visa ? true : false}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={3}>
            <StyleTypo color="secondary.contrastText">
              ASSIGNMENT REQUEST
            </StyleTypo>
            <StyledText
              placeholder="Enter Assignment Request No"
              sx={{ width: "100%" }}
              value={data?.assignment}
              onChange={(e) => handeleChange("assignment", e.target.value)}
              error={data?.error?.assignment ? true : false}
              type={"text"}
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={3}>
            <StyleTypo color="secondary.contrastText">
              WORK PERMIT REQUEST
            </StyleTypo>
            <StyledText
              placeholder="Enter Work Permit Request No"
              sx={{ width: "100%" }}
              onChange={(e) => handeleChange("permit", e.target.value)}
              error={data?.error?.permit ? true : false}
              value={data?.permit}
              type={"text"}
              size="small"
            />
          </Grid>
        </Grid>
        <Grid container spacing={4} sx={{ marginTop: "2px" }}>
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <StyleTypo color="secondary.contrastText">
              WORK PERMIT START DATE
            </StyleTypo>

            <StyledDate dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                value={data?.startDate}
                onChange={(newValue) =>
                  handeleDateChange("startDate", newValue)
                }
                renderInput={(params) => (
                  <TextField
                    sx={{ width: "100%" }}
                    size="small"
                    {...params}
                    error={data?.error?.startDate ? true : false}
                  />
                )}
              />
            </StyledDate>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <StyleTypo color="secondary.contrastText">
              WORK PERMIT END DATE
            </StyleTypo>

            <LocalizationProvider dateAdapter={AdapterDayjs} size="small">
              <DesktopDatePicker
                value={data?.endDate}
                minDate={data?.startDate}
                onChange={(newValue) => handeleDateChange("endDate", newValue)}
                renderInput={(params) => (
                  <TextField
                    sx={{ width: "100%" }}
                    size="small"
                    {...params}
                    error={data?.error?.endDate ? true : false}
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <StyleTypo color="secondary.contrastText">
              VISA REQUEST NUMBER
            </StyleTypo>
            <Autocomplete
              disablePortal
              size="small"
              id="combo-box-demo"
              options={visaNumber}
              onChange={(e, value) => handeleChange("visaNum", value)}
              sx={{ width: "100%" }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Select"
                  error={data?.error?.visaNum ? true : false}
                />
              )}
              value={data?.visaNum}
            />
          </Grid>
        </Grid>
      </Box>
      <Grid
        container
        sx={12}
        direction="row"
        style={{
          backgroundColor: "#bcc8ce",
          position: "fixed",
          bottom: 0,
          padding: "20px 35px 20px 20px",
        }}
        justifyContent="flex-end"
        columnGap={3}
      >
        <Grid item sx={2}>
          <Button
            href="/LcaList"
            variant="outlined"
            sx={{
              backgroundColor: "primary.contrastText",
              padding: "10px 20px 10px 20px",
            }}
          >
            Cancel
          </Button>
        </Grid>
        <Grid item sx={2}>
          <Button
            onClick={() => handeleSumit()}
            variant="contained"
            type="submit"
            sx={{
              padding: "10px 20px 10px 20px",
            }}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

const clasFition = [
  { label: "LCA-DEC-20_1121223", value: "CA-DEC-20_1121223" },
  { label: "LCA-DEC-20_111122", value: "CA-DEC-20_1121223" },
  { label: "LCA-DEC-20_11212", value: "CA-DEC-20_1121223" },
  { label: "LCA-DEC-20_113", value: "CA-DEC-20_1121223" },
  { label: "LCA-DEC-20_1145468", value: "CA-DEC-20_1121223" },
];

const empRole = [
  { label: "Assosiate", value: "Assosiate" },
  { label: "Senior Associate", value: "Senior Associate" },
  { label: "Team Lead", value: "Team Lead" },
  { label: "Human Resource", value: "Human Resource" },
  { label: "Manager", value: "Manager" },
];

const empLocation = [
  { label: "Chennai", value: "Chennai" },
  { label: "Cuddalore", value: "Cuddalore" },
  { label: "Bangalore", value: "Bangalore" },
  { label: "Thanjavur", value: "Thanjavur" },
  { label: "Madurai", value: "Madurai" },
];
const empCountry = [
  { label: "Tokiyo", value: "Tokiyo" },
  { label: "London", value: "London" },
  { label: "USA", value: "USA" },
  { label: "Italy", value: "Italy" },
  { label: "China", value: "China" },
];
const empVisa = [
  { label: "Business", value: "Business" },
  { label: "MedicaL", value: "China" },
  { label: "Confrenece", value: "Confrenece" },
  { label: "Tourist", value: "Tourist" },
];
const visaNumber = [
  { label: "AFH1334", value: "AFH1334" },
  { label: "UYI673", value: "UYI673" },
  { label: "UIAS6812", value: "UIAS6812" },
  { label: "JHSF8622", value: "JHSF8622" },
];

export default LcaEdit;
