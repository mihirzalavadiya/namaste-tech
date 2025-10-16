const { createSlice } = require('@reduxjs/toolkit');

const allLeetCodeQuestions = createSlice({
  name: 'leetcodeQuestions',
  initialState: {
    questions: [],
  },
  reducers: {
    setQuestions(state, action) {
      state.questions = action.payload;
    },
  },
});

export const { setQuestions } = allLeetCodeQuestions.actions;
export default allLeetCodeQuestions.reducer;
