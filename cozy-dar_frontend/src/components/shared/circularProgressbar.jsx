import React from 'react';
import {
  CircularProgressbarWithChildren,
  buildStyles
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useEffect, useState } from 'react';

const CircularPB = ({targetValue=60,text}) => {
    const [value, setValue] = useState(0);

    // Animate the progress value
    useEffect(() => {
      const animation = setTimeout(() => {
        setValue(targetValue);
      }, 0); // slight delay for smoother effect
  
      return () => clearTimeout(animation);
    }, [targetValue]);
  return (
    <div style={{ width: '7vw' }}>
      <CircularProgressbarWithChildren
        value={value}
        strokeWidth={4}
        styles={buildStyles({
          strokeLinecap: 'round',
          pathColor: `url(#gradient)`,
          trailColor: '#eee',
          pathTransitionDuration: 1,
        })}
      >
        <div style={{ fontSize: 18, fontWeight: 'bold' }}>
          {value}%
        </div>
        <div style={{ fontSize: 12, color: '#000', fontWeight:'500' }}>
          {text}
        </div>
        <svg style={{ height: 0 }}>
          <defs>
            <linearGradient id="gradient" gradientTransform="rotate(90)">
              <stop offset="0%" stopColor="#00c6ff" />
              <stop offset="100%" stopColor="#0072ff" />
            </linearGradient>
          </defs>
        </svg>
      </CircularProgressbarWithChildren>
    </div>
  );
};

export default CircularPB;