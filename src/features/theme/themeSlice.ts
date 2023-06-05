import { createSlice } from '@reduxjs/toolkit'

type InitialState = {
    currentTheme: string
}
const initialState: InitialState = {
    currentTheme: "system"
}

const themeSlice = createSlice({
    name: 'currentTheme',
    initialState,
    reducers: {
        setDarkTheme: state => {
            state.currentTheme = "dark"
        },
        setLightTheme: (state) => {
            state.currentTheme = "light"
        },
    }
})

export default themeSlice.reducer
export const { setDarkTheme, setLightTheme } = themeSlice.actions