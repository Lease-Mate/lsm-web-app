import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full h-[8%] px-5 mt-5 flex justify-center text-secondary tracking-wide">
      <div className="w-[95%] bg-[#F5F5F5] h-full flex justify-between flex-row text-secondary font-bold p-4 shadow-md ">
        <div className="w-1/5 flex justify-center items-center text-3xl">
          Lease<span className="text-primary bg-secondary">Mate</span>
        </div>
        <div className="w-3/5 flex flex-row justify-center items-center gap-10 text-[15px]">
          <Link href={"#"} className="flex justify-center items-center">
            Offers
          </Link>
          <Link href={"#"} className="flex justify-center items-center">
            Lease
          </Link>
          <Link href={"#"} className="flex justify-center items-center">
            About us
          </Link>
          <Link href={"#"} className="flex justify-center items-center">
            Contact us
          </Link>
        </div>
        <div className="w-1/5 flex justify-center items-center">
          <button className="w-3/5 flex justify-center items-center bg-secondary text-primary py-2 px-10 font text-[15px]">
            Sign in
          </button>
        </div>
      </div>
    </nav>
  );
}
