import { useState } from "react";
import { TextField, Button, Box, Typography, useTheme } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { login } from "../Redux/Reducer/userSlice";
import CreateUserModal from "../modal/CreateUserModal";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [error, setError] = useState({ username: false, password: false });
  const [apiError, setApiError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleLogin = async () => {
    const usernameError = !username.trim();
    const passwordError = !password.trim();

    if (usernameError || passwordError) {
      setError({ username: usernameError, password: passwordError });
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/users/login/", {
        username: username.trim(),
        password: password.trim(),
      });

      const {
        user_id,
        username: userName,
        avatar,
        access_token,
      } = response.data;

      dispatch(
        login({ user_id, username: userName, avatar, token: access_token })
      );

      localStorage.setItem("access_token", access_token);

      navigate("/user");
    } catch (error) {
      if (error.response && error.response.data.error) {
        setApiError(error.response.data.error);
      } else {
        setApiError(
          "Este acesso não está disponível ao seu nível de segurança."
        );
      }
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      px={3}
      maxWidth="400px"
      mx="auto"
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          color: "#4B0000",
          fontWeight: "bold",
          textShadow: "0px 0px 3px #FFD700, 0px 0px 5px #FFD700",
        }}
      >
        RPG Clã Paranóia
      </Typography>

      {error.username && (
        <Typography
          variant="body2"
          color="error"
          marginBottom={1}
          sx={{
            textShadow: "0px 0px 3px #FFD700, 0px 0px 5px #FFD700",
            color: "#660000",
          }}
        >
          Insira seu código, cidadão!
        </Typography>
      )}
      <TextField
        label="Código Paranóia"
        variant="outlined"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        fullWidth
        margin="normal"
        aria-label="username"
        error={error.username}
        sx={{
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          borderRadius: "5px",
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: error.username ? "#f44336" : "#fff",
            },
            "&:hover fieldset": {
              borderColor: "#FFD700",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#FFD700",
            },
          },
        }}
        InputProps={{
          style: {
            color: "#fff",
          },
        }}
        InputLabelProps={{
          style: { color: "#fff" },
        }}
      />
      {error.password && (
        <Typography
          variant="body2"
          color="error"
          marginBottom={1}
          sx={{
            textShadow: "0px 0px 3px #FFD700, 0px 0px 5px #FFD700",
            color: "#660000",
          }}
        >
          Está informação não está disponível para seu nível de segurança!
        </Typography>
      )}
      <TextField
        label="Nível de Segurança"
        type="password"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
        aria-label="password"
        error={error.password}
        sx={{
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          borderRadius: "5px",
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: error.password ? "#f44336" : "#fff",
            },
            "&:hover fieldset": {
              borderColor: "#FFD700",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#FFD700",
            },
          },
        }}
        InputProps={{
          style: {
            color: "#fff",
          },
        }}
        InputLabelProps={{
          style: { color: "#fff" },
        }}
      />
      {apiError && (
        <Typography variant="body2" color="error" marginTop={2}>
          {apiError}
        </Typography>
      )}
      <Button
        variant="contained"
        onClick={handleLogin}
        fullWidth
        sx={{
          textTransform: "uppercase",
          marginTop: theme.spacing(2),
          backgroundColor: "#4B0000",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#600000",
          },
        }}
      >
        O Computador é seu Amigo
      </Button>

      <Button
        variant="contained"
        onClick={handleOpenModal}
        fullWidth
        sx={{
          textTransform: "uppercase",
          marginTop: theme.spacing(2),
          backgroundColor: "#FF6F00",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#FF8F00",
          },
        }}
      >
        Novo Agente Atirador
      </Button>
      <CreateUserModal open={openModal} onClose={handleCloseModal} />
    </Box>
  );
};

export default Login;
