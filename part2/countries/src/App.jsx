import { useState, useEffect } from "react";
import axios from "axios";
import Content from "./components/Content";

function App() {
  const [value, setValue] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then((response) => {
        setCountries(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const changeHandler = (e) => {
    setValue(e.target.value);
  };

  const handleShow = (e) => {
    setValue(e.name.common);
  };

  return (
    <div>
      <label>Find countries:</label>
      <input type="text" value={value} onChange={changeHandler} />
      <Content
        countries={countries}
        countryFilter={value}
        handleShow={handleShow}
      />
    </div>
  );
}

export default App;
