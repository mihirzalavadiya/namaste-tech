import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLeetCodeQuestions } from '../lib/db';
import { setQuestions } from '@/redux/slice/leetcodeSlice';
import Loader from './Loader';
import Card from './Card';

const LeetCode = () => {
  const dispatch = useDispatch();
  const [questionsData, setQuestionsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const questions = useSelector((state) => state.leetcodeQuestions.questions);
  useEffect(() => {
    if (questions.length > 0) {
      setQuestionsData(questions);
      setLoading(false);
      return;
    }
    getLeetCodeQuestions().then((data) => {
      dispatch(setQuestions(data));
      setQuestionsData(data);
      setLoading(false);
    });
  }, [questions]);

  if (loading) return <Loader fullScreen={true} size="medium" />;

  return (
    <>
      <div className="namstedev-container">
        <Card
          projects={questionsData}
          isDescription={false}
          fixedColor="purple"
        />
      </div>
    </>
  );
};

export default LeetCode;
