import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Thunk para buscar dados da API
export const fetchCampanhas = createAsyncThunk("campanhas/fetchCampanhas", async () => {
    const response = await fetch("/api/campanhas"); // Substitua pelo endpoint correto
    if (!response.ok) {
        throw new Error(`Erro ao buscar <entity>`);
    }
    return await response.json();
});

const fetchCampanhasSlice = createSlice({
    name: "campanhas",
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCampanhas.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCampanhas.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchCampanhas.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default fetchCampanhasSlice.reducer;
