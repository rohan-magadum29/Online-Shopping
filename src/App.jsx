import { useEffect, useState } from "react";
import "./App.css";
import FeaturedProducts from "./components/FeatureProducts";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HeroSlider from "./components/HeroSlider";
import Newsletter from "./components/Newsletter";
import Testimonials from "./components/Testimonials";

function App() {
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch("https://dummyjson.com/products/category-list");
      const categories = await res.json();
      const finalCategories = categories.slice(0, 10).map((item) => {
        return {
          category: item,
          categoryName: item
            ?.split("-")
            .map((item) => item?.[0]?.toUpperCase() + item.slice(1))
            .join(" "),
        };
      });
      const randomCategoryIndex = Math.floor(
        Math.random() * finalCategories?.length,
      );
      setCategory(finalCategories[randomCategoryIndex]?.category);
      setCategories(finalCategories);
    };
    fetchCategories();
  }, []);
  return (
    <div className="flex flex-col gap-2">
      <Header
        categories={categories}
        category={category}
        setCategory={setCategory}
      />
      <HeroSlider category={category} />
      <FeaturedProducts category={category} />
      <div className="grid grid-cols-1  md:grid-cols-2 gap-4">
        <Testimonials />
        <Newsletter />
      </div>
      <hr className="h-1 text-gray-300" />
      <Footer />
    </div>
  );
}

export default App;
