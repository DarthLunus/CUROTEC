import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Thunk para buscar dados da API
export const fetchRacas = createAsyncThunk("racas/fetchRacas", async () => {
    const response = await fetch("/api/racas"); // Substitua pelo endpoint correto
    if (!response.ok) {
        throw new Error(`Erro ao buscar <entity>`);
    }
    return await response.json();
});

const fetchRacasSlice = createSlice({
    name: "racas",
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRacas.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRacas.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchRacas.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default fetchRacasSlice.reducer;
