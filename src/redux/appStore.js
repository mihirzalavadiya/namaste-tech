import { configureStore } from '@reduxjs/toolkit';
import namasteDevQuestionsReducer from './slice/questionsSlice';
import allBlogsReducer from './slice/blogsSlice';
import leetcodeQuestionsReducer from './slice/leetcodeSlice';

const appStore = configureStore({
  reducer: {
    namasteDevQuestions: namasteDevQuestionsReducer,
    allBlogs: allBlogsReducer,
    leetcodeQuestions: leetcodeQuestionsReducer,
  },
});

export default appStore;
