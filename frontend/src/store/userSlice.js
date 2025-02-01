import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to get user data
export const getUserData = createAsyncThunk(
  "user/getUserData",
  async (_,{ rejectWithValue }) => {
    try {
        const response = await axios.post("http://localhost:4000/auth/getuserdata",{},{withCredentials: true });
        console.log(response.data);
        const data = await response.data.userData;
        return data;

    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch user data");
    }
  }
);

// Async thunk for logout
export const handleLogout = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:4000/auth/logout", { withCredentials: true });
      console.log("Logout successful");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to logout");
    }
  }
);

const initialState = {
  userData: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
  
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    clearUserData: (state) => {
      state.userData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
        state.error = null;
      })
      .addCase(getUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(handleLogout.pending, (state) => {
        state.loading = true;
      })
      .addCase(handleLogout.fulfilled, (state) => {
        state.loading = false;
        state.userData = null; // Clear user data on logout
        state.error = null;
      })
      .addCase(handleLogout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export the reducer and actions
export const { setUserData, clearUserData } = userSlice.actions;
export default userSlice.reducer;
