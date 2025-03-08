import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../../utils/Api";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

// Async action creator to log in user
export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await Api.post("/auth/login", userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async action creator to fetch current user data
export const currentUser = createAsyncThunk(
  "user/getme",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await Api.get("/user/getme");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async action creator to log out user
export const logoutUser = createAsyncThunk("auth/logout", async () => {
  try {
    await Api.post("/auth/logout");
    Cookies.remove("accessToken"); // Adjust cookie name as per your setup

    return null; // Assuming logout was successful, return null or appropriate data
  } catch (error) {
    console.error("Error logging out:", error);
    throw error; // Handle errors as needed
  }
});

const authSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: false,
    error: null,
    success: true,
    isAuthenticated: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.isAuthenticated = true;
        state.user = payload.user;
      })
      .addCase(currentUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.isAuthenticated = true;
        state.user = payload.user;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.isAuthenticated = false; // Update isAuthenticated to false on logout
        state.user = null; // Clear user data on logout
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.loading = false;
        if (payload) {
          if (Array.isArray(payload.error)) {
            payload.error.forEach((err) => toast.error(err.message));
          } else if (payload.success === false && payload.error) {
            state.error = payload.error;
            state.success = payload.success;
          } else {
            state.error = "An unknown error occurred";
          }
        } else {
          state.error = "Network error occurred";
        }
      })
      .addCase(currentUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload.error;
        state.success = payload.success;
      });
  },
});

export default authSlice.reducer;
