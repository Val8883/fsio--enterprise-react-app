import { useEffect, useState } from "react";
import "./styles.css";

const App = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [catFacts, setCatFacts] = useState("");
  const [showCatFacts, setShowCatFacts] = useState(false);

  useEffect(() => {
    const fetchDogImage = async () => {
      const response = await fetch("https://dog.ceo/api/breeds/image/random");
      const { message } = await response.json();
      setImageUrl(message);
    };
    fetchDogImage();
  }, []);

  useEffect(() => {
    const getRandomCatFact = async () => {
      const response = await fetch(
        "https://catfact.ninja.com/fact"
      );
      const { fact } = await response.json();
      setCatFacts(fact);
    };
    if (showCatFacts) {
      getRandomCatFact();
    }
  }, [showCatFacts]);

  return (
    <div className="App">
      <h1>useEffect Examples</h1>
      {showCatFacts ? (
        <>
          <h2>Cat facts update each time you hit the button</h2>
          <p>{catFacts}</p>
        </>
      ) : (
        <div>
          <h2>Dog pics only update on page refresh</h2>
          <img
            src={imageUrl}
            alt="randomly generated images of doggos"
            style={{ width: "400px" }}
          />
        </div>
      )}
      <button onClick={() => setShowCatFacts((showCatFacts) => !showCatFacts)}>
        Flip the switch!
      </button>
    </div>
  );
};

export default App;
