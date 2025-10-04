import React, { useEffect, useState } from 'react';
import Card from './Card';
import { getQuestions } from '../lib/db';
import { useDispatch, useSelector } from 'react-redux';
import { setQuestions } from '@/redux/slice/questionsSlice';

const NamasteDev = () => {
  const dispatch = useDispatch();
  const [questionsData, setQuestionsData] = useState([]);
  const questions = useSelector((state) => state.namasteDevQuestions.questions);
  useEffect(() => {
    if (questions.length > 0) {
      setQuestionsData(questions);
      return;
    }
    getQuestions().then((data) => {
      dispatch(setQuestions(data));
      setQuestionsData(data);
    });
  }, [questions]);
  return (
    <>
      <div className="namstedev-container">
        <Card projects={questionsData} isDescription={false} />
      </div>
    </>
  );
};

export default NamasteDev;
