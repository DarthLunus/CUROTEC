import { useState } from "react";
import {
  Button,
  Box,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ItemSelectionModal from "./ItemSelectionModal";

const SixthStep = ({ onPrevious, onSubmit, formData }) => {
  const [resources, setResources] = useState(formData.resources);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [equipmentList, setEquipmentList] = useState([]);

  const formatValue = (value) => {
    if (value % 1 === 0) return `${value} PO`; // Valor inteiro (Peças de Ouro)
    if (value < 1 && value >= 0.1) return `${(value * 10).toFixed(1)} PP`; // Valor decimal (Peças de Prata)
    return `${(value * 100).toFixed(0)} PC`; // Valor centesimal (Peças de Cobre)
  };

  const adjustResources = (name, value) => {
    let newResources = { ...resources, [name]: parseInt(value) || 0 };

    if (newResources.gold < 0) {
      const goldDeficit = Math.abs(newResources.gold);

      const platinumUsed = Math.floor(goldDeficit / 10);
      newResources.gold += platinumUsed * 10;
      newResources.platinum = Math.max(0, newResources.platinum - platinumUsed);

      const silverDeficit = Math.abs(newResources.gold);
      const silverUsed = Math.floor(silverDeficit / 10);
      newResources.gold += silverUsed * 10;
      newResources.silver = Math.max(0, newResources.silver - silverUsed);

      const copperDeficit = Math.abs(newResources.gold);
      const copperUsed = Math.floor(copperDeficit / 10);
      newResources.gold += copperUsed * 10;
      newResources.copper = Math.max(0, newResources.copper - copperUsed);
    }

    setResources(newResources);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    adjustResources(name, value);
  };

  const addEquipment = () => {
    setIsModalOpen(true);
  };

  const handleAddItem = (item) => {
    const existingItemIndex = equipmentList.findIndex(
      (equipment) => equipment.name === item.name
    );

    if (existingItemIndex >= 0) {
      const updatedEquipmentList = [...equipmentList];
      updatedEquipmentList[existingItemIndex].quantity += 1;
      setEquipmentList(updatedEquipmentList);
    } else {
      setEquipmentList([
        ...equipmentList,
        { id: Date.now(), name: item.name, quantity: 1, value: item.price, weight: item.weight },
      ]);
    }
    setIsModalOpen(false);
  };

  const handleRemoveItem = (id) => {
    setEquipmentList(equipmentList.filter(item => item.id !== id));
  };

  const calculateTotalWeight = () => {
    return equipmentList.reduce(
      (total, item) => total + item.weight * item.quantity,
      0
    );
  };

  return (
    <div>
      <h2
        style={{
          color: "yellow",
          textShadow: "2px 2px 4px darkred",
        }}
      >
        Criação de Personagem: Sexto Passo
      </h2>
      <Typography
        variant="body1"
        gutterBottom
        sx={{
          marginTop: 2,
          color: "yellow",
          textShadow: "2px 2px 4px red",
        }}
      >
        Recursos:
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 2,
          marginBottom: 2,
        }}
      >
        <TextField
          label="Peças de Platina"
          name="platinum"
          type="number"
          value={resources.platinum}
          onChange={handleChange}
          sx={{
            backgroundColor: "rgba(211, 211, 211, 0.5)",
            borderRadius: "4px",
            flex: 1,
            boxShadow: "0 -4px 6px 0 black",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "white",
              },
              "&:hover fieldset": {
                borderColor: "white",
              },
            },
          }}
          InputLabelProps={{
            style: { color: "white" },
          }}
          inputProps={{
            style: {
              textAlign: "center",
            },
          }}
        />
        <TextField
          label="Peças de Ouro"
          name="gold"
          type="number"
          value={resources.gold}
          onChange={handleChange}
          sx={{
            backgroundColor: "rgba(211, 211, 211, 0.5)",
            borderRadius: "4px",
            flex: 1,
            boxShadow: "0 -4px 6px 0 black",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "yellow",
              },
              "&:hover fieldset": {
                borderColor: "yellow",
              },
            },
          }}
          InputLabelProps={{
            style: { color: "yellow" },
          }}
          inputProps={{
            style: {
              textAlign: "center",
            },
          }}
        />
        <TextField
          label="Peças de Prata"
          name="silver"
          type="number"
          value={resources.silver}
          onChange={handleChange}
          sx={{
            backgroundColor: "rgba(211, 211, 211, 0.5)",
            borderRadius: "4px",
            flex: 1,
            boxShadow: "0 -4px 6px 0 black",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "gray",
              },
              "&:hover fieldset": {
                borderColor: "gray",
              },
            },
          }}
          InputLabelProps={{
            style: { color: "gray" },
          }}
          inputProps={{
            style: {
              textAlign: "center",
            },
          }}
        />
        <TextField
          label="Peças de Cobre"
          name="copper"
          type="number"
          value={resources.copper}
          onChange={handleChange}
          sx={{
            backgroundColor: "rgba(211, 211, 211, 0.5)",
            borderRadius: "4px",
            flex: 1,
            boxShadow: "0 -4px 6px 0 black",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "darkorange",
              },
              "&:hover fieldset": {
                borderColor: "darkorange",
              },
            },
          }}
          InputLabelProps={{
            style: { color: "darkorange" },
          }}
          inputProps={{
            style: {
              textAlign: "center",
            },
          }}
        />
      </Box>

      <Typography
        variant="h6"
        gutterBottom
        sx={{
          marginTop: 2,
          color: "yellow",
          textShadow: "2px 2px 4px red",
        }}
      >
        Capacidade de Carga
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 2,
          marginBottom: 2,
        }}
      >
        <TextField
          label="Carga"
          name="Load"
          type="text"
          value={
            calculateTotalWeight() > resources.heavyLoad
              ? "Nulo"
              : calculateTotalWeight()
          }
          disabled
          sx={{
            backgroundColor:
              calculateTotalWeight() === 0
                ? "rgba(211, 211, 211, 0.5)"
                : calculateTotalWeight() > resources.heavyLoad
                  ? "rgba(0, 0, 0, 0.8)"
                  : calculateTotalWeight() > resources.moderateLoad
                    ? "rgba(255, 0, 0, 0.5)"
                    : calculateTotalWeight() > resources.lightLoad
                      ? "rgba(255, 255, 0, 0.5)"
                      : "rgba(0, 255, 0, 0.5)",
            borderRadius: "4px",
            flex: 1,
            boxShadow: "0 -4px 6px 0 black",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "blue",
              },
            },
          }}
          InputLabelProps={{
            style: { color: "blue" },
          }}
          inputProps={{
            style: {
              textAlign: "center",
            },
          }}
        />
        <TextField
          label="Carga Leve"
          name="lightLoad"
          type="number"
          value={resources.lightLoad}
          onChange={handleChange}
          sx={{
            backgroundColor: "rgba(211, 211, 211, 0.5)",
            borderRadius: "4px",
            flex: 1,
            boxShadow: "0 -4px 6px 0 black",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "green",
              },
              "&:hover fieldset": {
                borderColor: "green",
              },
            },
          }}
          InputLabelProps={{
            style: { color: "green" },
          }}
          inputProps={{
            style: {
              textAlign: "center",
            },
          }}
        />
        <TextField
          label="Carga Média"
          name="moderateLoad"
          type="number"
          value={resources.moderateLoad}
          onChange={handleChange}
          sx={{
            backgroundColor: "rgba(211, 211, 211, 0.5)",
            borderRadius: "4px",
            flex: 1,
            boxShadow: "0 -4px 6px 0 black",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "yellow",
              },
              "&:hover fieldset": {
                borderColor: "yellow",
              },
            },
          }}
          InputLabelProps={{
            style: { color: "yellow" },
          }}
          inputProps={{
            style: {
              textAlign: "center",
            },
          }}
        />
        <TextField
          label="Carga Pesada"
          name="heavyLoad"
          type="number"
          value={resources.heavyLoad}
          onChange={handleChange}
          sx={{
            backgroundColor: "rgba(211, 211, 211, 0.5)",
            borderRadius: "4px",
            flex: 1,
            boxShadow: "0 -4px 6px 0 black",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "red",
              },
              "&:hover fieldset": {
                borderColor: "red",
              },
            },
          }}
          InputLabelProps={{
            style: { color: "red" },
          }}
          inputProps={{
            style: {
              textAlign: "center",
            },
          }}
        />
      </Box>

      <Button variant="outlined" onClick={addEquipment} sx={{ width: "100%", backgroundColor: "rgba(0, 0, 0, 0.5)", color: "green", borderColor: "green", "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.7)" } }}>Adicionar Equipamento</Button>

      <ItemSelectionModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddItem={handleAddItem}
      />

      <TableContainer
        component={Paper}
        sx={{ mt: 3, backgroundColor: "rgba(169, 169, 169, 0.3)" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ fontWeight: "bold", padding: "4px 8px" }}>Item</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold", padding: "4px 8px" }}>Quantidade</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold", padding: "4px 8px" }}>Valor</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold", padding: "4px 8px" }}>Peso</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold", padding: "4px 8px" }}>Excluir</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {equipmentList.map((item) => (
              <TableRow key={item.id}>
                <TableCell align="center" sx={{ padding: "2px 20px" }}>{item.name}</TableCell>
                <TableCell align="center" sx={{ padding: "2px 4px" }}>{item.quantity}</TableCell>
                <TableCell align="center" sx={{ padding: "2px 4px" }}>
                  {formatValue(item.value)}
                </TableCell>
                <TableCell align="center" sx={{ padding: "2px 4px" }}>{item.weight} kg</TableCell>
                <TableCell align="center" sx={{ padding: "2px 4px" }}>
                  <IconButton
                    color="error"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
        <Button
          variant="outlined"
          color="error"
          onClick={onPrevious}
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
        <Button
          variant="outlined"
          color="primary"
          onClick={() => onSubmit({ resources })}
          sx={{
            width: "48%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            color: "primary.main",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.7)",
            },
          }}
        >
          Salvar
        </Button>
      </Box>
    </div>
  );
};

export default SixthStep;
