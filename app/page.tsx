import SearchCard from "./components/landing-page/search-card";
import Navbar from "./components/navbar";

export default function LandingPage() {
  return (
    <div className="h-screen w-screen bg-landing-page flex flex-col gap-32 items-center">
      <Navbar />
      <div className="w-[85%] h-3/5 flex flex-row justify-between">
        <SearchCard />
        <SearchCard />
      </div>
    </div>
  );
}
