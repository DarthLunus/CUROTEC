import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Reducer/userSlice";
import createUsersSliceReducer from "./Reducer/createUsersSlice";
import fetchUsersReducer from "./Reducer/fetchUsersSlice";
import fetchMagiasReducer from "./reducer/fetchMagiasSlice";
import fetchCampanhasReducer from "./reducer/fetchCampanhasSlice";
import fetchCenariosReducer from "./reducer/fetchCenariosSlice";
import fetchClassesPrestigioReducer from "./reducer/fetchClassesPrestigioSlice";
import fetchClassesReducer from "./reducer/fetchClassesSlice";
import fetchDivindadesReducer from "./reducer/fetchDivindadesSlice";
import fetchEquipamentosReducer from "./reducer/fetchEquipamentosSlice";
import fetchPersonagensReducer from "./reducer/fetchPersonagensSlice";
import fetchRacasReducer from "./reducer/fetchRacasSlice";
import fetchRegioesReducer from "./reducer/fetchRegioesSlice";
import fetchTalentosReducer from "./reducer/fetchTalentosSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    createUsersSlice: createUsersSliceReducer,
    fetchUsers: fetchUsersReducer,
    fetchMagias: fetchMagiasReducer,
    fetchCampanhas: fetchCampanhasReducer,
    fetchCenarios: fetchCenariosReducer,
    fetchClassesPrestigio: fetchClassesPrestigioReducer,
    fetchClasses: fetchClassesReducer,
    fetchDivindades: fetchDivindadesReducer,
    fetchEquipamentos: fetchEquipamentosReducer,
    fetchPersonagens: fetchPersonagensReducer,
    fetchRacas: fetchRacasReducer,
    fetchRegioes: fetchRegioesReducer,
    fetchTalentos: fetchTalentosReducer,    
  },
});

export default store;
