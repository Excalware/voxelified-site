import userSlice from './slices/user';
import settingsSlice from './slices/settings';
import { configureStore } from '@reduxjs/toolkit';
export default configureStore({
    reducer: {
        user: userSlice,
        settings: settingsSlice,
    }
});