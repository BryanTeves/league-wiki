import Header from "../components/Header";
import Footer from "../components/Footer";
import MainContent from "../components/MainContent";

function MainPage() {
  return (
    <main>
      <Header />
      <MainContent />
      <Footer text={"How to use"} link={"/how-to-use"} />
    </main>
  );
}

export default MainPage;
