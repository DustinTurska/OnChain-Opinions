# OnChain Opinions - thirdweb Engine Demo

![Onchain Opinions Demo](/public/Screenshot%202024-09-28%20at%2012.45.35 PM.png)
![Onchain Opinions Demo](/public/Screenshot%202024-09-28%20at%2012.46.40 PM.png)

This demo uses Next.js 14 (app directory) and NextUI (v2).

## Technologies Used


### thirdweb:
- [Engine](https://portal.thirdweb.com/engine)
- [Connect](https://portal.thirdweb.com/connect)
- [In-App Wallets](https://portal.thirdweb.com/connect/in-app-wallet/overview)

### Other:
- [NextUI v2](https://nextui.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Tailwind Variants](https://tailwind-variants.org)
- [TypeScript](https://www.typescriptlang.org/)
- [Framer Motion](https://www.framer.com/motion/)
- [next-themes](https://github.com/pacocoursey/next-themes)

## About

### Why did I build this???

To show how quick and easy it is to integrate onchain elements into any application using thirdweb Engine. 

In just a few short hours, you can create a survey application that takes advantage of blockchain, without the need for extensive knowledge of smart contracts or other web3 elements.

### Keep in mind, this is a basic example, not Production ready!

Simply clone the repo

```bash
git clone https://github.com/DustinTurska/OnChain-Opinions.git
```

### Set up environment variables

Create `.env.local` at the root of your project:

```bash
ACCESS_TOKEN="your-thirdweb-engine-access-token"
BACKEND_WALLET="your-engine-backend-wallet"
NEXT_PUBLIC_TEMPLATE_CLIENT_ID="your-thirdweb-client-id"
ADMIN_ADDRESS="your-admin-wallet-address"
```

### Install dependencies

You can use one of them `npm`, `yarn`, `pnpm`, `bun`, Example using `yarn`:

```bash
yarn
```

### Run the development server

```bash
yarn dev
```

You can get started with thirdweb [here](https://thirdweb.com/dashboard)

Create a thirdweb API Key [API Key](https://thirdweb.com/dashboard/settings/api-keys)

Deploy thirdweb [Engine](https://thirdweb.com/dashboard/engine/create)

## Additional Resources

Short [video](https://www.loom.com/share/aea2be6e991346bc9916a4e8e81532b4?sid=2bf0614f-bb0a-4f3b-b696-112f1920c747) on how this works 🥳

Useful [Engine Scripts](https://github.com/DustinTurska/thirdweb-Engine-Scripts)

## Some other notes about this project

I am using a csv locally to record responses, this should not be done in PROD, use something like [MongoDB Atlas](https://www.mongodb.com/lp/cloud/atlas/try4?utm_source=google&utm_campaign=search_gs_pl_evergreen_atlas_core-high-int_prosp-brand_gic-null_amers-us_ps-all_desktop_eng_lead&utm_term=mongodb%20atlas&utm_medium=cpc_paid_search&utm_ad=e&utm_ad_campaign_id=19609124046&adgroup=145188748043&cq_cmp=19609124046&gad_source=1&gclid=CjwKCAjw0t63BhAUEiwA5xP54dTzkXSDfQDdHK1V7WzPyGC51fiDCe0sKybeMqdA16Hh_wfkib14JRoCUW0QAvD_BwE), [Firebase Firestore](https://firebase.google.com/docs/firestore), or [Vercel's own KV storage](https://vercel.com/docs/storage/vercel-kv).

All funds are on Holesky Testnet, you can use [thirdweb's faucet](https://thirdweb.com/holesky) to get test funds. 

Or use any of the 1267 other supported testnets on [thirdweb's chainlist](https://thirdweb.com/chainlist/testnets)

### This project is simply to demonstrate thirdweb Engine and will most likely not be maintained.
