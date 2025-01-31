Here's the updated step-by-step guide to set up Tailwind CSS in a monorepo using Turbo and pnpm, including the Tailwind configuration code.
### 1. Initialize Turbo with `npx create-turbo@latest`

Run the following command to create a new Turbo monorepo project:
```bash
npx create-turbo@latest
```

### 2. Run the Development Server for a Specific Workspace

To explicitly run the development server for the `web` workspace:
```bash
pnpm --filter web run dev
```

### 3. Add Tailwind CSS to a Specific Workspace

Install Tailwind CSS, PostCSS, and Autoprefixer as development dependencies in the `web` workspace:
```bash
pnpm --filter web add -D tailwindcss@3.4.17 postcss autoprefixer
```

### 4. Initialize Tailwind CSS Configuration

Navigate to the `web` workspace directory:
```bash
cd apps/web
```

Generate the Tailwind CSS configuration file:
```bash
npx tailwindcss init -p
```

### 5. Create a Shared Tailwind Configuration

#### a. Create the Tailwind Config Package

Navigate to the `packages` directory and create a new directory for the shared Tailwind configuration:
```bash
mkdir packages/tailwind-config
cd packages/tailwind-config
```

Initialize a new `package.json` file:
```bash
npm init -y
```

#### b. Add Tailwind Config Files

Copy the `tailwind.config.js` and `postcss.config.js` from the `web` app to the `packages/tailwind-config` directory, and add the following configuration to the `tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}', // Note the addition of the `app` directory.
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    // packages content
    '../../packages/**/*.{js,ts,jx,tsx}',
    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

For example, the structure should be like this:
```
packages/tailwind-config/
├── package.json
├── tailwind.config.js
└── postcss.config.js
```

### 6. Modify `web` Workspace to Use Shared Config

#### a. Update `package.json` in the `web` Workspace

Inside `apps/web/package.json`, add the following dependency to `devDependencies`:
```json
{
  "devDependencies": {
    "tailwind-config": "workspace:*"
  }
}
```

#### b. Use Shared Config in `web` Workspace

In `apps/web/postcss.config.js`:
```javascript
import config from "tailwind-config/postcss.config.js";
export default config;
```

In `apps/web/tailwind.config.js`:
```javascript
import config from "tailwind-config/tailwind.config.js";
export default config;
```

### 7. Update Global CSS and Layout

#### a. Global CSS

In `apps/web/styles/globals.css`, add the Tailwind CSS directives:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

#### b. Update Layout File

In `apps/web/app/layout.tsx`, import the global CSS:
```typescript
import "../styles/globals.css";
```

### 8. Install Dependencies in the Root Directory

Navigate to the root directory of the monorepo and install all dependencies:
```bash
pnpm i
```

### Final Structure

Your project structure should look something like this:
```
monorepo/
├── apps/
│   └── web/
│       ├── app/
│       │   └── layout.tsx
│       ├── styles/
│       │   └── globals.css
│       ├── postcss.config.js
│       └── tailwind.config.js
├── packages/
│   └── tailwind-config/
│       ├── package.json
│       ├── postcss.config.js
│       └── tailwind.config.js
└── package.json
```

### Conclusion

You have now set up Tailwind CSS in a Turbo monorepo using pnpm, with a shared Tailwind configuration. This setup ensures that your Tailwind CSS configuration is consistent across multiple workspaces within your monorepo.
