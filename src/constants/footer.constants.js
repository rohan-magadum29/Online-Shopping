import {
  BookUser,
  Camera,
  Link2,
  Mail,
  MapPin,
  Music2,
  Phone,
  X,
} from "lucide-react";

export const footerLinks = [
  {
    title: "Categories",
    links: [
      "Apparel",
      "Bags",
      "Drinkware",
      "Lanyards",
      "Office",
      "Tech",
      "Gifts",
      "Tradeshow",
    ],
  },
  {
    title: "Services",
    links: [
      "24-Hour Rush",
      "Decorations",
      "Sourcing and Custom Hub",
      "eBlasts | Specials",
      "Show Schedules",
      "Special Printing Process",
    ],
  },
  {
    title: "Tools",
    links: [
      "Check Inventory",
      "Order Status/Tracking",
      "Virtual Samples",
      "Customize",
      "Future Project List",
      "Compare Items",
      "Upload Artwork",
    ],
  },
];

export const contactInfo = [
  {
    type: "phone",
    value: "+1246-345-0695",
    icon: Phone,
    href: "tel:+12463450695",
  },
  {
    type: "email",
    value: "sales@cosmopromos.com",
    icon: Mail,
    href: "mailto:sales@cosmopromos.com",
  },
  {
    type: "location",
    value: "12, Avenue Prime, Stafford, TX 77477",
    icon: MapPin,
    href: "https://www.google.com/maps/search/?api=1&query=12+Avenue+Prime+Stafford+TX+77477",
  },
];

export const socialLinks = [
  { name: "Facebook", icon: BookUser },
  { name: "X", icon: X },
  { name: "LinkedIn", icon: Link2 },
  { name: "Instagram", icon: Camera },
  { name: "TikTok", icon: Music2 },
];
