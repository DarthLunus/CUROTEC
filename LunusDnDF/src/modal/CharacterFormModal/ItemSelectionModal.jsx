import { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const ItemSelectionModal = ({ open, onClose, onAddItem }) => {
  const [selectedItems, setSelectedItems] = useState([]);

  const equipmentCategories = [
    { category: "Armas Simples", items: [{ name: "Adaga", price: 2, weight: 1, id: 1 }] },
    { category: "Armas Comuns", items: [{ name: "Espada Longa", price: 15, weight: 4, id: 2 }] },
    { category: "Armas Exóticas", items: [{ name: "Chicote", price: 1, weight: 2, id: 3 }] },
    { category: "Armaduras e Escudos", items: [{ name: "Escudo de Madeira", price: 3, weight: 10, id: 4 }] },
    { category: "Itens Mundanos", items: [{ name: "Tocha", price: 0.01, weight: 1, id: 5 }] },
    { category: "Poções", items: [{ name: "Poção de Cura", price: 50, weight: 0.1, id: 6 }] },
    {
      category: "Pergaminhos",
      subcategories: [
        {
          category: "Arcano",
          circles: [
            { circle: "Truques", items: [{ name: "Luz", price: 10, weight: 0, id: 7 }] },
            { circle: "1º Círculo", items: [{ name: "Mísseis Mágicos", price: 25, weight: 0, id: 8 }] },
          ],
        },
        {
          category: "Divino",
          circles: [
            { circle: "Preces", items: [{ name: "Criar Água", price: 10, weight: 0, id: 9 }] },
            { circle: "1º Círculo", items: [{ name: "Curar Ferimentos Leves", price: 25, weight: 0, id: 10 }] },
          ],
        },
      ],
    },
    { category: "Varinhas", items: [{ name: "Varinha de Mísseis Mágicos", price: 750, weight: 0.5, id: 11 }] },
    { category: "Anéis", items: [{ name: "Anel de Proteção +1", price: 2000, weight: 0, id: 12 }] },
    { category: "Bastões", items: [{ name: "Bastão de Fogo", price: 5000, weight: 1, id: 13 }] },
    { category: "Cajados", items: [{ name: "Cajado de Cura", price: 4000, weight: 2, id: 14 }] },
    { category: "Itens Maravilhosos", items: [{ name: "Amuleto da Saúde", price: 3000, weight: 0, id: 15 }] },
  ];

  const handleSelectItem = (item) => {
    setSelectedItems((prevSelected) =>
      prevSelected.some((selectedItem) => selectedItem.id === item.id)
        ? prevSelected.filter((i) => i.id !== item.id)
        : [...prevSelected, item]
    );
  };

  const handleAddSelectedItems = () => {
    selectedItems.forEach((item) => onAddItem(item));
    setSelectedItems([]);
  };

  const formatValue = (value) => {
    if (value % 1 === 0) return `${value} PO`;
    if (value < 1 && value >= 0.1) return `${(value * 10).toFixed(1)} PP`;
    return `${(value * 100).toFixed(0)} PC`;
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
          maxHeight: "90vh",
          overflowY: "auto",
          backgroundImage: 'url(./forja.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Typography variant="h6" gutterBottom sx={{ marginTop: 2, color: "yellow", textShadow: "2px 2px 4px red" }}>
          Suprimentos
        </Typography>

        {equipmentCategories.map((category, index) => (
          <Accordion key={index}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`panel${index}-content`} id={`panel${index}-header`}>
              <Typography>{category.category}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {category.subcategories ? (
                category.subcategories.map((sub, subIndex) => (
                  <Accordion key={subIndex}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`subpanel${subIndex}-content`} id={`subpanel${subIndex}-header`}>
                      <Typography>{sub.category}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      {sub.circles.map((circle, circleIndex) => (
                        <Accordion key={circleIndex}>
                          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`circlepanel${circleIndex}-content`} id={`circlepanel${circleIndex}-header`}>
                            <Typography>{circle.circle}</Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <List>
                              {circle.items.map((item, idx) => (
                                <ListItem key={idx} sx={{ display: "flex", alignItems: "center" }}>
                                  <Checkbox
                                    checked={selectedItems.some((i) => i.id === item.id)}
                                    onChange={() => handleSelectItem(item)}
                                    sx={{ marginRight: 2 }}
                                  />
                                  <ListItemText
                                    primary={item.name}
                                    secondary={`Preço: ${formatValue(item.price)} | Peso: ${item.weight} kg`}
                                  />
                                </ListItem>
                              ))}
                            </List>
                          </AccordionDetails>
                        </Accordion>
                      ))}
                    </AccordionDetails>
                  </Accordion>
                ))
              ) : (
                <List>
                  {category.items.map((item, idx) => (
                    <ListItem key={idx} sx={{ display: "flex", alignItems: "center" }}>
                      <Checkbox
                        checked={selectedItems.some((i) => i.id === item.id)}
                        onChange={() => handleSelectItem(item)}
                        sx={{ marginRight: 2 }}
                      />
                      <ListItemText
                        primary={item.name}
                        secondary={`Preço: ${formatValue(item.price)} | Peso: ${item.weight} kg`}
                      />
                    </ListItem>
                  ))}
                </List>
              )}
            </AccordionDetails>
          </Accordion>
        ))}

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Button variant="contained" onClick={onClose} sx={{ backgroundColor: "darkred" }}>
            Fechar
          </Button>
          <Button variant="contained" onClick={handleAddSelectedItems} sx={{ backgroundColor: "green" }}>
            Adicionar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ItemSelectionModal;
