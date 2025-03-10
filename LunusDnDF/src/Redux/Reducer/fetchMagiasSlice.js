import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchMagias = createAsyncThunk("magias/fetchMagias", async () => {
    const response = await fetch("/api/magias"); // Altere para o endpoint correto
    if (!response.ok) {
        throw new Error("Erro ao buscar magias");
    }
    return await response.json();
});

const fetchMagiasSlice = createSlice({
    name: "magias",
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMagias.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMagias.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchMagias.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default fetchMagiasSlice.reducer;
