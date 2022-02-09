import { useState, useRef } from "react";
import useOnClickOutside from "./useOnClickOutside";
import "./styles.css";

const App = () => {
  // define ref to target modal when its rendered
  const modalRef = useRef();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Call hook passing in the ref and a function to call on outside click
  useOnClickOutside(modalRef, () => setIsModalOpen(false));

  return (
    <div className="App">
      <h1>Custom Hooks - useOnClickOutside</h1>
      <h2>
        This hook will close a modal whenever anywhere outside the modal body is
        clicked in the browser.
      </h2>
      <button onClick={() => setIsModalOpen(true)}>Open modal</button>
      {isModalOpen ? (
        <div ref={modalRef} className="modal-container">
          <h4>Hi, I'm a modal. Click outside of me and I'll close.</h4>
        </div>
      ) : null}
    </div>
  );
};

export default App;
