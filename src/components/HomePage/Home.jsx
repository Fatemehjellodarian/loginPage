import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import axios from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Autocomplete } from "@mui/material";
import { useState, useEffect } from "react";

const defaultTheme = createTheme({
  direction: "rtl",
});

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MTIxNTE4MTEsImlzcyI6InJlemF5YXJpLmlyIiwiYXVkIjoicmV6YXlhcmkuaXIifQ.KhZVsuVKkaRonofovsT5hEW_wHZN-PeiyG06CrgUNL8";
const config = {
  headers: { Authorization: `Bearer ${token}` },
};

function Home() {
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  useEffect(() => {
    axios
      .get("http://rezayari.ir:5050/CityAndProvince/GetProvince", config)
      .then((response) => {
        setProvinces(response.data);
      })
      .catch((error) => {
        console.error("Error fetching provinces:", error);
      });

    axios
      .get("http://rezayari.ir:5050/CityAndProvince/GetCity", config)
      .then((response) => {
        setCities(response.data);
      })
      .catch((error) => {
        console.error("Error fetching cities:", error);
      });
  }, []);

  const filteredCities = cities.filter(
    (city) => selectedProvince && city.provinceId === selectedProvince.id
  );

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "right",
          }}
        >
          <Typography component="h1" variant="h5">
            شهر مورد نظر را انتخاب کنید
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{
              mt: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: "50px",
            }}
          >
            <Autocomplete
              disablePortal
              id="province-combo-box"
              options={provinces}
              value={selectedProvince}
              onChange={(event, newValue) => setSelectedProvince(newValue)}
              getOptionLabel={(option) => option.name}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="استان" />}
            />
            <Autocomplete
              disablePortal
              id="city-combo-box"
              options={filteredCities}
              value={selectedCity}
              onChange={(event, newValue) => setSelectedCity(newValue)}
              getOptionLabel={(option) => option.name}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="شهر" />}
            />
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Home;
