const { createSlice } = require('@reduxjs/toolkit');

const allNamasteDevQuestions = createSlice({
  name: 'namasteDevQuestions',
  initialState: {
    questions: [],
  },
  reducers: {
    setQuestions(state, action) {
      state.questions = action.payload;
    },
  },
});

export const { setQuestions } = allNamasteDevQuestions.actions;
export default allNamasteDevQuestions.reducer;
