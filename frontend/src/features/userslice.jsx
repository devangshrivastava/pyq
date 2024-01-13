import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  email: "",
  name: "",
  courses: [],
}

export const userSlice = createSlice({
  name: 'user_info',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.email = action.payload.email
      state.name = action.payload.name
      state.courses = action.payload.courses;
    },
    unsetUserInfo: (state, action) => {
      state.email = action.payload.email
      state.name = action.payload.name
      state.courses = action.payload.courses;
    },
  }
})

export const { setUserInfo, unsetUserInfo } = userSlice.actions

export default userSlice.reducer