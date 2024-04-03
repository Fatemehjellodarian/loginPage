import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import axios from "axios";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const defaultTheme = createTheme({
  direction: "rtl",
});

function SignIn() {
  const [userName, setUserName] = useState("fatemeh");
  const [password, setPassword] = useState("@123");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();


    const body = {
      username: userName,
      password: password,
    };
    await axios
      .post("http://rezayari.ir:5050/Auth/Login", body)
      .then((response) => {
        console.log(response.data);
        console.log(response);
        console.log(response.status);
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
    if (userName === "fatemeh" && password === "fatemeh@123") {
      navigate("/Home");
    }
  };

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
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            صفحه ورود
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="نام کاربری"
              name="userName"
              autoComplete="userName"
              autoFocus
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              sx={{ textAlign: "right" }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="رمزعبور"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ textAlign: "right" }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              ورود
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
export default SignIn;
