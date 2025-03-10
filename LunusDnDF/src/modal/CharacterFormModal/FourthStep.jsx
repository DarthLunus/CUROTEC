import { useState } from "react";
import { Button, Box, Typography, Select, MenuItem, InputLabel, FormControl, Grid } from "@mui/material";

const racialTalents = [
  "Talento Racial 1",
  "Talento Racial 2",
  "Talento Racial 3",
];

const talents = [
  "Talento 1",
  "Talento 2",
  "Talento 3",
];

const choices = [
  "Escolha 1",
  "Escolha 2",
  "Escolha 3",
];

const FourthStep = ({ onNext, onPrevious, formData }) => {
  const [talentsState, setTalentsState] = useState({
    racial: formData.talents.racial || "",
    choiceRacial: formData.talents.choiceRacial || "",
    talent: formData.talents.talent || "",
    choiceTalent: formData.talents.choiceTalent || "",
    additionalTalent: formData.talents.additionalTalent || "",
    choiceAdditionalTalent: formData.talents.choiceAdditionalTalent || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTalentsState({ ...talentsState, [name]: value });
  };

  return (
    <div>
      <h2
        style={{
          color: "yellow",
          textShadow: "2px 2px 4px darkred",
        }}
      >
        Criação de Personagem: Quarto Passo
      </h2>
      <Typography variant="body1" gutterBottom
        sx={{
          color: "yellow",
          textShadow: "2px 2px 4px red",
        }}
      >
        Selecione os Talentos:
      </Typography>

      <Typography variant="subtitle1" sx={{
        marginTop: 2, color: "yellow",
        textShadow: "2px 2px 4px red"
      }}
      >
        Talento Racial
      </Typography>
      <Grid container spacing={2} sx={{ marginBottom: 2 }}>
        <Grid item xs={8}>
          <FormControl fullWidth>
            <InputLabel>Talento Racial</InputLabel>
            <Select
              label="Talento Racial"
              name="racial"
              value={talentsState.racial}
              onChange={handleChange}
              sx={{
                backgroundColor: "rgba(211, 211, 211, 0.5)",
                borderRadius: "4px",
              }}
            >
              {racialTalents.map((talent) => (
                <MenuItem key={talent} value={talent}>
                  {talent}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel>Escolha</InputLabel>
            <Select
              label="Escolha"
              name="choiceRacial"
              value={talentsState.choiceRacial}
              onChange={handleChange}
              sx={{
                backgroundColor: "rgba(211, 211, 211, 0.5)",
                borderRadius: "4px",
              }}
            >
              {choices.map((choice) => (
                <MenuItem key={choice} value={choice}>
                  {choice}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Typography variant="subtitle1" sx={{
        marginTop: 2, color: "yellow",
        textShadow: "2px 2px 4px red"
      }}>
        Talentos
      </Typography>
      <Grid container spacing={2} sx={{ marginBottom: 2 }}>
        <Grid item xs={8}>
          <FormControl fullWidth>
            <InputLabel>Talento 1º Nível</InputLabel>
            <Select
              label="Talento 1º Nível"
              name="talent"
              value={talentsState.talent}
              onChange={handleChange}
              sx={{
                backgroundColor: "rgba(211, 211, 211, 0.5)",
                borderRadius: "4px",
              }}
            >
              {talents.map((talent) => (
                <MenuItem key={talent} value={talent}>
                  {talent}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel>Escolha</InputLabel>
            <Select
              label="Escolha"
              name="choiceTalent"
              value={talentsState.choiceTalent}
              onChange={handleChange}
              sx={{
                backgroundColor: "rgba(211, 211, 211, 0.5)",
                borderRadius: "4px",
              }}
            >
              {choices.map((choice) => (
                <MenuItem key={choice} value={choice}>
                  {choice}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Typography variant="subtitle1" sx={{
        marginTop: 2, color: "yellow",
        textShadow: "2px 2px 4px red"
      }}>
        Talentos Adicionais
      </Typography>
      <Grid container spacing={2} sx={{ marginBottom: 2 }}>
        <Grid item xs={8}>
          <FormControl fullWidth>
            <InputLabel>Talento Adicional</InputLabel>
            <Select
              label="Talento Adicional"
              name="additionalTalent"
              value={talentsState.additionalTalent}
              onChange={handleChange}
              sx={{
                backgroundColor: "rgba(211, 211, 211, 0.5)",
                borderRadius: "4px",
              }}
            >
              {talents.map((talent) => (
                <MenuItem key={talent} value={talent}>
                  {talent}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel>Escolha</InputLabel>
            <Select
              label="Escolha"
              name="choiceAdditionalTalent"
              value={talentsState.choiceAdditionalTalent}
              onChange={handleChange}
              sx={{
                backgroundColor: "rgba(211, 211, 211, 0.5)",
                borderRadius: "4px",
              }}
            >
              {choices.map((choice) => (
                <MenuItem key={choice} value={choice}>
                  {choice}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button variant="outlined" color="error" onClick={onPrevious}
          sx={{
            width: "48%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            color: "error.main",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.7)",
            },
          }}
        >
          Voltar
        </Button>
        <Button variant="outlined" color="primary" onClick={() => onNext({ talentsState })}
          sx={{
            width: "48%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            color: "primary.main",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.7)",
            },
          }}
        >
          Próximo
        </Button>
      </Box>
    </div>
  );
};

export default FourthStep;
