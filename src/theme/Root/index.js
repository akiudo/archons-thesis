import React from 'react';
import FeedbackFab from '@site/src/components/FeedbackFab';

export default function Root({children}) {
  return (
    <>
      {children}
      <FeedbackFab />
    </>
  );
}
