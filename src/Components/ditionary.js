import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

const Dictionary = () => {
  const [inputValue, setInputValue] = useState("");
  const [definitions, setDefinitions] = useState([]);
  const [error, setError] = useState(null);
  let userref=useRef(null)

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${inputValue}`
      );
      setDefinitions(response.data[0]?.meanings[0]?.definitions || []);
      console.log(definitions);
      setError(null);
    } catch (err) {
      setError(err.message || "An error occurred while fetching data.");
    }
  };

  useEffect(() => {
    if (inputValue) {
      fetchData();
    }
  }, [inputValue]);

  const handleInputChange = (e) => {
    e.preventDefault();
    let userInput=userref.current.value
    if (userInput !== null) {
      setInputValue(userInput);
    }
  };

  return (
    <div>
      <h1>Dictionary</h1>
      <form>
        <input
          type="text"
          placeholder="search for a word"
          ref={userref}
        ></input>
        <button onClick={handleInputChange} >search</button>
      </form>
      {error && <p>Error is {error}</p>}
      <ul>
        {definitions.map((definition, index) => (
          <li key={index}>{definition.definition}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dictionary;





