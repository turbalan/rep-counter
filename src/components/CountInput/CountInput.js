import React from 'react';
import './styles.css';
import VisuallyHidden from '../VisuallyHidden/VisuallyHidden';
import { X } from 'react-feather';

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
        {count ? (
          <button 
            className={`count-input-reset ${count ? 'fade' : ''}`}
            onClick={() => {
              setCount(0);
              localRef?.current?.focus();
            }}
          >
            <X aria-hidden={true} size={16} />
            <VisuallyHidden>
              Reset input value
            </VisuallyHidden>
          </button>
          ) : null
        }
      </label>
    </div>
  )
});

export default CountInput;
