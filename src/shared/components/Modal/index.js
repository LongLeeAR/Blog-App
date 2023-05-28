
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const modalContainerEl = document.getElementById('modal-root')

const ModalContainer = ({children}) => {

  return (<section className='modal-container'>
    <section className='modal-content'>
      {children}
    </section>
  </section>)
}

const Modal = (props) => {
  const {children, isOpen} = props;

  if (!isOpen) {
    return <></>;
  }

  return ReactDOM.createPortal(<ModalContainer>{children}</ModalContainer>, modalContainerEl)
}



export default React.memo(Modal);
