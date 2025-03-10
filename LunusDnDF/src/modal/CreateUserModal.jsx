import PropTypes from "prop-types";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  IconButton,
  Box,
  Avatar,
  Snackbar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import {
  setUsername,
  setNickname,
  setPassword,
  setAvatar,
  setSnackbarOpen,
  clearForm,
  createUser,
} from "../Redux/Reducer/createUsersSlice";

const CreateUserModal = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const { username, nickname, password, avatar, snackbarOpen, status, error } =
    useSelector((state) => state.createUsersSlice);

    console.log('Dados passados para createUser:', { username, nickname, password, avatar });

  const handleClose = () => {
    dispatch(clearForm());
    onClose();
  };

  const handleSave = () => {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("nickname", nickname);
    formData.append("password", password);
  
    if (avatar && avatar instanceof File) {
      formData.append("avatar", avatar);
    }
  
    console.log("Conteúdo de formData:");
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
  
    dispatch(createUser(formData))
      .unwrap()
      .then(() => {
        dispatch(clearForm());
        dispatch(setSnackbarOpen(true));
        onClose();
      })
      .catch((err) => {
        console.error("Erro ao criar usuário:", err);
      });
  };
  

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      dispatch(setAvatar(file));
    }
  };

  const handleSnackbarClose = () => {
    dispatch(setSnackbarOpen(false));
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle
          sx={{ backgroundColor: "#000000", color: theme.palette.grey[500] }}
        >
          Promovendo um Novo Agente Atirador
          <IconButton
            color="inherit"
            onClick={handleClose}
            aria-label="close"
            sx={{
              position: "absolute",
              right: theme.spacing(1),
              top: theme.spacing(1),
              color: theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 2,
            paddingBottom: 3,
            overflow: "hidden",
            backgroundColor: "#000000",
            backgroundImage: 'url("/create.webp")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "120px",
              flexShrink: 0,
              height: "100%",
            }}
          >
            <Box
              sx={{
                width: 105,
                height: 105,
                borderRadius: "50%",
                border: "3px solid gray",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
              }}
            >
              <Avatar
                alt="User Avatar"
                src={
                  avatar && avatar instanceof File
                    ? URL.createObjectURL(avatar)
                    : "/Paranoia.png"
                }
                sx={{
                  width: 100,
                  height: 100,
                }}
              />
            </Box>
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              id="avatar-upload"
              onChange={handleImageUpload}
            />
            <label htmlFor="avatar-upload">
              <Button
                component="span"
                variant="contained"
                sx={{
                  marginTop: 2,
                  backgroundColor: "#000000",
                  color: "white",
                  border: "1px solid gray",
                  "&:hover": {
                    backgroundColor: "#333",
                    borderColor: "#666",
                  },
                }}
              >
                Upload
              </Button>
            </label>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              flexShrink: 1,
            }}
          >
            <TextField
              label="Código Paranóia"
              variant="outlined"
              fullWidth
              value={username}
              onChange={(e) => dispatch(setUsername(e.target.value))}
              margin="normal"
              InputProps={{
                style: {
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  color: "white",
                },
              }}
              InputLabelProps={{
                style: {
                  color: "white",
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#FF0000",
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#FF0000",
                },
              }}
            />
            <TextField
              label="Nome do Jogador"
              variant="outlined"
              fullWidth
              value={nickname}
              onChange={(e) => dispatch(setNickname(e.target.value))}
              margin="normal"
              InputProps={{
                style: {
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  color: "white",
                },
              }}
              InputLabelProps={{
                style: {
                  color: "white",
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#FF0000",
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#FF0000",
                },
              }}
            />
            <TextField
              label="Nível de Segurança"
              type="password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => dispatch(setPassword(e.target.value))}
              margin="normal"
              InputProps={{
                style: {
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  color: "white",
                },
              }}
              InputLabelProps={{
                style: {
                  color: "white",
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#FF0000",
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#FF0000",
                },
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions
          sx={{
            paddingX: 3,
            paddingBottom: 2,
            backgroundColor: "#000000",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              width: "100%",
              gap: 2,
            }}
          >
            <Button
              onClick={handleClose}
              sx={{
                backgroundColor: "#800020",
                color: "white",
                minWidth: 120,
                "&:hover": {
                  backgroundColor: "#990033",
                },
              }}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSave}
              sx={{
                backgroundColor: "#006400",
                color: "white",
                minWidth: 120,
                "&:hover": {
                  backgroundColor: "#008000",
                },
              }}
            >
              Salvar
            </Button>
          </Box>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={
          status === "succeeded"
            ? "Bem vindo, cidadão. O Computador é seu amigo, felicidade é obrigatória!"
            : error || "Erro ao criar usuário!"
        }
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </>
  );
};

CreateUserModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CreateUserModal;
