import React from 'react';

function CountInput({ message, count, setCount, reference }) {
  const id = React.useId();

  return (
    <div>
      <label htmlFor={id}>
        {message}{' '}
        <input
          ref={reference}
          id={id}
          type="number"
          min={1}
          value={count}
          onChange={(event) => {
            setCount(event.target.value);
          }}
        />
      </label>
      {count ? (
        <button onClick={() => {
          setCount(0);
          reference.current.focus();
        }}>
          Reset 
        </button>
        ) : null
      }
    </div>
  )
}

export default CountInput;
