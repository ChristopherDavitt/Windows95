import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ClockWrapper = styled.div`
  font-size: 12px;
  color: #000;
  background-color: #C0C0C0;
  padding: 2px 5px;
  border: 1px solid #FFF;
  border-right-color: #848484;
  border-bottom-color: #848484;
`;

const Clock: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <ClockWrapper>
      {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
    </ClockWrapper>
  );
};

export default Clock;