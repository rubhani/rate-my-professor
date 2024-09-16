import React, { useState } from 'react';
import axios from 'axios';

const Summary = () => {
  const [professor, setProfessor] = useState('');
  const [summary, setSummary] = useState('');

  const handleSummarize = async () => {
    try {
      const response = await axios.post('http://localhost:3000/ai/summarize', {
        professor,
      });
      setSummary(response.data);
    } catch (error) {
      console.error('Error fetching summary', error);
    }
  };

  return (
    <div>
      <div>
        <label>Professor</label>
        <input type="text" value={professor} onChange={(e) => setProfessor(e.target.value)} />
      </div>
      <button onClick={handleSummarize}>Get Summary</button>
      {summary && <p>Summary: {summary}</p>}
    </div>
  );
};

export default Summary;
