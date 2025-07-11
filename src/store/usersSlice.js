import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  // usersList: [],
  isloading: false,
  error: "",
  isLoggedIn: false,
  loggedInUser: {},
};

const USER_URL = "http://localhost:4000/users";

export const addUserDataToServer = createAsyncThunk(
  "users/addUserDataToServer",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch(USER_URL);
      if (response.ok) {
        const users = await response.json();
        if (!users) {
          return rejectWithValue({ error: "Users not found" });
        }
        if (users) {
          const user = users.filter((user) => {
            if (user.email == data.email && user.password == data.password) {
              // console.log(user);
              user = data;
              return user;
            }
          });
          if (user[0] !== undefined) {
            // console.log(user[0]);
            return user[0];
          }
          if (user[0] == undefined) {
            try {
              const res = await fetch(USER_URL, {
                method: "POST",
                body: JSON.stringify(data),
              });
              if (res.ok) {
                const user = await res.json();
                // console.log(user);
                return user;
              }
            } catch (error) {
              // console.log(error.message);
              return rejectWithValue({ error: error.message });
            }
          }
        }
      }
    } catch (error) {
      // console.log(error.message);
      return rejectWithValue({ error: error.message });
    }
  }
);

export const updateUserInServer = createAsyncThunk(
  "users/updateUserInServer",
  async ({ user, id }, { rejectWithValue }) => {
    // console.log(user, id);
    try {
      const res = await fetch(`${USER_URL}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (res.ok) {
        const user = await res.json();
        // console.log(user);
        return user;
      }
    } catch (error) {
      // console.log(error.message);
      return rejectWithValue({ error: error.message });
    }
  }
);

export const deleteUserInServer = createAsyncThunk(
  "users/deleteUserInServer",
  async (id, { rejectWithValue }) => {
    // console.log(user, id);
    try {
      const res = await fetch(`${USER_URL}/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        return;
      }
    } catch (error) {
      // console.log(error.message);
      return rejectWithValue({ error: error.message });
    }
  }
);

const usersSlice = createSlice({
  name: "Users",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(addUserDataToServer.pending, (state) => {
        state.isloading = true;
      })
      .addCase(addUserDataToServer.fulfilled, (state, action) => {
        // console.log(action.payload);
        state.isloading = false;
        state.loggedInUser = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(addUserDataToServer.rejected, (state, action) => {
        state.isloading = false;
        state.error = action.payload.error;
        state.isLoggedIn = false;
      })
      .addCase(updateUserInServer.pending, (state) => {
        state.isloading = true;
      })
      .addCase(updateUserInServer.fulfilled, (state, action) => {
        // console.log(action.payload);
        state.isloading = false;
        state.loggedInUser = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(updateUserInServer.rejected, (state, action) => {
        state.isloading = false;
        state.error = action.payload.error;
        state.isLoggedIn = false;
      })
      .addCase(deleteUserInServer.pending, (state) => {
        state.isloading = true;
      })
      .addCase(deleteUserInServer.fulfilled, (state, action) => {
        // console.log(action.payload);
        state.isloading = false;
        state.isLoggedIn = false;
      })
      .addCase(deleteUserInServer.rejected, (state, action) => {
        state.isloading = false;
        state.error = action.payload.error;
        state.isLoggedIn = true;
      });
  },
});

export default usersSlice.reducer;
