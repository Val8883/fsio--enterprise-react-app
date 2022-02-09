import { useEffect } from "react";

const useOnClickOutside = (ref, handlerFunction) => {
  useEffect(
    () => {
      const listener = (event) => {
        // Do nothing if clicking modal ref's element or descendent elements
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }
        // otherwise fire the function passed in from the component
        handlerFunction(event);
      };

      /* add event listeners to DOM to detect clicks with mice and fingers
      these will trigger the listener function above */
      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);

      /* this is a cleanup function for useEffect similar to the 
      componentWillUnmount lifecyle method */
      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    },
    // Add ref and handler to effect dependencies
    [ref, handlerFunction]
  );
};

export default useOnClickOutside;
