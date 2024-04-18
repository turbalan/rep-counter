import React from 'react';
import './styles.css';

const CountInput = React.forwardRef((props, ref) => {
  const { message, count, setCount } = props;
  const id = React.useId();
  const fallbackRef = React.useRef();
  const localRef = ref || fallbackRef;

  return (
    <div className='count-input'>
      <label htmlFor={id}>
        {message}{' '}
        <input
          ref={localRef}
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
        <button 
          className='count-input-reset'
          onClick={() => {
            setCount(0);
            localRef?.current?.focus();
          }}
        >
          Reset 
        </button>
        ) : null
      }
    </div>
  )
});

export default CountInput;
