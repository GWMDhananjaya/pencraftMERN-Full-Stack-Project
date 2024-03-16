// Importing createSlice function from Redux Toolkit
import { createSlice } from '@reduxjs/toolkit';

// Initial state for the theme slice
const initialState = {
    theme: 'light', // Default theme is 'light'
};

// Creating a slice of Redux state for managing theme
const themeSlice = createSlice({
    name: 'theme', // Name of the slice
    initialState, // Initial state defined above
    reducers: {
        // Reducer function for toggling the theme
        toggleTheme: (state) => {
            // Toggles the theme from 'light' to 'dark' and vice versa
            state.theme = state.theme === 'light' ? 'dark' : 'light';
        },
    },
});

// Exporting action creators
export const { toggleTheme } = themeSlice.actions;

// Exporting the reducer function
export default themeSlice.reducer;
