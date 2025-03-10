import { useState } from "react";
import { styled } from "@mui/system";
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
  Checkbox,
} from "@mui/material";

const SKILLS = [
  "Abrir Fechadura",
  "Acrobacia",
  "Adestrar Animais",
  "Arte da Fuga",
  "Atuação (Dramaturgia)",
  "Atuação (Humor)",
  "Atuação (Dança)",
  "Atuação (Instrumentos de Teclado)",
  "Atuação (Oratória)",
  "Atuação (Instrumentos de Percussão)",
  "Atuação (Instrumentos de Corda)",
  "Atuação (Instrumentos de Sopro)",
  "Atuação (Canto)",
  "Avaliação",
  "Blefar",
  "Cavalgar",
  "Concentração",
  "Conhecimento (Arcano)",
  "Conhecimento (Arquitetura e Engenharia)",
  "Conhecimento (Geografia)",
  "Conhecimento (História)",
  "Conhecimento (Local)",
  "Conhecimento (Masmorras)",
  "Conhecimento (Natureza)",
  "Conhecimento (Nobreza e Realeza)",
  "Conhecimento (Planos)",
  "Conhecimento (Religião)",
  "Cura",
  "Decifrar Escrita",
  "Diplomacia",
  "Disfarces",
  "Equilíbrio",
  "Escalar",
  "Esconder-se",
  "Falsificação",
  "Furtividade",
  "Identificar Magia",
  "Intimidação",
  "Natação",
  "Observar",
  "Obter Informação",
  "Ofícios (Alquimia)",
  "Ofícios (Alvenaria)",
  "Ofícios (Armadilharia)",
  "Ofícios (Armeiro)",
  "Ofícios (Armoraria)",
  "Ofícios (Arquearia)",
  "Ofícios (Caligrafia)",
  "Ofícios (Carpintaria)",
  "Ofícios (Cestaria)",
  "Ofícios (Construção Naval)",
  "Ofícios (Curtição)",
  "Ofícios (Encadernação)",
  "Ofícios (Escultura)",
  "Ofícios (Forjaria)",
  "Ofícios (Lapidação)",
  "Ofícios (Metalurgia)",
  "Ofícios (Olaria)",
  "Ofícios (Pintura)",
  "Ofícios (Sapataria)",
  "Ofícios (Serralheria)",
  "Ofícios (Tecelagem)",
  "Ofícios (Venefício)",
  "Operar Mecanismo",
  "Ouvir",
  "Prestidigitação",
  "Procurar",
  "Profissão (Astrólogo)",
  "Profissão (Barqueiro)",
  "Profissão (Bibliotecário)",
  "Profissão (Boticário)",
  "Profissão (Caçador)",
  "Profissão (Carregador)",
  "Profissão (Carroceiro)",
  "Profissão (Cavalariço)",
  "Profissão (Cervejeiro)",
  "Profissão (Chaveiro)",
  "Profissão (Cocheiro)",
  "Profissão (Cozinheiro)",
  "Profissão (Curtidor)",
  "Profissão (Engenheiro)",
  "Profissão (Engenheiro Tático)",
  "Profissão (Escriba)",
  "Profissão (Estalajadeiro)",
  "Profissão (Fazendeiro)",
  "Profissão (Guia)",
  "Profissão (Herbalista)",
  "Profissão (Jogador)",
  "Profissão (Lenhador)",
  "Profissão (Marinheiro)",
  "Profissão (Moleiro)",
  "Profissão (Pastor)",
  "Profissão (Pescador)",
  "Profissão (Rancheiro)",
  "Profissão (Xilografista)",
  "Saltar",
  "Sentir Motivação",
  "Sobrevivência",
  "Usar Cordas",
  "Usar Instrumento Mágico",
];

const StyledCheckbox = styled(Checkbox)({
  "&.Mui-checked": {
    color: "black",
  },
});

const ThirdStep = ({ onNext, onPrevious, formData }) => {
  const initialSkills = SKILLS.reduce((acc, skill) => {
    acc[skill] = { grade: 0, isClass: false };
    return acc;
  }, {});

  const [skills, setSkills] = useState({ ...initialSkills, ...formData.skills });
  const [availablePoints, setAvailablePoints] = useState(20);
  const [maxGrade, setMaxGrade] = useState(4);

  const handleIncrement = (skill) => {
    if (availablePoints > 0 && skills[skill].grade < maxGrade) {
      setSkills((prev) => ({
        ...prev,
        [skill]: { ...prev[skill], grade: prev[skill].grade + 1 },
      }));
      setAvailablePoints((prev) => prev - 1);
    }
  };

  const handleDecrement = (skill) => {
    if (skills[skill].grade > 0) {
      setSkills((prev) => ({
        ...prev,
        [skill]: { ...prev[skill], grade: prev[skill].grade - 1 },
      }));
      setAvailablePoints((prev) => prev + 1);
    }
  };

  const handleCheckboxChange = (skill) => {
    setSkills((prev) => ({
      ...prev,
      [skill]: { ...prev[skill], isClass: !prev[skill].isClass },
    }));
  };

  return (
    <div>
      <h2
        style={{
          color: "yellow",
          textShadow: "2px 2px 4px darkred",
        }}
      >
        Criação de Personagem: Terceiro Passo
      </h2>
      <Typography variant="body1" gutterBottom
        sx={{
          color: "yellow",
          textShadow: "2px 2px 4px red",
        }}
      >
        Selecione e ajuste as graduações das perícias:
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
        <Typography variant="body1" sx={{
          color: "yellow",
          textShadow: "2px 2px 4px red",
        }}>Pontos de Perícia disponíveis: {availablePoints}</Typography>
        <Typography variant="body1"
          sx={{
            color: "yellow",
            textShadow: "2px 2px 4px red",
          }}
        >Graduação Máxima: {maxGrade}</Typography>
      </Box>

      <TableContainer component={Paper}
        sx={{
          backgroundColor: "rgba(128, 128, 128, 0.3)",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ padding: "4px 8px", textShadow: "2px 2px 4px red" }}><b>Classe</b></TableCell>
              <TableCell sx={{ padding: "4px 8px", textShadow: "2px 2px 4px red" }}><b>Perícia</b></TableCell>
              <TableCell align="center" sx={{ padding: "4px 8px" }}><b></b></TableCell>
              <TableCell align="center" sx={{ padding: "4px 8px", textShadow: "2px 2px 4px red" }}><b>Graduação</b></TableCell>
              <TableCell align="center" sx={{ padding: "4px 8px" }}><b></b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {SKILLS.map((skill) => (
              <TableRow key={skill}>
                <TableCell sx={{ padding: "4px 8px" }}>
                  <StyledCheckbox
                    checked={skills[skill]?.isClass || false}
                    onChange={() => handleCheckboxChange(skill)}
                    size="small"
                  />
                </TableCell>

                <TableCell sx={{ padding: "4px 8px", textShadow: "2px 2px 4px white" }}>{skill}</TableCell>

                <TableCell align="center" sx={{ padding: "4px 8px" }}>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleDecrement(skill)}
                    disabled={skills[skill].grade <= 0}
                    sx={{ minWidth: "20px", padding: "2px", color: "white", backgroundColor: "black" }}
                  >
                    -
                  </Button>
                </TableCell>

                <TableCell align="center" sx={{ padding: "4px 8px" }}>
                  <TextField
                    value={skills[skill].grade}
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
                    onClick={() => handleIncrement(skill)}
                    disabled={availablePoints <= 0 || skills[skill].grade >= maxGrade}
                    sx={{ minWidth: "20px", padding: "2px", color: "white", backgroundColor: "black" }}
                  >
                    +
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
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
        <Button variant="outlined" color="primary" onClick={() => onNext({ skills })}
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

export default ThirdStep;
