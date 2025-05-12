import logo from './logo.svg';
import { Box, Card, CardContent, TextField, Button, Typography } from "@mui/material";

import './App.css';

function Main() {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Card sx={{ minWidth: 300, p: 2, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
            로그인
          </Typography>
          <Box component="form" noValidate autoComplete="off" sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField label="이메일" type="email" fullWidth required />
            <TextField label="비밀번호" type="password" fullWidth required />
            <Button variant="contained" color="primary" fullWidth>
              로그인
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Main;
