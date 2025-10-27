import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon, ContactIcon, GitForkIcon, UserStarIcon } from "lucide-react";

export const DATA = {
  
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/core", icon: UserStarIcon, label: "Core" },
    { href: "/subwing", icon: GitForkIcon, label: "Subwings" },
    { href: "/contact", icon: ContactIcon, label: "Contact Us" },
  ],
  contact: {
    email: "hello@example.com",
    tel: "+123456789",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://dub.sh/dillion-github",
        icon: Icons.github,

        navbar: false,
      },
      Instagram: {
        name: "Instagram",
        url: "https://www.instagram.com/noorul_ulama/?hl=en",
        icon: Icons.instagram,

        navbar: true,
      },
      Facebook: {
        name: "Facebook",
        url: "https://www.facebook.com/noorululama.faizabad",
        icon: Icons.facebook,

        navbar: true,
      },
      Youtube: {
        name: "Youtube",
        url: "https://www.youtube.com/@NOORULULAMA",
        icon: Icons.youtube,
        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "#",
        icon: Icons.email,

        navbar: false,
      },
    },
  },
} as const;
