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
  adminPage: {
    label: "Admin",
    href: "/admin",
    requiredAddress: "0x829d9E61EFb24636Ec631446859CF5c5D210f919",
  },
};
