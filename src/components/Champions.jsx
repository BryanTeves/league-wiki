import { useParams, useNavigate, Link } from "react-router-dom";
import { useContext, useEffect, useState, useRef } from "react";
import {
  FaLongArrowAltRight,
  FaArrowRight,
  FaArrowLeft,
  FaTags,
  FaList,
  FaInfo,
} from "react-icons/fa";

import LeagueContext from "../context/LeagueContext";

import Footer from "./Footer";

function Champions() {
  // Variables from the context
  const { championName, backgroundImage } = useContext(LeagueContext);

  const Navigate = useNavigate();

  // Params (react-router-dom) to get champion info from api
  const params = useParams();

  // State to save the champion info
  const [champion, setChampion] = useState([]);

  // useState to allow the Refs to render info in the DOM. It will be used when some functions be called
  const [effect, setEffect] = useState("");

  // This ref test if there are any champion in the search bar, if no, it will trigger the notfound page
  const pageRef = useRef("");

  // Ref to load the spinner
  const loadRef = useRef();

  // Effect to fetch de api data
  useEffect(() => {
    const fetchData = async () => {
      const LoLChampion = await championName(params.champion);

      // Using the api data in a state
      setChampion(LoLChampion);
      pageRef.current = ".";
    };

    fetchData();
  }, [championName, params.champion]);

  // Timeout to load the page. If the page is not loaded in 3 seconds, the user will be redirecrted to notfound page
  setTimeout(() => {
    if (pageRef.current === "") {
      Navigate("*");
    }
  }, 3000);

  // Refs to render champion data
  const passiveRef = useRef([]);
  const tagRef = useRef("");
  const skinRef = useRef([]);
  const skinNameRef = useRef([]);
  const spellRef0 = useRef([]);
  const spellRef1 = useRef([]);
  const spellRef2 = useRef([]);
  const spellRef3 = useRef([]);
  const infoRef = useRef([]);
  const statsRef = useRef([]);
  const loreRef = useRef("");
  const blurbRef = useRef("");
  const enemyRef = useRef("");
  const allyRef = useRef("");

  // Ref to rendet the footer
  const footerRef = useRef("");

  // Getting the data from de api
  const {
    allytips,
    blurb,
    enemytips,

    info,

    lore,
    name,
    partype,
    passive,
    skins,
    spells,
    stats,
    tags,
    title,
  } = champion;

  // A function that render all the champion info in the DOM, using one useRef for each type of data
  const handleClick = () => {
    // Passive data
    const { name: passiveName, description: passiveDescription } = passive;

    // Info data
    const {
      attack: infoAtack,
      defense: infoDefense,
      difficulty: infoDifficulty,
      magic: infoMagic,
    } = info;

    // Stats data
    const {
      armor: statsArmor,
      armorperlevel: statsArmorPerLevel,
      attackdamage: statsAttackDamage,
      attackdamageperlevel: statsAttackDamagePerLevel,
      attackrange: statsAttackRange,
      attackspeed: statsAttackSpeed,
      attackspeedperlevel: statsAttackSpeedPerLevel,
      crit: statsCrit,
      critperlevel: statsCritPerLevel,
      hp: statsHp,
      hpperlevel: statsHpPerLevel,
      hpregen: statsHpRegen,
      hpregenperlevel: statsHpRegenPerLevel,
      movespeed: statsMoveSpeed,
      mp: statsMp,
      mpperlevel: statsMpPerLevel,
      mpregen: statsMpRegen,
      mpregenperlevel: statsMpRegenPerLevel,
      spellblock: statsSpeelBlock,
      spellblockperlevel: statsSpeelBlockPerLevel,
    } = stats;

    // Putting the info in an array to map over it in the DOM, rendering one infor per <p> tag
    const infoArray = [
      [`Attack: ${infoAtack}`],
      [`Defense: ${infoDefense}`],
      [`Difficulty: ${infoDifficulty}`],
      [`Magic: ${infoMagic}`],
    ];

    // Same as the info, but stats
    const statsArray = [
      [`Armor: ${statsArmor}`],
      [`Armor per level: ${statsArmorPerLevel}`],
      [`Attack damage: ${statsAttackDamage}`],
      [`Attak damage per level: ${statsAttackDamagePerLevel}`],
      [`Attack range: ${statsAttackRange}`],
      [`Attack speed: ${statsAttackSpeed}`],
      [`Attack speed per level: ${statsAttackSpeedPerLevel}`],
      [`Crit: ${statsCrit}`],
      [`Crit per level: ${statsCritPerLevel}`],
      [`HP: ${statsHp}`],
      [`HP per level: ${statsHpPerLevel}`],
      [`HP regen: ${statsHpRegen}`],
      [`HP regen per level: ${statsHpRegenPerLevel}`],
      [`MoveSpeed: ${statsMoveSpeed}`],
      [`MP: ${statsMp}`],
      [`MP per level: ${statsMpPerLevel}`],
      [`MP regen: ${statsMpRegen}`],
      [`MP regen per level: ${statsMpRegenPerLevel}`],
      [`Speel block: ${statsSpeelBlock}`],
      [`Speel block per level: ${statsSpeelBlockPerLevel}`],
    ];

    // Mapping over the spells array to extract the data to put in the dom
    const spellMAP = spells.map((spell, i) => {
      // Fixing some API problems. Some texts was bring with issues
      const spellClean = spell.description
        .replaceAll("<br>", "")
        .replaceAll("<font color='#FFFFFF'>", "")
        .replaceAll("</font>", "")
        .replaceAll(" ,", "");

      // Putting al the data in an array, to render each one in the DOM
      return [
        [`Skill ${i + 1}: ${spell.name}`],

        [`${spellClean}`],

        [
          `In level up gains: ${spell.leveltip.label.map((skill) => {
            // @AbilityResourceName@ Cost is an issue from the api, there's the solution
            if (skill === "@AbilityResourceName@ Cost") {
              return;
            } else {
              return skill.split(",");
            }
          })}`,
        ],

        [`Max level: ${spell.maxrank}`],

        [`Range: ${spell.rangeBurn}`],

        [
          `Resource: ${
            // {{ cost }} and {{ abilityresourcename }} are some issues from the api, that's solve the problem
            spell.resource === `{{ cost }} {{ abilityresourcename }}` ||
            spell.resource === `{{ cost }} Mana`
              ? partype
              : spell.resource
          }`,
        ],

        [
          `CostType: ${
            // {{ abilityresourcename }} is another api issue
            spell.costType === ` {{ abilityresourcename }}`
              ? partype
              : spell.costType
          }`,
        ],

        [`${spell.costType === "No Cost" ? "" : `Cost: ${spell.costBurn}`}`],
      ];
    });

    // Mapping over the skins array
    const skinsImg = skins.map((skin, i) => {
      return (
        <img
          key={i + 50}
          src={backgroundImage(params.champion, skin.num)}
          alt={`Skin ${skin.name}`}
          className="champion_skins-img"
          id={i}
        />
      );
    });

    const skinsName = skins.map((skin) => {
      return [skin.name === "default" ? "Default skin" : skin.name];
    });

    // Mapping over the tags array
    const tagsMAP = tags.map((tags, i) => `${tags} `);

    // Fixin the issues from the passive
    const passiveClean = passiveDescription
      .replaceAll("<br>", "")
      .replaceAll("<magicDamage>", "")
      .replaceAll("</magicDamage>", "")
      .replaceAll("<physicalDamage>", "")
      .replaceAll("</physicalDamage>", "");

    // That's a block of the Refs getting the data, so I can render it in the DOM when the function is clicked
    passiveRef.current = [[`Passive: ${passiveName}`], [`${passiveClean}`]];

    tagRef.current = tagsMAP;

    skinRef.current = skinsImg;
    skinNameRef.current = skinsName;

    spellRef0.current = spellMAP[0];
    spellRef1.current = spellMAP[1];
    spellRef2.current = spellMAP[2];
    spellRef3.current = spellMAP[3];

    infoRef.current = infoArray;

    statsRef.current = statsArray;

    loreRef.current = lore;

    blurbRef.current = blurb;
    enemyRef.current = enemytips;
    allyRef.current = allytips;

    /* This useRef is used to render the footer in same time as the others. doing it in other way will trigger
        a scrollbar before the load, making a weird behavior in the page */
    footerRef.current = <Footer text={"Back to search"} link={"/"} />;

    // Setting the useState to a dot, so we can trigger a HTML change to render all the data from the refs
    setEffect(".");
  };

  /* NOTE: all the data is rendered by an useRef because the api data need to load before get rendered
  in the DOM. To make it easier and practical, I prefered to use the useRef hook to wait for that load.
  Using the handleClcik function to set the useState - effect to a dot instead of a empty string trigger
  all the useRef, and it bring a charm to the page, looking like an instant load from all the champion data*/

  // Two refs to make the carousel. One from the skin and other from the skin name
  const carouselSkin = useRef();
  const carouselName = useRef();

  // This function make the carousel go to the right
  const goRight = () => {
    // Calc to carousel skin
    const rightSkin = (carouselSkin.current.scrollLeft +=
      carouselSkin.current.offsetWidth);

    // Calc to carousel name (he goes to bottom)
    const rightName = (carouselName.current.scrollTop +=
      carouselName.current.offsetHeight);

    /* This const is used to see when the carousel end and bring back to the start. The -300
    is a number to make the total skins sum less than the rightName, so we can use this to trigger the back effect */
    const sum = carouselSkin.current.offsetWidth * skins.length - 300;

    if (sum > rightSkin) {
      return rightSkin, rightName;
    } else {
      return (carouselSkin.current.scrollLeft -= sum + 100)(
        (carouselName.current.scrollTop -= sum + 100)
      );
    }
  };

  // This function make the carousel go to the left
  const goLeft = () => {
    // Calc to carousel skin
    const leftSkin = (carouselSkin.current.scrollLeft -=
      carouselSkin.current.offsetWidth);

    // Calc to carousel name (he goes to top)
    const leftName = (carouselName.current.scrollTop -=
      carouselName.current.offsetHeight);

    /* It's just like the other sum const, but this time to go to the end of the carousel */
    const sum = carouselSkin.current.offsetWidth * skins.length;

    if (carouselSkin.current.scrollLeft === 0) {
      return (
        (carouselSkin.current.scrollLeft += sum),
        (carouselName.current.scrollTop += sum)
      );
    } else {
      return leftSkin, leftName;
    }
  };

  return (
    <>
      <div className="champion_load">{loadRef.current}</div>

      <header
        className={`${effect === "" ? "header_champion" : "none"}`}
        // Rendering the background image from the champion images API
        style={{ backgroundImage: `url(${backgroundImage(params.champion)})` }}
      >
        <div
          className={`${effect === "" ? "header_champion-div" : "default"}`}
          onClick={handleClick}
        >
          <h1 className="header_champion-div--h1">
            {name} <FaLongArrowAltRight className="arrow arrow-right" />
          </h1>
          <p className="header_champion-div--p">{title}</p>
        </div>
      </header>

      <div className="go-back">
        <Link to={"/"} className="go-back-link">
          Back to search
        </Link>
      </div>

      <main className={`${effect === "" ? "hide" : "main_champion"}`}>
        <div className="main_champion_lore_blurb">
          {/* Render champion LORE */}

          <h2>Lore</h2>
          <p>{loreRef.current}</p>

          {/* Render champion BLURB */}

          <h2 className="margin-top-2">Blurb</h2>
          <p>{blurbRef.current}</p>
        </div>

        {/* Render champion INFOS */}
        <div className="main_champion_infos">
          {/* Render champion INFO */}
          <div className="main_champion_infos-info">
            <h2>Champion INFO</h2>
            {infoRef.current.map((info, i) => (
              <p key={i}>{info}</p>
            ))}
            <FaInfo className="info fa" />
          </div>

          {/* Render champion STATS */}
          <div className="main_champion_infos-stats">
            <div></div>
            <h2>Champion STATS</h2>
            {statsRef.current.map((stats, i) => (
              <p key={i}>{stats}</p>
            ))}

            <FaList className="list fa" />
          </div>
          {/* Render champion TAGS */}

          <div className="main_champion_infos-tags">
            <h2>Tags</h2>
            <p>{tagRef.current}</p>

            <FaTags className="tags fa" />
          </div>
        </div>

        <div className="main_champion_skills">
          {/* Render champion PASSIVE */}
          <div className="main_champion_skills-passive">
            <h2>{passiveRef.current[0]}</h2>
            <p>{passiveRef.current[1]}</p>
          </div>

          {/* Render Skills */}
          <div className="main_champion_skills-skill">
            <h2>{spellRef0.current[0]}</h2>
            {spellRef0.current.map((spell = 1, i) => {
              if (spell === spellRef0.current[0]) {
                return "";
              } else {
                return <p key={i}>{spell}</p>;
              }
            })}
          </div>

          <div className="main_champion_skills-skill">
            <h2>{spellRef1.current[0]}</h2>
            {spellRef1.current.map((spell = 1, i) => {
              if (spell === spellRef1.current[0]) {
                return "";
              } else {
                return <p key={i}>{spell}</p>;
              }
            })}
          </div>

          <div className="main_champion_skills-skill">
            <h2>{spellRef2.current[0]}</h2>
            {spellRef2.current.map((spell = 1, i) => {
              if (spell === spellRef2.current[0]) {
                return "";
              } else {
                return <p key={i}>{spell}</p>;
              }
            })}
          </div>

          <div className="main_champion_skills-skill">
            <h2>{spellRef3.current[0]}</h2>
            {spellRef3.current.map((spell = 1, i) => {
              if (spell === spellRef3.current[0]) {
                return "";
              } else {
                return <p key={i}>{spell}</p>;
              }
            })}
          </div>
        </div>

        <div className="main_champion_skins">
          {/* Render Skins */}
          <h2 className="center">Skins</h2>
          <div
            ref={carouselName}
            className={effect === "" ? "none" : "main_champion_skins-name"}
          >
            {skinNameRef.current.map((skin, i) => (
              <h2 key={i}>{skin}</h2>
            ))}
          </div>
          <div className="main_champion_skins-render" ref={carouselSkin}>
            {skinRef.current}

            <FaArrowLeft onClick={goLeft} className="carousel-btn  btn-left" />

            <FaArrowRight
              onClick={goRight}
              className="carousel-btn btn-right"
            />
          </div>
        </div>

        <div className="main_champion_tips">
          {/* Render champion ENEMY TIPS */}
          <h2>Enemy Tips</h2>
          <p>{enemyRef.current}</p>

          {/* Render champion ALLY TIPS */}
          <h2>Ally Tips</h2>
          <p>{allyRef.current}</p>
        </div>
      </main>

      {footerRef.current}
    </>
  );
}

export default Champions;
