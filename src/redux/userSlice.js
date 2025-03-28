import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  loginUser as loginUserApi,
  fetchUser as fetchUserApi,
  updateUser as updateUserApi,
} from "../api";

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await loginUserApi(credentials);
      console.log("Login API Response:", response); // Vérifiez la réponse de l'API
      return response.body; // Retournez le token et les données utilisateur
    } catch (error) {
      console.error("Login error:", error);
      return rejectWithValue(error.response?.data || "Network error");
    }
  }
);

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (token, { rejectWithValue }) => {
    try {
      const response = await fetchUserApi(token);
      console.log("Fetch User API Response:", response); // Vérifiez la réponse de l'API
      return response.body;
    } catch (error) {
      console.error("Fetch user error:", error);
      return rejectWithValue(error.response?.data || "Network error");
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ userName, firstName, lastName, token }, { rejectWithValue }) => {
    try {
      const response = await updateUserApi(
        { userName, firstName, lastName },
        token
      );
      console.log("Update User API Response:", response); // Vérifiez la réponse de l'API
      return response.body; // Retournez les données utilisateur mises à jour
    } catch (error) {
      console.error("Update user error:", error);
      return rejectWithValue(error.response?.data || "Network error");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    token: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token; // Stockez le token
        state.user = action.payload.user; // Stockez les données utilisateur
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // Stockez les données utilisateur
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = { ...state.user, ...action.payload }; // Met à jour les données utilisateur
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
