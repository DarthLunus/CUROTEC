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
} from "@mui/material";

const SecondStep = ({ onNext, onPrevious, formData }) => {
  const [stats, setStats] = useState({
    Força: 8,
    Destreza: 8,
    Constituição: 8,
    Inteligência: 8,
    Sabedoria: 8,
    Carisma: 8,
    ...formData.stats,
    pointsAvailable: 32,
  });

  const handleIncrement = (stat) => {
    if (stats.pointsAvailable > 0 && stats[stat] < 18) {
      setStats((prev) => {
        const newValue = prev[stat] + 1;
        const cost = getCost(newValue);
        if (prev.pointsAvailable >= cost) {
          return {
            ...prev,
            [stat]: newValue,
            pointsAvailable: prev.pointsAvailable - cost,
          };
        }
        return prev;
      });
    }
  };

  const handleDecrement = (stat) => {
    if (stats[stat] > 8) {
      setStats((prev) => {
        const currentValue = prev[stat];
        const cost = getCost(currentValue);
        return {
          ...prev,
          [stat]: currentValue - 1,
          pointsAvailable: prev.pointsAvailable + cost,
        };
      });
    }
  };

  const getCost = (value) => {
    if (value <= 14) return 1;
    if (value <= 16) return 2;
    if (value <= 18) return 3;
    return 0;
  };

  const calculateModifier = (value) => Math.floor((value - 10) / 2);

  return (
    <div>
      <h2
        style={{
          color: "yellow",
          textShadow: "2px 2px 4px darkred",
        }}
      >
        Criação de Personagem: Segundo Passo
      </h2>
      <Typography
        variant="body1"
        gutterBottom
        sx={{
          color: "yellow",
          textShadow: "2px 2px 4px red",
        }}
      >
        Pontos Disponíveis: {stats.pointsAvailable}
      </Typography>


      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: "rgba(128, 128, 128, 0.3)",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ padding: "4px 8px", textShadow: "2px 2px 4px red" }}>
                <b>Atributos</b>
              </TableCell>
              <TableCell align="center" sx={{ padding: "4px 8px", textShadow: "2px 2px 4px red" }}>
                <b></b>
              </TableCell>
              <TableCell align="center" sx={{ padding: "4px 8px", textShadow: "2px 2px 4px red" }}>
                <b>Valor Base</b>
              </TableCell>
              <TableCell align="center" sx={{ padding: "4px 8px", textShadow: "2px 2px 4px red" }}>
                <b></b>
              </TableCell>
              <TableCell align="center" sx={{ padding: "4px 8px", textShadow: "2px 2px 4px red" }}>
                <b>Ajustado</b>
              </TableCell>
              <TableCell align="center" sx={{ padding: "4px 8px", textShadow: "2px 2px 4px red" }}>
                <b>Modificador</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {["Força", "Destreza", "Constituição", "Inteligência", "Sabedoria", "Carisma"].map(
              (stat) => (
                <TableRow key={stat}>
                  <TableCell sx={{ padding: "4px 8px" }}>{stat}</TableCell>

                  <TableCell align="center" sx={{ padding: "4px 8px" }}>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => handleDecrement(stat)}
                      disabled={stats[stat] <= 8}
                      sx={{
                        minWidth: "20px",
                        padding: "2px",
                        color: "white",
                        backgroundColor: "black",
                      }}
                    >
                      -
                    </Button>
                  </TableCell>

                  <TableCell
                    align="center"
                    sx={{
                      padding: "4px 8px",
                      backgroundColor: "rgba(128, 128, 128, 0.2)",
                    }}
                  >
                    <TextField
                      value={stats[stat]}
                      variant="outlined"
                      size="small"
                      inputProps={{
                        readOnly: true,
                        style: { textAlign: "center", width: "40px", fontSize: "1rem" },
                      }}
                      sx={{
                        backgroundColor: "rgba(255, 255, 255, 0.3)",
                      }}
                    />
                  </TableCell>

                  <TableCell align="center" sx={{ padding: "4px 8px" }}>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => handleIncrement(stat)}
                      disabled={stats[stat] >= 18 || stats.pointsAvailable <= 0}
                      sx={{
                        minWidth: "20px",
                        padding: "2px",
                        color: "white",
                        backgroundColor: "black",
                      }}
                    >
                      +
                    </Button>
                  </TableCell>

                  <TableCell
                    align="center"
                    sx={{
                      padding: "4px 8px",
                      backgroundColor: "rgba(128, 128, 128, 0.2)",
                    }}
                  >
                    <TextField
                      value={stats[stat]}
                      variant="outlined"
                      size="small"
                      inputProps={{
                        readOnly: true,
                        style: { textAlign: "center", width: "40px", fontSize: "1rem" },
                      }}
                      sx={{
                        backgroundColor: "rgba(255, 255, 255, 0.3)",
                      }}
                    />
                  </TableCell>

                  <TableCell align="center" sx={{ padding: "4px 8px" }}>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      sx={{
                        fontSize: "1rem",
                        backgroundColor: "rgba(128, 128, 128, 0.0)",
                        display: "inline-block",
                        padding: "2px 4px",
                      }}
                    >
                      {calculateModifier(stats[stat])}
                    </Typography>
                  </TableCell>
                </TableRow>
              )
            )}
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
          onClick={() => onNext({ stats })}
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

export default SecondStep;
