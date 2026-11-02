import {
  contactInfo,
  footerLinks,
  socialLinks,
} from "../constants/footer.constants";
const Footer = () => {
  return (
    <footer className="w-full bg-white">
      <div className="mx-auto grid grid-cols-2 gap-x-8 gap-y-10 px-8 py-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10 lg:px-12">
        {footerLinks.map((section) => (
          <div key={section.title}>
            <h3 className="mb-5 text-xs md:text-sm font-bold uppercase text-gray-800">
              {section.title}
            </h3>

            <ul className="flex flex-col space-y-2.5 items-start">
              {section.links.map((link) => (
                <button
                  key={link}
                  className="cursor-pointer text-xs md:text-sm text-gray-500 transition-colors hover:text-orange-500"
                >
                  {link}
                </button>
              ))}
            </ul>
          </div>
        ))}

        <div className="col-span-2 sm:col-span-1">
          <h3 className="mb-5 text-xs md:text-sm font-bold uppercase tracking-wider text-gray-800">
            Contact
          </h3>

          <ul className="space-y-3">
            {contactInfo.map((item) => {
              const Icon = item.icon;

              return (
                <li key={item.type}>
                  <a
                    href={item.href}
                    className="flex items-start gap-2 text-xs text-gray-500 transition-colors hover:text-orange-500 md:text-sm"
                  >
                    <Icon size={15} className="mt-0.5 shrink-0" />
                    <span>{item.value}</span>
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="mt-7">
            <h3 className="mb-5 text-xs md:text-sm font-bold uppercase  text-gray-800">
              Stay Connected
            </h3>

            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <button
                    key={social.name}
                    type="button"
                    aria-label={social.name}
                    className="cursor-pointer flex size-9 items-center justify-center rounded-md border border-gray-300 text-gray-600 transition hover:border-orange-500 hover:text-orange-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                  >
                    <Icon size={17} />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col items-center gap-1.5 bg-gray-700 px-8 py-3 text-xs text-white sm:flex-row sm:justify-between sm:px-12">
        <span>@Online Shopping, 2015. All Rights Reserved.</span>
        <span>Powered by React</span>
      </div>
    </footer>
  );
};

export default Footer;
