import { Mail } from "lucide-react";
import { useState } from "react";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = email.trim();

    if (!value) {
      setError("Please enter your email address.");
      setSuccess(false);
      return;
    }
    if (!EMAIL_REGEX.test(value)) {
      setError("Please enter a valid email address.");
      setSuccess(false);
      return;
    }

    setError("");
    setSuccess(true);
    setEmail("");
  };

  return (
    <section className="w-full p-4 py-4 sm:px-8 md:py-12 text-center">
      <div className="mx-auto">
        <h2 className="text-3xl font-light text-primary sm:text-4xl md:text-5xl">
          Weekly Newsletter
        </h2>
        <h3 className="mt-3 text-lg font-light leading-snug text-gray-600 sm:text-2xl md:mt-4 md:text-3xl">
          New Arrivals, Hot Deals &amp; Expert Tips
        </h3>

        <p className="mt-4 text-sm leading-7 text-gray-500 md:mt-6 md:text-base md:leading-8">
          We&apos;re committed to helping you grow your brand.
          <br className="hidden md:block" /> That&apos;s why we&apos;re always
          here to share valuable insights, exclusive offers, and the latest
          trends in promotional products.
        </p>

        <form onSubmit={handleSubmit} noValidate className="mt-8 md:mt-12">
          <div className="flex overflow-hidden rounded bg-gray-100">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <div className="flex min-w-0 flex-1 items-center gap-2 px-3 md:gap-3 md:px-4">
              <Mail size={25} className="text-neutral-500" />
              <input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError("");
                  if (success) setSuccess(false);
                }}
                placeholder="Email Address"
                aria-invalid={!!error}
                aria-describedby="newsletter-message"
                className="min-h-8 w-full min-w-0 bg-transparent py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none md:text-base"
              />
            </div>

            <button
              type="submit"
              className="flex min-h-8 cursor-pointer items-center gap-1.5 bg-orange-500 px-3 text-sm font-medium text-white transition hover:bg-orange-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-700 sm:px-5 md:gap-2 md:px-6 md:text-base"
            >
              Subscribe
            </button>
          </div>

          <p
            id="newsletter-message"
            role="status"
            className={`mt-1 min-h-5 text-xs md:text-sm ${
              error ? "text-red-600" : "text-green-600"
            }`}
          >
            {error || (success && "Thanks for subscribing!")}
          </p>
        </form>
      </div>
    </section>
  );
}
