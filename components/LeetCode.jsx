import React from 'react';
import SectionListing from './SectionListing';

const LeetCode = ({ questions = [] }) => (
  <SectionListing sectionKey="leetcode" items={questions} />
);

export default LeetCode;
