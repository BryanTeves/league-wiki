import { useState, useContext, useRef } from "react";
import LeagueContext from "../context/LeagueContext";
import { useNavigate } from "react-router-dom";

import Spinner from "../assets/images/spinner/Loading_icon.gif";

function MainContent() {
  // React-router DOM hook
  const navigate = useNavigate();

  // Functions from the context
  const { championImage, allChampions } = useContext(LeagueContext);

  // State to take the user champion input
  const [search, setSearch] = useState("");

  // State with the champion image
  const [leagueChampion, setLeagueChampion] = useState([]);

  // State to set the spinner load
  const [load, setLoad] = useState(false);

  // Ref to see with the input match with any league champion
  const championRef = useRef(null);

  // Ref to load the spinner on the page
  const loadRef = useRef();

  // Function to take the input from the user
  const handleChange = (e) => {
    // Cleaning the value from any empty space
    const value = e.target.value.trim();

    // Turning the the value into two strings in loweCase and cleaning any '
    const valueReformed = value.toLowerCase().replace("'", "").split(" ");

    const upperCaseValue = valueReformed.map((letter) => {
      // A return to not propagate any error
      if (e.target.value === "") return;
      // Putting the first letter from each string in upperCase
      else return letter.replace(letter[0], letter[0].toUpperCase());
    });

    // Setting the two string in one
    let finalValue = String(upperCaseValue).replace(",", "");

    /* These two champions are the only who are formatted in a different way in the API (I don't know why),
     so it's necessary to have these two test only for them */
    if (finalValue === "Kogmaw") {
      finalValue = "KogMaw";
      return setSearch(finalValue);
    }

    if (finalValue === "Reksai") {
      finalValue = "RekSai";
      return setSearch(finalValue);
    }

    // Search in api from the champion
    setSearch(finalValue);

    // The string is formated this way because it's the way from the API
  };

  // Function to submit the input value to the api
  const handleSubmit = async (e) => {
    e.preventDefault();

    // This will set the spinner to work
    setLoad(true);

    const championTest = await allChampions(search);

    // Test if the search result match any league champion
    if (championTest === undefined) {
      championRef.current =
        "The champion you have searched do not exist. Try again!";

      setLeagueChampion([]);
      // Make the spinner stop
      setLoad(false);
    } else {
      championRef.current = "";
      const img = await championImage(search);
      setLeagueChampion(img);
      // Make the spinner stop
      setLoad(false);
    }
  };

  // Go to the champion page
  const handleClick = () => {
    navigate(`/champion/${search}`);
  };

  // Setting the load spinner
  if (load === true) {
    loadRef.current = (
      <img src={Spinner} className="main_refs-spinner" alt="Loading" />
    );
  } else {
    loadRef.current = "";
  }

  return (
    <main className="main_content">
      <form className="main_content-form" onSubmit={handleSubmit}>
        <label htmlFor="search" className="main_content-label">
          Search for any league champion
        </label>
        <input
          type="text"
          name="search"
          id="search"
          className="main_content-input"
          onChange={handleChange}
        />
        <button type="submit" className="main_content-btn btn">
          Search
        </button>
      </form>

      <div className="main_content-results">
        <img
          src={leagueChampion}
          alt={leagueChampion}
          className={
            championRef.current === null ? "none" : "main_content-results-img"
          }
          onClick={handleClick}
        />
      </div>
      <div className="main_refs">
        <h2 className="main_refs-h2">{championRef.current}</h2>
        {loadRef.current}
      </div>
    </main>
  );
}

export default MainContent;
