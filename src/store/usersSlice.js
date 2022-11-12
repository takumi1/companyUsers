import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

export const fetchUsers = createAsyncThunk(
    'fetchUsers',
    async function (_, {rejectWithValue}) {
        try {
            const response = await fetch('https://reqres.in/api/users/');
            if (!response.ok) {
                throw new Error('Server Error');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
);

export const fetchMoreUsers = createAsyncThunk(
    'fetchUsers',
    async function (_, {rejectWithValue}) {
        try {
            const response = await fetch(`https://reqres.in/api/users?page=2`);
            if (!response.ok) {
                throw new Error('Server Error');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
);

export const fetchTheUser = createAsyncThunk(
    'fetchTheUser',
    async function (id, {rejectWithValue}) {
        try {
            const response = await fetch(`https://reqres.in/api/users/${id}`);
            if (!response.ok) {
                throw new Error('Server Error');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
);

const setError = (state, action) => {
    state.status = 'rejected';
    state.error = action.payload;
}

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        status: null,
        error: null,
    },
    reducers: {},
    extraReducers: {
        [fetchUsers.pending]: (state) => {
            state.status = 'loading';
            state.error = null;
        },
        [fetchUsers.fulfilled]: (state, action) => {
            state.status = 'resolved';
            state.users = action.payload;
        },
        [fetchUsers.rejected]: setError,

        [fetchMoreUsers.pending]: (state) => {
            state.status = 'loading';
            state.error = null;
        },
        [fetchMoreUsers.fulfilled]: (state, action) => {
            state.status = 'resolved';
            state.users = action.payload;
        },
        [fetchMoreUsers.rejected]: setError,

        [fetchTheUser.pending]: (state) => {
            state.status = 'loading';
            state.error = null;
        },
        [fetchTheUser.fulfilled]: (state, action) => {
            state.status = 'resolved';
            state.users = action.payload;
        },
        [fetchTheUser.rejected]: setError,
    },
});


export default usersSlice.reducer;