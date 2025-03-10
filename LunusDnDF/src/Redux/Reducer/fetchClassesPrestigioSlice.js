import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Thunk para buscar dados da API
export const fetchClassesPrestigio = createAsyncThunk("classesPrestigio/fetchClassesPrestigio", async () => {
    const response = await fetch("/api/classesPrestigio"); // Substitua pelo endpoint correto
    if (!response.ok) {
        throw new Error(`Erro ao buscar <entity>`);
    }
    return await response.json();
});

const fetchClassesPrestigioSlice = createSlice({
    name: "classesPrestigio",
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchClassesPrestigio.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchClassesPrestigio.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchClassesPrestigio.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default fetchClassesPrestigioSlice.reducer;
