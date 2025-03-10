import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const createUser = createAsyncThunk(
  "users/createUser",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState().createUsersSlice;

      const formData = new FormData();
      formData.append("username", state.username);
      formData.append("first_name", state.nickname);
      formData.append("password", state.password);

      if (state.avatar && state.avatar instanceof File) {
        formData.append("avatar", state.avatar);
      }

      console.log("Dados enviados para o backend:");
      for (const [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      const response = await fetch("http://localhost:8000/users/create-user/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Erro ao criar usuário");
      }

      const data = await response.json();
      console.log("Dados retornados pelo servidor:", data);

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  username: "",
  nickname: "",
  password: "",
  avatar: null,
  snackbarOpen: false,
  status: "idle",
  error: null,
};

const createUsersSlice = createSlice({
  name: "createUsersSlice",
  initialState,
  reducers: {
    setUsername: (state, action) => {
      console.log("setUsername chamado:", action.payload);
      state.username = action.payload;
    },
    setNickname: (state, action) => {
      console.log("setNickname chamado:", action.payload);
      state.nickname = action.payload;
    },
    setPassword: (state, action) => {
      console.log("setPassword chamado:", action.payload);
      state.password = action.payload;
    },
    setAvatar: (state, action) => {
      console.log("setAvatar chamado:", action.payload);
      state.avatar = action.payload;
    },
    setSnackbarOpen: (state, action) => {
      state.snackbarOpen = action.payload;
    },
    clearForm: (state) => {
      state.username = "";
      state.nickname = "";
      state.password = "";
      state.avatar = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state) => {
        state.status = "succeeded";
        state.snackbarOpen = true;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const {
  setUsername,
  setNickname,
  setPassword,
  setAvatar,
  setSnackbarOpen,
  clearForm,
} = createUsersSlice.actions;

export default createUsersSlice.reducer;

export const logFormDataMiddleware = (storeAPI) => (next) => (action) => {
  const result = next(action);

  const state = storeAPI.getState().createUsersSlice;

  const formData = new FormData();
  formData.append("username", state.username);
  formData.append("first_name", state.nickname);
  formData.append("password", state.password);

  if (state.avatar && state.avatar instanceof File) {
    formData.append("avatar", state.avatar);
  }

  console.log("FormData logged:");
  for (let [key, value] of formData.entries()) {
    console.log(`${key}:`, value);
  }

  return result;
};
