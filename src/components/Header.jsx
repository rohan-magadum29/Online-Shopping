import { Menu, Search, X } from "lucide-react";
import { useState } from "react";
import { actionButtons, headerItems } from "../constants/header.constants";
import CategoriesMenu from "./CategoriesMenu";

const Header = ({ categories, setCategory, category }) => {
  const [search, setSearch] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="flex col-span-full bg-primary text-white w-full justify-center lg:justify-between items-center text-xs py-1.5 px-12">
        <span>Free Shipping on all orders over 99$</span>
        <div className="hidden lg:flex gap-4">
          {headerItems.map((item) => {
            return <span key={item}>{item}</span>;
          })}
        </div>
      </div>
      <header className="grid grid-cols-1 lg:grid-cols-4 gap-4 pt-4 lg:pt-8 pb-2 px-4 lg:px-12 place-items-center items-center">
        <div className="w-full flex items-center justify-between">
          <div className="col-span-1 text-base md:text-lg lg:text-xl flex gap-0.5 items-center">
            <img
              src="/Logo.png"
              alt="Logo"
              className="h-8 md:h-10 lg:h-12 w-full object-fit"
            />
            <span className="text-secondary font-bold">ONLINE</span>
            <span className="text-primary font-semibold ml-0.5">SHOPPING</span>
          </div>
          <button
            onClick={() => {
              setIsMenuOpen((prev) => !prev);
            }}
          >
            <Menu size={20} className="lg:hidden" />
          </button>
        </div>

        <form
          onSubmit={handleSearch}
          role="search"
          className="col-span-2 flex h-10 md:h-12 w-full items-center rounded-xl bg-[#f0f0f0] px-4 "
        >
          <input
            id="header-search"
            placeholder="Search here.."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-full w-full min-w-0 bg-transparent text-sm lg:text-base outline-none placeholder:text-gray-500"
          />

          <div className="flex gap-1.5 relative">
            {!!search && search.length && (
              <button
                onClick={() => {
                  setSearch("");
                }}
                type="button"
                aria-label="Clear Search"
                className="absolute right-8 flex items-center justify-center rounded-lg text-gray-500 cursor-pointer"
              >
                <X size={20} />
              </button>
            )}
            <button
              type="submit"
              aria-label="Submit search"
              className="flex items-center justify-center rounded-lg text-gray-500 cursor-pointer"
            >
              <Search size={20} />
            </button>
          </div>
        </form>
        <div className="hidden  col-span-1 lg:flex gap-4 text-gray-500 ">
          {actionButtons.map((action) => {
            return (
              <button
                key={action.label}
                type={"button"}
                className="border-[0.5px] border-gray-500/25 p-2 rounded-sm cursor-pointer hover:bg-gray-500/10"
              >
                <action.icon size={20} />
              </button>
            );
          })}
        </div>

        <hr className="text-gray-500/50 mt-2 h-1 w-full col-span-full hidden lg:block" />
        <CategoriesMenu
          setIsMenuOpen={setIsMenuOpen}
          isMenuOpen={isMenuOpen}
          categories={categories}
          category={category}
          setCategory={setCategory}
        />
      </header>
    </>
  );
};

export default Header;
