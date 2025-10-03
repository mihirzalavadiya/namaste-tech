import React from 'react';
import Card from './Card';
import projects from '../src/utils/namsteDevQuestions.json';

const NamasteDev = () => {
  return (
    <>
      <div className="namstedev-container">
        <Card projects={projects} isDescription={false} />
      </div>
    </>
  );
};

export default NamasteDev;
