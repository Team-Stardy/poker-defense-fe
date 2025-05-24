import { Box, TextField, Button, Typography } from "@mui/material";
import styled from 'styled-components';
import paper from './assets/paper.png';
import background from './assets/backGround.png';
import { useNavigate } from 'react-router-dom'; 

const FullPage = styled.div`
  overflow: hidden;
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  background-image: url(${background});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PaperWrapper = styled.div`
  position: relative;
  width: 50%;
  height: 70%;
  background-image: url(${paper});
  background-size: 100% 100%;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Main() {
  const navigate = useNavigate();

  return (
    <FullPage>
      <PaperWrapper>
        <Box
          sx={{
            p: 0,
            borderRadius: 2,
            zIndex: 1,
            backgroundColor: 'transparent',
          }}
        >
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{
              color: "#3e2c1c",
              textShadow: "1px 1px 0 #fff2d0",
            }}
          >
            포커디펜스
          </Typography>

          <Box
            component="form"
            noValidate
            autoComplete="off"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <TextField
              label="별명"
              type="text"
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
                게임시작
              </Button>
            </Box>
          </Box>
        </Box>
      </PaperWrapper>
    </FullPage>
  );
}

export default Main;
