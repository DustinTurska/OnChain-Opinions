export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "OnChain Opinion Rewards",
  description: "Get rewarded for your opninions OnChain!",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Survey",
      href: "/survey",
    },
  ],
  navMenuItems: [
  ],
  links: {
    github: "https://github.com/nextui-org/nextui",
    twitter: "https://twitter.com/getnextui",
    docs: "https://nextui.org",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
  adminPage: {
    label: "Admin",
    href: "/admin",
    requiredAddress: "0x829d9E61EFb24636Ec631446859CF5c5D210f919",
  },
};
