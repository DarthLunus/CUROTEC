import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Thunk para buscar dados da API
export const fetchEquipamentos = createAsyncThunk("equipamentos/fetchEquipamentos", async () => {
    const response = await fetch("/api/equipamentos"); // Substitua pelo endpoint correto
    if (!response.ok) {
        throw new Error(`Erro ao buscar <entity>`);
    }
    return await response.json();
});

const fetchEquipamentosSlice = createSlice({
    name: "equipamentos",
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEquipamentos.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchEquipamentos.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchEquipamentos.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default fetchEquipamentosSlice.reducer;
