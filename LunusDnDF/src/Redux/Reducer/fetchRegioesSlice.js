import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Thunk para buscar dados da API
export const fetchRegioes = createAsyncThunk("regioes/fetchRegioes", async () => {
    const response = await fetch("/api/regioes"); // Substitua pelo endpoint correto
    if (!response.ok) {
        throw new Error(`Erro ao buscar <entity>`);
    }
    return await response.json();
});

const fetchRegioesSlice = createSlice({
    name: "regioes",
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRegioes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRegioes.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchRegioes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default fetchRegioesSlice.reducer;
