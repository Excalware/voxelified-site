import { createSlice } from '@reduxjs/toolkit';

export const settingsSlice = createSlice({
    name: 'settings',
    initialState: {
        theme: 'default'
    },
    reducers: {
        set: (state, { payload: [key, value] }) => {
            state[key] = value;
        },
        saveSettings: state => {
            
        }
    }
});

export const { set, saveSettings } = settingsSlice.actions;
export default settingsSlice.reducer;