const { createSlice } = require('@reduxjs/toolkit');

const allBlogs = createSlice({
  name: 'allblogs',
  initialState: {
    blogs: [],
  },
  reducers: {
    setBlogs(state, action) {
      state.blogs = action.payload;
    },
  },
});

export const { setBlogs } = allBlogs.actions;
export default allBlogs.reducer;
