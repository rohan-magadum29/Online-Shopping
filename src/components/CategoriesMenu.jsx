const CategoriesMenu = ({
  isMenuOpen,
  setIsMenuOpen,
  categories,
  category,
  setCategory,
}) => {
  console.log({ categories });
  return (
    <section
      className={` ${isMenuOpen ? "flex flex-col" : "hidden"}  lg:flex-row lg:flex  gap-2 col-span-full justify-between w-full font-medium text-gray-600 items-center text-sm md:text-base mb-2 overflow-x-auto scrollbar-thin`}
    >
      {categories.map((categoryItem) => {
        return (
          <button
            key={categoryItem?.categoryItem}
            type={"button"}
            className={`cursor-pointer hover:text-gray-800 w-full text-nowrap ${categoryItem?.category === category ? "text-secondary" : ""}`}
            onClick={() => {
              setCategory(categoryItem?.category);
              setIsMenuOpen((prev) => !prev);
            }}
          >
            {categoryItem?.categoryName}
            <hr className="lg:hidden h-1 w-full mt-2 text-gray-500/25" />
          </button>
        );
      })}
    </section>
  );
};

export default CategoriesMenu;
