import Footer from "../components/Footer";

import howToUse1 from "../assets/images/howToUse/howToUse1.jpg";
import howToUse2 from "../assets/images/howToUse/howToUse2.jpg";
import howToUse3 from "../assets/images/howToUse/howToUse3.jpg";

function HowToUse() {
  return (
    <>
      <main className="how_to_use">
        <div className="how_to_use-img">
          <h1>Search for any champion and click on the champion icon</h1>

          <img src={howToUse1} alt="" className="how_to_use-img-1" />
        </div>

        <div className="how_to_use-img">
          <h1>Click on the champion name</h1>
          <img src={howToUse2} alt="" className="how_to_use-img-2" />
        </div>

        <div className="how_to_use-img">
          <h1>Enjoy yourself</h1>
          <img src={howToUse3} alt="" className="how_to_use-img-3" />
        </div>

        {/* img */}
      </main>
      <Footer text={"Back to home"} link={"/"} />
    </>
  );
}

export default HowToUse;
