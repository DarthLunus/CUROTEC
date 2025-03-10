import { useState } from "react";
import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";
import ThirdStep from "./ThirdStep";
import FourthStep from "./FourthStep";
import FifthStep from "./FifthStep";
import SixthStep from "./SixthStep";

const CharacterFormModal = ({ onClose, onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    region: "",
    deity: "",
    race: "",
    template: "",
    class: "",
    stats: {
      strength: 8,
      dexterity: 8,
      constitution: 8,
      intelligence: 8,
      wisdom: 8,
      charisma: 8,
      pointsAvailable: 32,
    },
    skills: [],
    talents: {
      racial: "",
      general: "",
      additional: "",
    },
    personalInfo: {
      name: "",
      gender: "",
      age: "",
      height: "",
      alignment: "",
      image: null,
      description: "",
      prelude: "",
    },
    resources: {
      platinum: 0,
      gold: 0,
      silver: 0,
      copper: 0,
      equipment: [],
    },
  });

  const handleNext = (data) => {
    setFormData({ ...formData, ...data });
    setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => setCurrentStep(currentStep - 1);

  const handleSubmit = () => onSubmit(formData);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundImage: "url('./Scroll.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1300,
      }}
    >
      <div
        style={{
          backgroundImage: "url('./Modal.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          borderRadius: "8px",
          padding: "20px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          maxWidth: "800px",
          width: "100%",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <style>
          {`
            div::-webkit-scrollbar {
              width: 4px;
            }
            div::-webkit-scrollbar-thumb {
              background-color: black;
              border-radius: 2px;
            }
            div::-webkit-scrollbar-track {
              background-color: transparent;
            }
          `}
        </style>

        {currentStep === 1 && (
          <FirstStep onNext={handleNext} onClose={onClose} formData={formData} />
        )}
        {currentStep === 2 && (
          <SecondStep
            onNext={handleNext}
            onPrevious={handlePrevious}
            formData={formData}
          />
        )}
        {currentStep === 3 && (
          <ThirdStep
            onNext={handleNext}
            onPrevious={handlePrevious}
            formData={formData}
          />
        )}
        {currentStep === 4 && (
          <FourthStep
            onNext={handleNext}
            onPrevious={handlePrevious}
            formData={formData}
          />
        )}
        {currentStep === 5 && (
          <FifthStep
            onNext={handleNext}
            onPrevious={handlePrevious}
            formData={formData}
          />
        )}
        {currentStep === 6 && (
          <SixthStep
            onPrevious={handlePrevious}
            onSubmit={handleSubmit}
            formData={formData}
          />
        )}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            backgroundColor: "transparent",
            border: "none",
            fontSize: "1.5rem",
            cursor: "pointer",
            color: "#333",
          }}
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default CharacterFormModal;
