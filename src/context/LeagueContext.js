import { createContext } from "react";

const LeagueContext = createContext();

export const LeagueProvider = function ({ children }) {
  // Get the champion data
  const championName = async (name) => {
    const getData = await fetch(
      `https://ddragon.leagueoflegends.com/cdn/12.16.1/data/en_US/champion/${name}.json`
    );
    const dataFetched = await getData.json();

    const champion = dataFetched.data[name];

    return champion;
  };

  // Get the champion icon image
  const championImage = (name) => {
    const image = `https://ddragon.leagueoflegends.com/cdn/12.16.1/img/champion/${name}.png`;

    return image;
  };

  // Get the background champion image
  const backgroundImage = (name, num = "0") => {
    const image = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${name}_${num}.jpg`;

    return image;
  };

  const allChampions = async (name) => {
    const getData = await fetch(
      `https://ddragon.leagueoflegends.com/cdn/12.17.1/data/en_US/champion.json`
    );

    const dataFetched = await getData.json();

    return dataFetched.data[name];
  };

  allChampions();

  return (
    <LeagueContext.Provider
      value={{
        championName,
        championImage,
        backgroundImage,
        allChampions,
      }}
    >
      {children}
    </LeagueContext.Provider>
  );
};

export default LeagueContext;
