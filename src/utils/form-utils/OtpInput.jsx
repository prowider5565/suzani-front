import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const OtpInput = ({ value, onChange, numInputs, separator }) => {
  const [otp, setOtp] = useState(value.split('').concat(Array(numInputs).fill('')).slice(0, numInputs));
  const inputRefs = useRef([]);

  useEffect(() => {
    setOtp(value.split('').concat(Array(numInputs).fill('')).slice(0, numInputs));
  }, [value, numInputs]);

  const handleChange = (element, index) => {
    const val = element.value;
    if (isNaN(val) && val !== '') return;

    const newOtp = [...otp];
    newOtp[index] = val;

    setOtp(newOtp);
    onChange(newOtp.join(''));

    if (val !== '' && index < numInputs - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && otp[index] === '') {
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  return (
    <div className='flex items-center'>
      {otp.map((data, index) => (
        <React.Fragment key={index}>
          <input
            ref={(el) => inputRefs.current[index] = el}
            type="text"
            maxLength="1"
            value={data}
            onChange={(e) => handleChange(e.target, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onFocus={(e) => e.target.select()}
            style={{ textAlign: 'center', margin: '0.5rem' }}
          />
          {index < numInputs - 1 && separator}
        </React.Fragment>
      ))}
    </div>
  );
};

OtpInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  numInputs: PropTypes.number.isRequired,
  separator: PropTypes.node,
};

export default OtpInput;
