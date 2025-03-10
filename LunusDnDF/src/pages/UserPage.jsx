import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Avatar,
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import LogoutIcon from "@mui/icons-material/Logout";
import wallUser from "../assets/dnd/wallUser.jpg";
import CharacterFormModal from "../modal/CharacterFormModal/CharacterFormModal";

const UserPage = () => {
  const navigate = useNavigate();

  const [sections, setSections] = useState({
    Campanhas: ["Mesa 1", "Mesa 2"],
    Personagens: ["Personagem 1", "Personagem 2"],
    "Talentos Favoritos": ["Talento 1", "Talento 2"],
    "Magias Favoritas": ["Magia 1", "Magia 2"],
    "Items Mágicos": ["Item 1", "Item 2"],
  });

  const [isCharacterModalOpen, setCharacterModalOpen] = useState(false);

  const handleAdd = (section) => {
    const newItem = prompt(`Adicione um novo item para ${section}`);
    if (newItem) {
      setSections((prev) => ({
        ...prev,
        [section]: [...prev[section], newItem],
      }));
    }
  };

  const handleDelete = (section, index) => {
    setSections((prev) => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index),
    }));
  };

  const handleLogout = () => {
    console.log("Logout realizado");
    navigate("/Login");
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      p={3}
      sx={{
        minHeight: "100vh",
        backgroundImage: `url(${wallUser})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
      }}
    >
      <IconButton
        onClick={handleLogout}
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
          color: "red",
          padding: 1,
          "&:hover": {
            backgroundColor: "transparent",
          },
        }}
      >
        <LogoutIcon />
      </IconButton>

      <Box
        sx={{
          width: 160,
          height: 160,
          borderRadius: "50%",
          backgroundImage: `url('/Moldura.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          mb: 2,
        }}
      >
        <Avatar
          alt="User Avatar"
          src="/Crow.png"
          sx={{
            width: 140,
            height: 140,
            position: "absolute",
            top: 6,
            left: 6,
          }}
        />
        <Avatar
          alt="User Moldura"
          src="/Moldura.png"
          sx={{
            width: 160,
            height: 160,
            position: "absolute",
          }}
        />
      </Box>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          color: "#FFF",
          textShadow:
            "0px 0px 20px #1E3A8A, 0px 0px 20px #1E3A8A, 0px 0px 20px #1E3A8A",
        }}
      >
        Darth Lunus
      </Typography>
      {Object.entries(sections).map(([key, items]) => (
        <Accordion
          key={key}
          sx={{
            width: "100%",
            maxWidth: 600,
            mb: 2,
            borderRadius: "4px",
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              backgroundColor: "rgba(0, 0, 0, 1)",
              color: "#FFF",
              justifyContent: "center",
            }}
          >
            <Typography variant="h6">
              {key.replace(/^\w/, (c) => c.toUpperCase())}
            </Typography>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              backgroundColor: "rgba(0, 0, 0, 0.9)",
              color: "#FFF",
              position: "relative",
            }}
          >
            <Button
              onClick={() =>
                key === "Personagens"
                  ? setCharacterModalOpen(true)
                  : handleAdd(key)
              }
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
                transform: "translate(-10%, 50%)",
                backgroundColor: "#1E3A8A",
                color: "#FFF",
                borderRadius: 25,
                paddingX: 2,
                fontSize: "0.8rem",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#374151",
                },
              }}
            >
              Adicionar
            </Button>
            <List sx={{ mt: 4 }}>
              {items.map((item, index) => (
                <ListItem
                  key={index}
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleDelete(key, index)}
                      sx={{ color: "#FFF" }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      ))}

      {isCharacterModalOpen && (
        <CharacterFormModal
          onClose={() => setCharacterModalOpen(false)}
          onSubmit={(newCharacter) => {
            setSections((prev) => ({
              ...prev,
              Personagens: [...prev.Personagens, newCharacter],
            }));
            setCharacterModalOpen(false);
          }}
        />
      )}
    </Box>
  );
};

export default UserPage;
