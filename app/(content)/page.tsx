import OfferSlider from "@/components/landing-page/offer-slider";
import SearchCard from "../../components/landing-page/search-card";
import { getOffersByParameters } from "@/lib/actions/offer-actions";

export default async function LandingPage() {
  const lastThreeOffers = await getOffersByParameters({ size: 3, page: 1 });

  return (
    <div className="w-[85%] flex flex-row justify-between">
      <SearchCard />
      <div className="w-[50%] flex justify-between items-center flex-row">
        <OfferSlider title="Najnowsze ogłoszenia" offers={lastThreeOffers} />
        <OfferSlider title="Najnowsze ogłoszenia" offers={lastThreeOffers} />
      </div>
    </div>
  );
}
