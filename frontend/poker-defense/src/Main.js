import { Box, TextField, Button, Typography } from "@mui/material";
import paper from './assets/paper.png';
import { useNavigate } from 'react-router-dom'; 

function Main() {

  const navigate = useNavigate();

  return (
    <Box sx={{ height: "100vh",  display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: 'rgba(255, 255, 255, 0)',}}>
      <Box sx={{ position: 'absolute', backgroundImage: `url(${paper})`, backgroundSize: '100% 100%', backgroundPosition: 'center',
        width: '50%', height: '70%',}}/>
      <Box sx={{ minWidth: 360, maxWidth: 420, p: 0, borderRadius: 2, position: 'relative', zIndex: 1, backgroundColor: 'rgba(255, 255, 255, 0)', }}> 
        <Typography variant="h4" align="center" gutterBottom sx={{ color: "#3e2c1c", textShadow: "1px 1px 0 #fff2d0",}}>
          포커디펜스
        </Typography>

        <Box component="form" noValidate  autoComplete="off"  sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="별명"
            type="email"
            fullWidth
            required
            variant="standard"
            InputProps={{
              disableUnderline: true,
              style: {
                backgroundColor: 'transparent',
                color: '#5a3e2b',
                fontFamily: "'Times New Roman', serif",
                fontSize: '1.1rem',
                padding: '8px 12px',
              },
            }}
            InputLabelProps={{
              style: {
                color: '#7b5a3a',
                fontFamily: "'Times New Roman', serif",
                fontWeight: 'bold',
              },
            }}
            sx={{
              border: '1px solid rgba(90, 62, 43, 0.4)',
              borderRadius: 1,
            }}
          />

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: 2,
              mt: 2,
            }}
          >
            <Button variant="contained"fullWidth
              sx={{
                py: 1.2,
                fontWeight: 'bold',
                backgroundColor: "#8b5a2b",
                '&:hover': {
                  backgroundColor: "#6f451e",
                },
              }}
            >
              로그인
            </Button>
            <Button
              variant="contained"
              fullWidth
              onClick={() => navigate('/room')}
              sx={{
                py: 1.2,
                fontWeight: 'bold',
                backgroundColor: "#8b5a2b",
                '&:hover': {
                  backgroundColor: "#6f451e",
                },
              }}
            >
              회원가입
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Main;
