import { useState } from "react";
import { Button, Box, Grid, TextField, Typography, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const FifthStep = ({ onNext, onPrevious, formData }) => {
  const [personalInfo, setPersonalInfo] = useState(formData.personalInfo);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setPersonalInfo({
      ...personalInfo,
      [name]: name === "image" ? files[0] : value,
    });
  };

  return (
    <div>
      <h2
        style={{
          color: "yellow",
          textShadow: "2px 2px 4px darkred",
        }}
      >
        Criação de Personagem: Quinto Passo
      </h2>
      <Typography variant="body1" gutterBottom
        sx={{
          marginTop: 2, color: "yellow",
          textShadow: "2px 2px 4px red"
        }}
      >
        Preencha as informações pessoais do Personagem:
      </Typography>

      <Grid container spacing={2} sx={{ marginBottom: 2 }}>
        <Grid item xs={12}>
          <TextField
            label="Nome do Personagem"
            name="name"
            value={personalInfo.name}
            onChange={handleChange}
            sx={{
              backgroundColor: "rgba(211, 211, 211, 0.5)",
              borderRadius: "4px",
            }}
            fullWidth
          />
        </Grid>

        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel>Sexo</InputLabel>
            <Select
              label="Sexo"
              name="gender"
              value={personalInfo.gender}
              onChange={handleChange}
              sx={{
                backgroundColor: "rgba(211, 211, 211, 0.5)",
                borderRadius: "4px",
              }}
            >
              <MenuItem value="">Selecione...</MenuItem>
              <MenuItem value="Masculino">Masculino</MenuItem>
              <MenuItem value="Feminino">Feminino</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="Idade"
            name="age"
            type="number"
            value={personalInfo.age}
            onChange={handleChange}
            sx={{
              backgroundColor: "rgba(211, 211, 211, 0.5)",
              borderRadius: "4px",
            }}
            fullWidth
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="Altura"
            name="height"
            value={personalInfo.height}
            onChange={handleChange}
            sx={{
              backgroundColor: "rgba(211, 211, 211, 0.5)",
              borderRadius: "4px",
            }}
            fullWidth
          />
        </Grid>

        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel>Alinhamento</InputLabel>
            <Select
              label="Alinhamento"
              name="alignment"
              value={personalInfo.alignment}
              onChange={handleChange}
              sx={{
                backgroundColor: "rgba(211, 211, 211, 0.5)",
                borderRadius: "4px",
              }}
            >
              <MenuItem value="">Selecione...</MenuItem>
              <MenuItem value="Leal e Bom">Leal e Bom</MenuItem>
              <MenuItem value="Leal e Neutro">Leal e Neutro</MenuItem>
              <MenuItem value="Leal e Mau">Leal e Mau</MenuItem>
              <MenuItem value="Neutro e Bom">Neutro e Bom</MenuItem>
              <MenuItem value="Neutro ">Neutro</MenuItem>
              <MenuItem value="Neutro e Mau">Neutro e Mau</MenuItem>
              <MenuItem value="Caótico e Bom">Caótico e Bom</MenuItem>
              <MenuItem value="Caótico e Neutro">Caótico e Neutro</MenuItem>
              <MenuItem value="Caótico e Mau">Caótico e Mau</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Descrição"
            name="description"
            value={personalInfo.description}
            onChange={handleChange}
            sx={{
              backgroundColor: "rgba(211, 211, 211, 0.5)",
              borderRadius: "4px",
            }}
            fullWidth
            multiline
            rows={4}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Prelúdio"
            name="prelude"
            value={personalInfo.prelude}
            onChange={handleChange}
            sx={{
              backgroundColor: "rgba(211, 211, 211, 0.5)",
              borderRadius: "4px",
            }}
            fullWidth
            multiline
            rows={4}
          />
        </Grid>

        <Grid item xs={12}>
          <Button variant="outlined" component="label" fullWidth
            sx={{
              color: "white",
              borderColor: "white",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.7)",
              },
            }}
          >
            Desenho do Personagem
            <input type="file" name="image" onChange={handleChange} hidden />
          </Button>
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
        <Button variant="outlined" color="primary" onClick={() => onNext({ personalInfo })}
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

export default FifthStep;
