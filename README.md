This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Required Node Version >= 16.4 and install dependencies

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

The use of global and persistent states is implemented through "zustand" and its "middlewares"

It is validated if there is already cached information so as not to consult the endpoint again, greatly reducing costs in requests

Tailwinds, typescript, sass, and the latest news regarding react were implemented.
