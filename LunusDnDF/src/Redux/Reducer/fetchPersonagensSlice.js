import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Thunk para buscar dados da API
export const fetchPersonagens = createAsyncThunk("personagens/fetchPersonagens", async () => {
    const response = await fetch("/api/personagens"); // Substitua pelo endpoint correto
    if (!response.ok) {
        throw new Error(`Erro ao buscar <entity>`);
    }
    return await response.json();
});

const fetchPersonagensSlice = createSlice({
    name: "personagens",
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPersonagens.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPersonagens.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchPersonagens.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default fetchPersonagensSlice.reducer;
