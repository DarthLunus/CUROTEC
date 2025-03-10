import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Thunk para buscar dados da API
export const fetchTalentos = createAsyncThunk("talentos/fetchTalentos", async () => {
    const response = await fetch("/api/talentos"); // Substitua pelo endpoint correto
    if (!response.ok) {
        throw new Error(`Erro ao buscar <entity>`);
    }
    return await response.json();
});

const fetchTalentosSlice = createSlice({
    name: "talentos",
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTalentos.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTalentos.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchTalentos.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default fetchTalentosSlice.reducer;
