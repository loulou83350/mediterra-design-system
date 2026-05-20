# Mediterra Design System

> [🇫🇷 Français](#français) · [🇬🇧 English](#english)

---

## Français

**Mediterra** est un design system codé, construit avec Vite + React + TypeScript + Tailwind CSS v4.
Conçu pour être cloné et customisé : changer de design = modifier un seul fichier CSS.

### Live demo
👉 **https://mediterra-ds.vercel.app**

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/loulou83350/mediterra-design-system)

### Stack
| Couche | Outil |
|---|---|
| Framework | Vite + React 19 + TypeScript |
| CSS | Tailwind CSS v4 (tokens = CSS variables natives) |
| Icônes | Tabler Icons (`@tabler/icons-react`) |
| Police display | Wanted Sans Variable |
| Police corps | Open Sans |

### Cloner et démarrer

```bash
git clone https://github.com/loulou83350/mediterra-design-system.git
cd mediterra-design-system
npm install
npm run dev
```

Ouvre `http://localhost:5173` — tu arrives directement sur la page d'overview.

### Changer de design (tokens)

Toutes les couleurs, typographies et rayons sont dans **`src/index.css`** → bloc `@theme {}`.
Modifier ce fichier = nouveau look sur tous les composants instantanément.

```css
/* src/index.css — exemple : changer la couleur brand */
@theme {
  --bg-action: #7c3aed;       /* violet au lieu de bleu */
  --bg-brand_primary: #7c3aed;
  /* ... */
}
```

### Ajouter un composant avec Claude

Ouvre le projet dans **Claude Code** et écris :

> "Ajoute un composant Badge avec les variantes success/error/warning, en suivant les conventions de DESIGN-SYSTEM.md"

Claude lit `DESIGN-SYSTEM.md` pour comprendre les conventions (tokens, structure de fichiers, pattern des pages) et génère le composant directement.

### Composants inclus (~50)

| Groupe | Composants |
|---|---|
| Actions | Button, Destructive Button |
| Inputs | Text Field, Password, OTP Code, Select, Numeric Input, Text Area, Multi Select, Phone Number, Credit Card, File Upload |
| Controls | Checkbox, Switch, Radio Button |
| Display | Avatar, Badge, Card, Tag, Chip, Progress Bar, List Item, Head Icon |
| Feedback | Alert, Notification, Tips, Modal & Drawer, Notification Item, Global Alert, Tooltip, Popover |
| Navigation | Horizontal Stepper, Vertical Stepper, Circular Stepper |
| Layout | Header Mobile, Banner, Bottom Bar, Tab Bar, Sidebar Navigation |
| Page Control | Navigation Dot, Pagination |
| Charts | Stat Card, Radar Chart, Line Chart, Step Chart, Bar Chart |

---

## English

**Mediterra** is a coded design system built with Vite + React + TypeScript + Tailwind CSS v4.
Designed to be cloned and customized: changing the visual identity = editing one CSS file.

### Live demo
👉 **https://mediterra-ds.vercel.app**

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/loulou83350/mediterra-design-system)

### Stack
| Layer | Tool |
|---|---|
| Framework | Vite + React 19 + TypeScript |
| CSS | Tailwind CSS v4 (tokens = native CSS variables) |
| Icons | Tabler Icons (`@tabler/icons-react`) |
| Display font | Wanted Sans Variable |
| Body font | Open Sans |

### Clone and run

```bash
git clone https://github.com/loulou83350/mediterra-design-system.git
cd mediterra-design-system
npm install
npm run dev
```

Open `http://localhost:5173` — you land directly on the overview page.

### Customize the design (tokens)

All colors, typography and radii live in **`src/index.css`** → `@theme {}` block.
Edit this file = new look across all components instantly.

```css
/* src/index.css — example: switch brand color to violet */
@theme {
  --bg-action: #7c3aed;
  --bg-brand_primary: #7c3aed;
  /* ... */
}
```

### Add a component with Claude

Open the project in **Claude Code** and write:

> "Add a Badge component with success/error/warning variants, following the conventions in DESIGN-SYSTEM.md"

Claude reads `DESIGN-SYSTEM.md` to understand conventions (tokens, file structure, page patterns) and generates the component directly.

### Included components (~50)

| Group | Components |
|---|---|
| Actions | Button, Destructive Button |
| Inputs | Text Field, Password, OTP Code, Select, Numeric Input, Text Area, Multi Select, Phone Number, Credit Card, File Upload |
| Controls | Checkbox, Switch, Radio Button |
| Display | Avatar, Badge, Card, Tag, Chip, Progress Bar, List Item, Head Icon |
| Feedback | Alert, Notification, Tips, Modal & Drawer, Notification Item, Global Alert, Tooltip, Popover |
| Navigation | Horizontal Stepper, Vertical Stepper, Circular Stepper |
| Layout | Header Mobile, Banner, Bottom Bar, Tab Bar, Sidebar Navigation |
| Page Control | Navigation Dot, Pagination |
| Charts | Stat Card, Radar Chart, Line Chart, Step Chart, Bar Chart |
