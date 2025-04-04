import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  loginUser as loginUserApi,
  fetchUser as fetchUserApi,
  updateUser as updateUserApi,
} from "../api";

// Action pour connecter l'utilisateur
// Dans loginUser thunk:
// Dans userSlice.js
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      console.log("Attempting to call loginUserApi with:", credentials);
      // loginUserApi retourne directement l'objet 'body' de la réponse API
      const responseBody = await loginUserApi(credentials);
      console.log(
        "<<< Body object received from loginUserApi >>>:",
        responseBody
      );

      // Vérifie si le token est présent dans l'objet reçu
      if (responseBody && responseBody.token) {
        // Retourne l'objet body tel quel. C'est lui qui deviendra action.payload
        return responseBody;
      } else {
        // L'objet retourné par loginUserApi n'a pas la structure attendue
        console.error(
          "Token not found in the object returned by loginUserApi:",
          responseBody
        );
        return rejectWithValue("Token not found in response");
      }
    } catch (error) {
      // Gestion améliorée des erreurs
      console.error("Error occurred during login process:", error);
      const message =
        error.response?.data?.message || // Message d'erreur spécifique de l'API (si Axios et si l'API le fournit)
        error.message || // Message d'erreur générique
        "An unknown error occurred during login.";
      console.error("Dispatching rejectWithValue with message:", message);
      return rejectWithValue(message);
    }
  }
);

// Action pour récupérer les données utilisateur
// Dans userSlice.js

// Action pour récupérer les données utilisateur
export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (token, { rejectWithValue }) => {
    // Ajout de getState si besoin
    try {
      console.log(
        "Attempting to call fetchUserApi with token:",
        token ? "Token Provided" : "NO TOKEN"
      ); // Vérifie si le token est bien passé
      if (!token) {
        return rejectWithValue("No token provided for fetchUser");
      }
      // fetchUserApi retourne directement l'objet 'body' contenant les infos user
      const userProfile = await fetchUserApi(token);
      console.log(
        "<<< User profile object received from fetchUserApi >>>:",
        userProfile
      );

      // Vérifie si le profil reçu est valide (contient au moins un email par exemple)
      if (userProfile && userProfile.email) {
        // Retourne l'objet userProfile tel quel. Il deviendra action.payload
        return userProfile;
      } else {
        console.error(
          "User profile not found or invalid structure:",
          userProfile
        );
        return rejectWithValue("User profile not found or invalid");
      }
    } catch (error) {
      console.error("Error occurred during fetchUser process:", error);
      const message =
        error.response?.data?.message ||
        error.message ||
        "An unknown error occurred while fetching user data.";
      console.error("Dispatching rejectWithValue with message:", message);
      return rejectWithValue(message);
    }
  }
);

// Action pour mettre à jour les informations utilisateur
// Dans userSlice.js
export const updateUser = createAsyncThunk(
  "user/updateUser",
  // On reçoit l'objet complet avec les données ET le token
  async (userData, { rejectWithValue }) => {
    try {
      // Sépare les données du profil et le token pour l'appel API
      const { token, ...profileData } = userData; // profileData contient { userName, firstName, lastName }

      console.log(
        "Attempting to call updateUserApi with profile data:",
        profileData
      );
      if (!token) {
        console.error("No token provided for updateUser");
        return rejectWithValue("Authentication token is missing.");
      }

      // updateUserApi retourne directement l'objet 'body' mis à jour
      const updatedProfile = await updateUserApi(profileData, token);
      console.log(
        "<<< Updated profile object received from updateUserApi >>>:",
        updatedProfile
      );

      // Vérifie si le profil retourné est valide
      if (updatedProfile && updatedProfile.userName) {
        // ou une autre clé comme 'email'
        // Retourne l'objet 'updatedProfile' tel quel. Il deviendra action.payload.
        return updatedProfile;
      } else {
        console.error(
          "Invalid or unexpected profile structure received after update:",
          updatedProfile
        );
        return rejectWithValue("Received invalid user data after update.");
      }
    } catch (error) {
      console.error("Error occurred during updateUser process:", error);
      const message =
        error.response?.data?.message || // Message d'erreur API
        error.message ||
        "Failed to update user profile.";
      console.error("Dispatching rejectWithValue with message:", message);
      return rejectWithValue(message);
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
    isAuthenticated: false, // Ajoute ça si ce n'est pas déjà fait
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log("Redux loginUser fulfilled payload:", action.payload);
        if (action.payload) {
          state.token = action.payload.token;
        } else {
          console.error("Payload is undefined in loginUser.fulfilled");
        }
        state.loading = false;
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
        console.log("Redux fetchUser fulfilled payload:", action.payload);
        state.loading = false;
        state.user = action.payload;
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
        console.log("Redux updateUser fulfilled payload:", action.payload);
        if (action.payload) {
          state.user = { ...state.user, ...action.payload };
        } else {
          console.error("Payload is undefined in updateUser.fulfilled");
        }
        state.loading = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
