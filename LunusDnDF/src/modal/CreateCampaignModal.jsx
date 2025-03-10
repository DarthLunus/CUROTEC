import { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Autocomplete,
} from "@mui/material";

const CreateCampaignModal = () => {
  const [campaignData, setCampaignData] = useState({
    scenario: "",
    year: "",
    city: "",
    players: [],
  });

  const handleChange = (field, value) => {
    setCampaignData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    if (campaignData.scenario && campaignData.year && campaignData.city) {
      onAdd(campaignData);
      setCampaignData({ scenario: "", year: "", city: "", players: [] });
    } else {
      alert("Por favor, preencha todos os campos obrigatórios.");
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" component="h2" gutterBottom>
          Criar Nova Campanha
        </Typography>
        <TextField
          select
          label="Cenário"
          fullWidth
          value={campaignData.scenario}
          onChange={(e) => handleChange("scenario", e.target.value)}
          margin="normal"
        >
          {scenarios.map((scenario) => (
            <MenuItem key={scenario.id} value={scenario.name}>
              {scenario.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Ano"
          type="number"
          fullWidth
          value={campaignData.year}
          onChange={(e) => handleChange("year", e.target.value)}
          margin="normal"
        />

        <TextField
          label="Cidade"
          fullWidth
          value={campaignData.city}
          onChange={(e) => handleChange("city", e.target.value)}
          margin="normal"
        />

        {/* Jogadores */}
        <Autocomplete
          multiple
          options={users}
          getOptionLabel={(option) => option.name}
          value={campaignData.players}
          onChange={(event, value) => handleChange("players", value)}
          renderInput={(params) => (
            <TextField {...params} label="Jogadores" margin="normal" fullWidth />
          )}
        />

        <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
          <Button onClick={onClose} color="secondary" variant="outlined">
            Cancelar
          </Button>
          <Button onClick={handleSubmit} color="primary" variant="contained">
            Criar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CreateCampaignModal;
