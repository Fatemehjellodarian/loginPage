import React, { useState } from "react";
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

const defaultTheme = createTheme({
  direction: "rtl",
});

function SignIn() {
  const [formData, setFormData] = useState({
    userName: "fatemeh",
    password: "@123",
    loading: false,
    error: null,
    success: false,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormData({ ...formData, loading: true });

    try {
      const response = await axios.post("http://rezayari.ir:5050/Auth/Login", {
        username: formData.userName,
        password: formData.password,
      });

      console.log(response.data);
      console.log(response.status);

      navigate("/Home");
    } catch (error) {
      setFormData({ ...formData, error: error.response.data.message });
    }

    setFormData({ ...formData, loading: false });
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
              value={formData.userName}
              onChange={handleChange}
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
              value={formData.password}
              onChange={handleChange}
              sx={{ textAlign: "right" }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={formData.loading}
            >
              {formData.loading ? ".رمز عبور اشتباه است.." : "ورود"}
            </Button>
            {formData.error && (
              <Typography color="error">{formData.error}</Typography>
            )}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
export default SignIn;
