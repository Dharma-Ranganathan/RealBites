import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  bitesList: [],
  singleBite: {},
  hashBites: [],
  myBites: [],
  isloading: false,
  error: null,
};

const BITES_URL = "http://localhost:4000/bites";
const USERS_URL = "http://localhost:4000/users";

// Get All Bites

export const getBitesFromServer = createAsyncThunk(
  "Bites/getBitesFromServer",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(BITES_URL);
      if (response.ok) {
        const data = await response.json();
        // console.log(await mapper(data));

        return await mapper(data);
      }
    } catch (error) {
      //   console.log(error.message);
      return rejectWithValue({ error: "No Bites Found" });
    }
  }
);

// Get Single Bite

export const getSingleBiteFromServer = createAsyncThunk(
  "Bites/getSingleBiteFromServer",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BITES_URL}/${id}`);
      if (response.ok) {
        const data = await response.json();

        const bite = await singleMap(data);

        return bite[0];
      }
    } catch (error) {
      // console.log(error.message);
      return rejectWithValue({ error: "No Bite Found" });
    }
  }
);

// Get Query Hastag Bites

export const getQueryHashtag = createAsyncThunk(
  "Bites/getQueryHashtag",
  async (hashtag, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BITES_URL}`);
      if (response.ok) {
        const bites = await response.json();
        if (hashtag == "all") {
          return mapper(bites);
        }
        const queriedHashBites = bites.filter(
          (bite) => bite.hashtags[0] == hashtag
        );
        // console.log(queriedHashBites);
        return await mapper(queriedHashBites);
        // return queriedHashBites;
      }
    } catch (error) {
      // console.log(error.message);
      return rejectWithValue({ error: "Cannot fetch query" });
    }
  }
);

// Patch bites in server

export const updateBiteInServer = createAsyncThunk(
  "bites/updateBiteInServer",
  async (data, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BITES_URL}/${data.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        const data = await res.json();
        const bite = await singleMap(data);
        return bite[0];
      }
    } catch (error) {
      console.log(error.message);
      return rejectWithValue({ error: error.message });
    }
  }
);

// Delete bite in server

export const deleteBiteInServer = createAsyncThunk(
  "bites/deleteBiteInServer",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BITES_URL}/${id}`, { method: "DELETE" });

      if (res.ok) {
        return;
      }
    } catch (error) {
      console.log(error.message);
      return rejectWithValue({ error: error.message });
    }
  }
);

// Get Logged In User Bites

export const getMyBitesFromServer = createAsyncThunk(
  "bites/getMyBitesFromServer",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(BITES_URL);
      if (res.ok) {
        let users;
        users = await res.json();

        users = users.filter((bite) => bite.userId == id);

        return await mapper(users);
      }
    } catch (error) {
      console.log(error.message);
      return rejectWithValue({ error: "Cannot fetch My Bites" });
    }
  }
);

// Add Bites to Server

export const addBiteToServer = createAsyncThunk(
  "bites/addBiteToServer",
  async (data, { rejectWithValue }) => {
    // console.log(data);
    try {
      const res = await fetch(BITES_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        return;
      }
    } catch (error) {
      console.log(error.message);
      return rejectWithValue({ error: "Cannot add bite to server" });
    }
  }
);

// search functionality for bites

export const getSearchBitesFromServer = createAsyncThunk(
  "bites/getSearchBitesFromServer",
  async (query, { rejectWithValue }) => {
    try {
      const res = await fetch(BITES_URL);
      if (res.ok) {
        let bites = await res.json();
        bites = await mapper(bites);
        if (query.trim() == "") {
          return bites;
          // console.log("empty");
        }
        if (query) {
          bites = bites.filter(
            (bite) =>
              bite.title.toLowerCase().includes(query.toLowerCase()) ||
              bite.content.toLowerCase().includes(query.toLowerCase())
          );
          // console.log(bites);
          return bites;
        }
      }
    } catch (error) {
      console.log(error.message);
      return rejectWithValue({ error: error.message });
    }
  }
);

//helper function to map blog and user
const mapper = async (bitesData) => {
  try {
    const response = await fetch(USERS_URL);
    if (response.ok) {
      const userData = await response.json();
      const populated = [];

      bitesData.map((bite) => {
        userData.map((user) => {
          if (bite.userId == user.id) {
            return populated.push({ ...bite, user });
          }
        });
      });
      // console.log(populated);
      return populated;
    }
  } catch (error) {
    // console.log(error.message);
    return { error: "Error while populating" };
  }
};

const singleMap = async (bite) => {
  try {
    const response = await fetch(USERS_URL);
    if (response.ok) {
      const userData = await response.json();
      const populated = [];

      userData.map((user) => {
        if (bite.userId == user.id) {
          return populated.push({ ...bite, user });
        }
      });

      return populated;
    }
  } catch (error) {
    // console.log(error.message);
    return { error: "Error while populating" };
  }
};

const bitesSlice = createSlice({
  name: "TodayBites",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getBitesFromServer.pending, (state) => {
        state.isloading = true;
      })
      .addCase(getBitesFromServer.fulfilled, (state, action) => {
        state.isloading = false;
        state.bitesList = action.payload;
      })
      .addCase(getBitesFromServer.rejected, (state, action) => {
        state.isloading = false;
        state.error = action.payload.error;
      })
      .addCase(getSingleBiteFromServer.pending, (state) => {
        state.isloading = true;
      })
      .addCase(getSingleBiteFromServer.fulfilled, (state, action) => {
        state.isloading = false;
        state.singleBite = action.payload;
      })
      .addCase(getSingleBiteFromServer.rejected, (state, action) => {
        state.isloading = false;
        state.error = action.payload.error;
      })
      .addCase(getQueryHashtag.pending, (state) => {
        state.isloading = true;
      })
      .addCase(getQueryHashtag.fulfilled, (state, action) => {
        state.isloading = false;
        state.hashBites = action.payload;
      })
      .addCase(getQueryHashtag.rejected, (state, action) => {
        state.isloading = false;
        state.error = action.payload.error;
      })
      .addCase(getMyBitesFromServer.pending, (state) => {
        state.isloading = true;
      })
      .addCase(getMyBitesFromServer.fulfilled, (state, action) => {
        state.isloading = false;
        state.myBites = action.payload;
      })
      .addCase(getMyBitesFromServer.rejected, (state, action) => {
        state.isloading = false;
        state.error = action.payload.error;
      })
      .addCase(addBiteToServer.pending, (state) => {
        state.isloading = true;
      })
      .addCase(addBiteToServer.fulfilled, (state, action) => {
        state.isloading = false;
      })
      .addCase(addBiteToServer.rejected, (state, action) => {
        state.isloading = false;
        state.error = action.payload.error;
      })
      .addCase(updateBiteInServer.pending, (state) => {
        state.isloading = true;
      })
      .addCase(updateBiteInServer.fulfilled, (state, action) => {
        state.isloading = false;
        state.singleBite = action.payload;
      })
      .addCase(updateBiteInServer.rejected, (state, action) => {
        state.isloading = false;
        state.error = action.payload.error;
      })
      .addCase(deleteBiteInServer.pending, (state) => {
        state.isloading = true;
      })
      .addCase(deleteBiteInServer.fulfilled, (state, action) => {
        state.isloading = false;
      })
      .addCase(deleteBiteInServer.rejected, (state, action) => {
        state.isloading = false;
        state.error = action.payload.error;
      })
      .addCase(getSearchBitesFromServer.pending, (state) => {
        state.isloading = true;
      })
      .addCase(getSearchBitesFromServer.fulfilled, (state, action) => {
        state.isloading = false;
        state.bitesList = action.payload;
      })
      .addCase(getSearchBitesFromServer.rejected, (state, action) => {
        state.isloading = false;
        state.error = action.payload.error;
      });
  },
});

export default bitesSlice.reducer;
export const { handleSearchQuery } = bitesSlice.actions;
