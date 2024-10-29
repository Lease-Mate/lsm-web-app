import OfferSlider from "@/components/landing-page/offer-slider";
import SearchCard from "../components/landing-page/search-card";
import Navbar from "../components/navbar";

export default function LandingPage() {
  return (
    <div className="h-screen w-screen bg-landing-page flex flex-col gap-20 items-center">
      <Navbar />
      <div className="w-[85%] flex flex-row justify-between">
        <SearchCard />
        <div className="w-[50%] flex justify-around items-center flex-row">
          <OfferSlider title="Promowane" />
          <OfferSlider title="Blisko Ciebie" />
        </div>
      </div>
    </div>
  );
}
