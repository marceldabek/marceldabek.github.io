<div align="center">
<img alt="Portfolio" src="https://github.com/dillionverma/portfolio/assets/16860528/57ffca81-3f0a-4425-b31d-094f61725455" width="90%">
</div>

# Portfolio [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fdillionverma%2Fportfolio)

Built with next.js, [shadcn/ui](https://ui.shadcn.com/), and [magic ui](https://magicui.design/), deployed on Vercel.

# Features

- Setup only takes a few minutes by editing the [single config file](./src/data/resume.tsx)
- Built using Next.js 14, React, Typescript, Shadcn/UI, TailwindCSS, Framer Motion, Magic UI
- Includes a blog
- Responsive for different devices
- Optimized for Next.js and Vercel

# Getting Started Locally

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/dillionverma/portfolio
   ```

2. Move to the cloned directory

   ```bash
   cd portfolio
   ```

3. Install dependencies:

   ```bash
   pnpm install
   ```

4. Start the local Server:

   ```bash
   pnpm dev
   ```

5. Open the [Config file](./src/data/resume.tsx) and make changes

# License

Licensed under the [MIT license](https://github.com/dillionverma/portfolio/blob/main/LICENSE.md).

## Deploying to GitHub Pages

This project has been configured for static export so you can deploy to GitHub Pages without a server.

1. Ensure the config contains `output: 'export'` and `images.unoptimized: true` (already done in `next.config.mjs`).
2. Build the static site:
   ```bash
   pnpm build
   ```
3. The static files are emitted to the `out/` directory.
4. Push the contents of `out/` to the branch GitHub Pages is serving from (usually `gh-pages`). A simple script:
   ```bash
   git checkout -B gh-pages
   pnpm build
   git --work-tree out add --all
   git --work-tree out commit -m "Deploy"
   git push origin HEAD:gh-pages --force
   git checkout -
   ```
5. In your repository settings, set Pages to deploy from the `gh-pages` branch (root directory).

An empty file `public/.nojekyll` is included to disable Jekyll so the `/_next` assets load correctly.
