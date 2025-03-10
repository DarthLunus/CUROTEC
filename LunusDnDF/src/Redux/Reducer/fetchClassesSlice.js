import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Thunk para buscar dados da API
export const fetchClasses = createAsyncThunk("classes/fetchClasses", async () => {
    const response = await fetch("/api/classes"); // Substitua pelo endpoint correto
    if (!response.ok) {
        throw new Error(`Erro ao buscar <entity>`);
    }
    return await response.json();
});

const fetchClassesSlice = createSlice({
    name: "classes",
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchClasses.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchClasses.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchClasses.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default fetchClassesSlice.reducer;
