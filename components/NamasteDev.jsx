import React, { useEffect, useState } from 'react';
import Card from './Card';
import { getQuestions } from '../lib/db';
import { useDispatch, useSelector } from 'react-redux';
import { setQuestions } from '@/redux/slice/questionsSlice';
import Loader from './Loader';

const NamasteDev = () => {
  const dispatch = useDispatch();
  const [questionsData, setQuestionsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const questions = useSelector((state) => state.namasteDevQuestions.questions);
  useEffect(() => {
    if (questions.length > 0) {
      setQuestionsData(questions);
      setLoading(false);
      return;
    }
    getQuestions().then((data) => {
      dispatch(setQuestions(data));
      setQuestionsData(data);
      setLoading(false);
    });
  }, [questions]);

  if (loading) return <Loader fullScreen={true} size="medium" />;

  return (
    <>
      <div className="namstedev-container">
        <Card projects={questionsData} isDescription={false} />
      </div>
    </>
  );
};

export default NamasteDev;
