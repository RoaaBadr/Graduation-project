import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../../utils/Api";
import { toast } from "react-toastify";
import { data } from "jquery";

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

export const updateUserProfile = createAsyncThunk(
  "user/update-me",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await Api.patch(`/users/update-profile`, userData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

/*********** Admin *************** */
export const getAllUsers = createAsyncThunk(
  "user/getall",
  async (queries, { rejectWithValue }) => {
    try {
      const { page, fieldValue, fieldName, searchBy, searchValue } = queries;
      const response = await Api.get(
        `/user/getall?page=${page}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await Api.post("/auth/register", userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getUser = createAsyncThunk(
  "user/get-one",
  async (_id, { rejectWithValue }) => {
    try {
      const response = await Api.get(`/user/get-one/${_id}`);
            console.log(response);

      return response.data;

    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/update-admin",
  async ({ _id, userData }, { rejectWithValue }) => {
    try {
      const response = await Api.patch(`/user/update-admin/${_id}`, userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "user/delete-me",
  async ({ _id }, { rejectWithValue }) => {
    try {
      const response = await Api.delete(`/user/delete-me/${_id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    users: [],
    getUser: null,
    pagination: [],
    loading: false,
    error: null,
    success: true,
    isAuthenticated: false,
  },
  reducers: {
    setOnline: (state, action) => {
      const index = state.users.findIndex(
        (user) => user._id === action.payload._id
      );
      if (index !== -1) {
        state.users[index].online = true;
      }
    },
  },
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
        state.user = payload.data;
      })
      .addCase(currentUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.isAuthenticated = true;
        state.user = payload.data;
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.loading = false;
        if (payload) {
          if (Array.isArray(payload.error)) {
            payload.error.map((err) => toast.error(err.message));
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
        state.error = payload.error;
        state.success = payload.success;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.user = payload.data;
      })
      .addCase(updateUserProfile.rejected, (state, { payload }) => {
        state.loading = false;
        if (payload) {
          if (Array.isArray(payload.error)) {
            payload.error.map((err) => toast.error(err.message));
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
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.getUser = payload.data;
      })
      .addCase(updateUser.rejected, (state, { payload }) => {
        state.loading = false;
        if (payload) {
          if (Array.isArray(payload.error)) {
            payload.error.map((err) => toast.error(err.message));
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
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.pagination = payload.pagination;
        state.users = payload.data;

      })
      .addCase(getAllUsers.rejected, (state, { payload }) => {
        state.loading = false;
        if (payload) {
          if (payload.success === false && payload.error) {
            state.error = payload.error;
            state.success = payload.success;
          } else {
            state.error = "An unknown error occurred";
          }
        } else {
          state.error = "Network error occurred";
        }
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(deleteUser.rejected, (state, { payload }) => {
        state.loading = false;
        if (payload) {
          if (payload.success === false && payload.error) {
            state.error = payload.error;
            state.success = payload.success;
          } else {
            state.error = "An unknown error occurred";
          }
        } else {
          state.error = "Network error occurred";
        }
      })
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.getUser = payload.Data;

      })
      .addCase(getUser.rejected, (state, { payload }) => {
        state.loading = false;
        if (payload) {
          if (payload.success === false && payload.error) {
            state.error = payload.error;
            state.success = payload.success;
          } else {
            state.error = "An unknown error occurred";
          }
        } else {
          state.error = "Network error occurred";
        }
      })
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.getUser = payload.data;
      })
      .addCase(createUser.rejected, (state, { payload }) => {
        state.loading = false;
        if (payload) {
          if (payload.success === false && payload.error) {
            state.error = payload.error;
            state.success = payload.success;
          } else {
            state.error = "An unknown error occurred";
          }
        } else {
          state.error = "Network error occurred";
        }
      });
  },
});

export const { setOnline } = userSlice.actions;
export default userSlice.reducer;
