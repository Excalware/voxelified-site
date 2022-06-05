import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        profile: {},
        session: {
            user: {}
        }
    },
    reducers: {
        setProfile: (state, { payload }) => {
            state.profile = payload;
        },
        setSession: (state, { payload }) => {
            state.session = payload;
        }
    }
});

export const { setProfile, setSession } = userSlice.actions;
export default userSlice.reducer;