import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Thunk para buscar dados da API
export const fetchCenarios = createAsyncThunk("cenarios/fetchCenarios", async () => {
    const response = await fetch("/api/cenarios"); // Substitua pelo endpoint correto
    if (!response.ok) {
        throw new Error(`Erro ao buscar <entity>`);
    }
    return await response.json();
});

const fetchCenariosSlice = createSlice({
    name: "cenarios",
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCenarios.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCenarios.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchCenarios.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default fetchCenariosSlice.reducer;
