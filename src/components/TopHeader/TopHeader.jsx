import { Link } from "react-router-dom";

const TopHeader = () => {
  return (
    <div className="fixed w-full bg-black z-40 px-2 py-4 md:px-4">
      <div className="bg-black flex justify-between items-center lg:px-64">
        <div className="text-white flex justify-center gap-2 items-center flex-1">
          <h1 className="text-[11px] max-w-[200px] md:max-w-full md:text-sm">
            Welcome to our store! Enjoy exclusive deals and discounts.
          </h1>
          <Link to="/allProducts">
            <span
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-sm md:text-base font-semibold underline whitespace-nowrap"
            >
              Shop Now
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
