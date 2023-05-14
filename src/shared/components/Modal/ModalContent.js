import React, { useCallback, useRef } from 'react';
import './Modal.css';

const ModalContent = (props) => {
  const {title, subTitle, onSubmit, onCancel} = props;
  const inputRef = useRef('');

  const handleSubmit = useCallback(() => {
    if (!inputRef.current) {
      return;
    } 
    console.log('value input: ', inputRef.current.value);

    onSubmit(inputRef.current.value)
  }, [onSubmit])

  const handleOnEnter = useCallback((event) => {
    if (inputRef.current && event.key === 'Enter') {
      onSubmit(inputRef.current.value)
    }
  }, [onSubmit])

  return (<section className='modal-content-container'>
    <h3>{title}</h3>
    <section className='modal-content-form'>
      <span>{subTitle}:</span>
      <input autoFocus className='modal-input' onKeyUp={handleOnEnter} type='password' ref={inputRef} />
    </section>
    <section className='modal-footer'>
      {/* <button className='secondary' onClick={onCancel}>Cancel</button> */}
      <button className='primary' onClick={handleSubmit}>Submit</button>
    </section>
  </section>)
}

export default React.memo(ModalContent);
