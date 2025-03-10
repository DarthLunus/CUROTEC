import { useState } from "react";
import { Button, Box, Select, MenuItem, FormControl, InputLabel } from "@mui/material";

const FirstStep = ({ onNext, onClose, formData }) => {
  const [data, setData] = useState({
    region: formData.region || "",
    deity: formData.deity || "",
    race: formData.race || "",
    template: formData.template || "",
    class: formData.class || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  return (
    <div>
      <h2
        style={{
          color: "yellow",
          textShadow: "2px 2px 4px darkred",
        }}
      >
        Criação de Personagem: Primeiro Passo
      </h2>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <FormControl
          variant="outlined"
          fullWidth
          sx={{
            backgroundColor: "rgba(211, 211, 211, 0.5)",
            borderRadius: "4px",
          }}
        >
          <InputLabel>Região</InputLabel>
          <Select
            name="region"
            value={data.region}
            onChange={handleChange}
            label="Região"
          >
            <MenuItem value="">Selecione...</MenuItem>
            <MenuItem value="Região 1">Região 1</MenuItem>
            <MenuItem value="Região 2">Região 2</MenuItem>
          </Select>
        </FormControl>

        <FormControl
          variant="outlined"
          fullWidth
          sx={{
            backgroundColor: "rgba(211, 211, 211, 0.5)",
            borderRadius: "4px",
          }}
        >
          <InputLabel>Divindade</InputLabel>
          <Select
            name="deity"
            value={data.deity}
            onChange={handleChange}
            label="Divindade"
          >
            <MenuItem value="">Selecione...</MenuItem>
            <MenuItem value="Divindade 1">Divindade 1</MenuItem>
            <MenuItem value="Divindade 2">Divindade 2</MenuItem>
          </Select>
        </FormControl>

        <FormControl
          variant="outlined"
          fullWidth
          sx={{
            backgroundColor: "rgba(211, 211, 211, 0.5)",
            borderRadius: "4px",
          }}
        >
          <InputLabel>Raça</InputLabel>
          <Select
            name="race"
            value={data.race}
            onChange={handleChange}
            label="Raça"
          >
            <MenuItem value="">Selecione...</MenuItem>
            <MenuItem value="Elfo">Elfo</MenuItem>
            <MenuItem value="Humano">Humano</MenuItem>
          </Select>
        </FormControl>

        <FormControl
          variant="outlined"
          fullWidth
          sx={{
            backgroundColor: "rgba(211, 211, 211, 0.5)",
            borderRadius: "4px",
          }}
        >
          <InputLabel>Template</InputLabel>
          <Select
            name="template"
            value={data.template}
            onChange={handleChange}
            label="Template"
          >
            <MenuItem value="">Selecione...</MenuItem>
            <MenuItem value="Template 1">Template 1</MenuItem>
            <MenuItem value="Template 2">Template 2</MenuItem>
          </Select>
        </FormControl>

        <FormControl
          variant="outlined"
          fullWidth
          sx={{
            backgroundColor: "rgba(211, 211, 211, 0.5)",
            borderRadius: "4px",
          }}
        >
          <InputLabel>Classe</InputLabel>
          <Select
            name="class"
            value={data.class}
            onChange={handleChange}
            label="Classe"
          >
            <MenuItem value="">Selecione...</MenuItem>
            <MenuItem value="Guerreiro">Guerreiro</MenuItem>
            <MenuItem value="Mago">Mago</MenuItem>
          </Select>
        </FormControl>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="outlined"
            color="error"
            onClick={onClose}
            sx={{
              width: "48%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              color: "error.main",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.7)",
              },
            }}
          >
            Cancelar
          </Button>

          <Button
            variant="outlined"
            color="primary"
            onClick={() => onNext(data)}
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
      </Box>
    </div>
  );
};

export default FirstStep;
