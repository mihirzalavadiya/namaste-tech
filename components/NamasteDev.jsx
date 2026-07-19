import React from 'react';
import SectionListing from './SectionListing';

const NamasteDev = ({ questions = [] }) => (
  <SectionListing sectionKey="namastedev" items={questions} />
);

export default NamasteDev;
