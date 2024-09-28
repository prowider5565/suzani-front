/* eslint-disable react/prop-types */
import { useState } from "react";
import { createPortal } from "react-dom";

export default function Portal({
  children,
  ModalContent,
  classNameBtn,
  state,
  text,
  type,
}) {
  const [showModal, setShowModal] = useState(false);

  const handleButtonClick = () => {
    setShowModal(true);
  };
  return (
    <>
      {children ? (
        <div onClick={handleButtonClick}>{children}</div>
      ) : (
        <button
          onClick={handleButtonClick}
          className={`${classNameBtn}`}
        >{text}</button>
      )}

      {showModal&&
        createPortal(
          <ModalContent
            state={state}
            onClose={() => {
              setShowModal(false);
            }}
            type={type}
          />,
          document.body
        )}
    </>
  );
}
