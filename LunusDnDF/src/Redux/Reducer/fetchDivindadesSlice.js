import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Thunk para buscar dados da API
export const fetchDivindades = createAsyncThunk("divindades/fetchDivindades", async () => {
    const response = await fetch("/api/divindades"); // Substitua pelo endpoint correto
    if (!response.ok) {
        throw new Error(`Erro ao buscar <entity>`);
    }
    return await response.json();
});

const fetchDivindadesSlice = createSlice({
    name: "divindades",
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDivindades.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDivindades.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchDivindades.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default fetchDivindadesSlice.reducer;
