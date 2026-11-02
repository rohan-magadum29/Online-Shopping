import { useCallback, useEffect, useRef, useState } from "react";

function Testimonials({ interval = 4500 }) {
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
    const fetchTestimonials = async () => {
      const res = await fetch(`https://testimonialapi.vercel.app/api`);
      const testimonials = await res.json();
      setSlides(testimonials);
    };

    fetchTestimonials();
  }, []);
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
      className="relative flex h-full w-full flex-col overflow-hidden px-4 py-4 sm:px-6 gap-2 md:gap-10 lg:gap-8 md:py-12 "
      onPointerEnter={(e) => e.pointerType === "mouse" && setPaused(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setPaused(false)}
      onFocus={(e) => e.target.matches(":focus-visible") && setPaused(true)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onBlur={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Testimonials"
    >
      <h2 className="text-center text-3xl font-light text-primary md:text-5xl">
        Testimonials
      </h2>

      <div className="mx-auto grid w-full max-w-4xl text-center">
        {slides.map((s, i) => {
          return (
            <div
              key={s.title}
              aria-hidden={i !== index}
              className={`col-start-1 row-start-1 transition-opacity duration-300 ease-in-out ${
                i === index ? "z-10 opacity-100" : "z-0 opacity-0"
              }`}
            >
              <div className="mx-auto flex h-full flex-col items-center justify-center gap-4 md:gap-6">
                <div className="flex w-full flex-col items-center justify-center gap-2 sm:flex-row sm:gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-primary via-primary/90 to-white font-semibold text-white md:h-12 md:w-12">
                    {s.name
                      .split(" ")
                      .map((item) => item?.[0] || "")
                      .join("")}
                  </span>
                  <h2 className="text-lg italic leading-tight text-gray-600 md:text-2xl lg:text-3xl">
                    {s.name}
                  </h2>
                </div>
                <p className="px-2 text-base font-light leading-relaxed text-gray-600 sm:px-6 sm:text-lg md:text-xl">
                  {s.message}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center gap-3 sm:gap-4 mt-2 md:mt-4">
        {slides.map((s, i) => (
          <button
            key={s.title}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === index}
            className={`h-2 cursor-pointer rounded-full transition-all ${
              i === index
                ? "w-6 bg-secondary"
                : "w-2 bg-secondary/50 hover:bg-secondary/80"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

export default Testimonials;
