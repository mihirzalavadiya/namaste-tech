import { configureStore } from '@reduxjs/toolkit';
import namasteDevQuestionsReducer from './slice/questionsSlice';
import allBlogsReducer from './slice/blogsSlice';

const appStore = configureStore({
  reducer: {
    namasteDevQuestions: namasteDevQuestionsReducer,
    allBlogs: allBlogsReducer,
  },
});

export default appStore;
