import { useEffect, useState, useCallback, useRef } from "react";

export default function HeroSlider({ interval = 4500, category }) {
  const [slides, setSlides] = useState([]);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(
    () => setIndex((i) => (i + 1) % slides.length),
    [slides.length],
  );
  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, interval);
    return () => clearInterval(id);
  }, [paused, next, interval]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (category) {
        const res = await fetch(
          `https://dummyjson.com/products/category/${category}?limit=${4}&sortBy=discountPercentage&order=desc&select=id,title,description,thumbnail,price,discountPercentage`,
        );
        const productsJson = await res.json();
        console.log({ productsJson });
        setSlides(productsJson?.products);
      }
    };

    fetchProducts();
  }, [category]);
  const getPricing = ({ price, discountPercentage }) => {
    const off = Math.round(discountPercentage || 0);
    const original = off > 0 ? price / (1 - discountPercentage / 100) : null;
    return { price, off, original };
  };
  const touchStart = useRef(null);

  const onTouchStart = (e) => {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  };

  const onTouchEnd = (e) => {
    if (!touchStart.current) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touchStart.current.x;
    const dy = t.clientY - touchStart.current.y;
    touchStart.current = null;

    // horizontal swipe only, ignore small moves and vertical scrolls
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
      dx < 0 ? next() : prev();
    }
  };
  return (
    <section
      className="relative w-full overflow-hidden bg-neutral"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onPointerEnter={(e) => e.pointerType === "mouse" && setPaused(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setPaused(false)}
      onFocus={(e) => e.target.matches(":focus-visible") && setPaused(true)}
      onBlur={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Featured collections"
    >
      <div className="relative h-110 md:h-120">
        {slides.map((s, i) => {
          const pricing = getPricing({
            price: s?.price,
            discountPercentage: s?.discountPercentage,
          });
          return (
            <div
              key={s.title}
              aria-hidden={i !== index}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                i === index ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <div className="absolute inset-0 bg-linear-to-b from-primary via-primary/75 to-secondary sm:bg-linear-to-r" />

              <img
                loading={i === 0 ? "eager" : "lazy"}
                src={s.thumbnail}
                alt={s.description}
                className="absolute bottom-25 left-1/2 h-[46%] w-[70%] max-w-xs -translate-x-1/2 object-contain transition-[filter] duration-300 hover:filter-[drop-shadow(0_0_2px_rgba(0,0,0,0.6))_drop-shadow(0_0_6px_rgba(0,0,0,0.35))_drop-shadow(0_16px_32px_rgba(0,0,0,0.4))] sm:bottom-0 sm:left-auto sm:right-[6%] sm:h-[88%] sm:w-[38%] sm:max-w-105 sm:translate-x-0 md:right-[12%]"
              />
              <div className="relative z-10 flex h-full flex-col items-center justify-start px-6 pt-8 text-center sm:max-w-[55%] sm:items-start sm:justify-center sm:px-12 sm:pt-0 sm:text-left md:px-[8%]">
                <h2 className="text-xl font-semibold leading-tight text-white md:text-2xl lg:text-3xl">
                  {s.title}
                </h2>
                <div className="mt-2 flex flex-col md:flex-row flex-wrap items-center justify-center gap-x-3 gap-y-2 sm:mt-4 sm:justify-start">
                  <p className="text-xl font-semibold text-white sm:text-2xl md:text-3xl">
                    ${pricing.price.toFixed(2)}
                  </p>

                  {pricing.original && (
                    <span className="rounded-full bg-orange-500 px-3 py-1 text-base font-semibold tracking-wide text-white  md:text-lg">
                      {pricing.off}% OFF
                    </span>
                  )}
                </div>
                <button
                  tabIndex={i === index ? 0 : -1}
                  className="cursor-pointer absolute bottom-12 md:inline-block md:bottom-24  mt-4  w-fit rounded bg-orange-500 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-orange-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-white sm:mt-6"
                >
                  Buy Now
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={prev}
        aria-label="Previous slide"
        className="cursor-pointer absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur transition hover:bg-white/40 "
      >
        ‹
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="cursor-pointer absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur transition hover:bg-white/40 "
      >
        ›
      </button>

      <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2 sm:bottom-5 sm:left-12 sm:translate-x-0 md:left-[8%]">
        {slides.map((s, i) => (
          <button
            key={s.title}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === index}
            className={`cursor-pointer h-2 rounded-full transition-all ${
              i === index ? "w-6 bg-white" : "w-2 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
