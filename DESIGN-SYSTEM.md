# Design System — UXProbe

> Référence technique pour Claude et les développeurs. Dense par design : chaque section répond à une question précise sans navigation supplémentaire.

## Fichier Figma

- **File key** : `K7WS880rk8Q3bibhVRJ5fe`
- **Page Foundation** : `1811:15653`
- **URL** : https://www.figma.com/design/K7WS880rk8Q3bibhVRJ5fe/UXProbe

---

## Stack technique

| Couche | Outil | Version |
|---|---|---|
| Framework | Next.js (App Router) | 15 |
| CSS | Tailwind CSS | v4 |
| Composants | shadcn/ui | latest |
| Icônes | Tabler Icons | latest |
| Police display | Wanted Sans Variable | — |
| Police corps | Open Sans | — |

**Fichier unique à modifier pour changer de DA** : `app/globals.css` → bloc `@theme {}`

---

## Tokens — Couleurs primitives

### Brand (Blue)
```
blue-050: #f0faff   blue-100: #e0f3fe   blue-200: #b9e8fe
blue-300: #7ad8fe   blue-400: #35c5fb   blue-500: #0baeec  ← brand primary
blue-600: #008cca   blue-700: #0170a3   blue-800: #055f87
blue-900: #0a4e70   blue-950: #07314a
```

### Neutral (Grey)
```
grey-050: #f7f9fc   grey-100: #f7f9fc   grey-200: #edf0f7
grey-300: #e2e7f0   grey-400: #cbd2e0   grey-500: #a0abc0
grey-600: #717d96   grey-700: #4a5468   grey-800: #2d3648
grey-900: #1a202c   grey-950: #1a202c
white:    #ffffff
```

### Sémantique (Success / Warning / Error)
```
green-500: #20c74f  (success)
orange-500: #da9718 (warning)
red-500:   #e54e67  (error)
```

---

## Tokens — Couleurs sémantiques

### Background
| Token | Valeur |
|---|---|
| `bg-page` | #f7f9fc |
| `bg-primary` | #ffffff |
| `bg-secondary` | #f7f9fc |
| `bg-tertiary` | #f7f9fc |
| `bg-quaterny` | #edf0f7 |
| `bg-brand_primary` | #0baeec |
| `bg-brand_secondary` | #b9e8fe |
| `bg-brand_tertiary` | #f0faff |
| `bg-action` | #0baeec |
| `bg-action_hover` | #0170a3 |
| `bg-overlay` | #1a202ccc |
| `bg-tooltips` | #1a202c |
| `bg-succes_primary` | #20c74f |
| `bg-succes_secondary` | #baf8ca |
| `bg-succes_tertiary` | #f0fdf3 |
| `bg-warning_primary` | #da9718 |
| `bg-warning_secondary` | #f6e092 |
| `bg-warning_tertiary` | #fcf9ea |
| `bg-error_primary` | #e54e67 |
| `bg-error_secondary` | #fad1d6 |
| `bg-error_tertiary` | #fef2f3 |

### Foreground
| Token | Valeur |
|---|---|
| `fg-primary` | #1a202c |
| `fg-secondary` | #4a5468 |
| `fg-tertiary` | #717d96 |
| `fg-quaterny` | #cbd2e0 |
| `fg-quinternary` | #e2e7f0 |
| `fg-brand_primary` | #0baeec |
| `fg-action` | #0baeec |
| `fg-action_hover` | #0170a3 |
| `fg-white` | #ffffff |

### Text
| Token | Valeur |
|---|---|
| `text-primary` | #1a202c |
| `text-secondary` | #4a5468 |
| `text-link` | #0baeec |
| `text-brand` | #0baeec |

### Border
| Token | Valeur |
|---|---|
| `border-default` | #e2e7f0 |
| `border-grey` | #edf0f7 |
| `border-brand` | #35c5fb |

---

## Tokens — Typographie

### Polices
```
font-primary (display/titres) : "Wanted Sans Variable"
font-secondary (corps)        : "Open Sans"
```

### Échelle
| Rôle | Famille | Poids | Taille | Line-height |
|---|---|---|---|---|
| H1 Desktop | font-primary | 800 | 32px | 40px |
| H2 | font-primary | 800 | 24px | 32px |
| H3 | font-primary | 800 | 20px | 28px |
| H4 | font-primary | 800 | 18px | 24px |
| Primary/Default | font-secondary | 400 | 16px | 24px |
| Primary/Strong | font-secondary | 700 | 16px | 24px |
| Primary/Link | font-secondary | 600 | 16px | 24px |
| Secondary/Default | font-secondary | 400 | 14px | 20px |
| Secondary/Strong | font-secondary | 700 | 14px | 20px |
| Secondary/Link | font-secondary | 600 | 14px | 20px |
| Tertiary/Default | font-secondary | 400 | 12px | 16px |
| Tertiary/Strong | font-secondary | 700 | 12px | 20px |
| Tertiary/Link | font-secondary | 600 | 12px | 16px |
| Quaternary/Default | font-secondary | 400 | 10px | 12px |
| Quaternary/Strong | font-secondary | 700 | 10px | 12px |
| Quaternary/Link | font-secondary | 600 | 10px | 12px |

---

## Tokens — Spacing, Gap, Radius

### Gap & Padding (même échelle)
```
0 | 2 | 4 | 8 | 12 | 16 | 20 | 24 | 32
```
Noms : `gap-XXS(2)` `gap-XS(4)` `gap-S(8)` `gap-M(12)` `gap-L(16)` `gap-XL(20)` `gap-XXL(24)` `gap-XXXL(32)`

### Border Radius
```
radius-XXS: 2px
radius-XS:  4px
radius-S:   8px
radius-M:   12px
radius-L:   16px
radius-XL:  20px
radius-XXL: 24px
radius-max: 32px
```

---

## Changer de DA — Guide rapide

Pour créer une nouvelle identité visuelle, modifier uniquement ces tokens dans `app/globals.css` :

### Niveau 1 — Impact maximal (DA complète)
1. `bg-action` + `bg-action_hover` → couleur brand principale et hover
2. `fg-brand_primary` + `text-brand` + `text-link` → couleur des éléments interactifs
3. `font-primary` → police des titres
4. `radius-M` → radius de référence des composants (4px = sharp, 16px = soft)

### Niveau 2 — Affinage
5. `font-secondary` → police du corps de texte
6. `bg-page` + `bg-primary` → teinte de fond (blanc pur vs gris très clair)
7. `border-default` → couleur des bordures

### Niveau 3 — Détails
8. Remplacement de toute la palette primitive `blue-*` par une nouvelle couleur brand
9. Ajustement de l'échelle des radius si besoin

---

## Composants — Inventaire complet

| Page Figma | Composants | Priorité code |
|---|---|---|
| **Button** | Action Button, Destructive | ⭐⭐⭐ |
| **Input** | Text, Select, Textarea, Search, Date, OTP, Password | ⭐⭐⭐ |
| **Card** | Card, Card+image, Empty State | ⭐⭐⭐ |
| **Badge** | Notification badge, Tags | ⭐⭐⭐ |
| **Avatar** | Avatar Icon, Avatar (tailles multiples) | ⭐⭐⭐ |
| **CheckBox** | Checkbox (default, checked, indeterminate, disabled) | ⭐⭐⭐ |
| **Navigation** | Sidebar, Header Nav, Tabs | ⭐⭐⭐ |
| **Dialog** | Modal, Drawer | ⭐⭐⭐ |
| **Alert** | Toaster, Tips | ⭐⭐ |
| **Notice** | Banner, Global Alert | ⭐⭐ |
| **Tooltips** | Tooltip, Popover | ⭐⭐ |
| **Switch** | Toggle switch | ⭐⭐ |
| **Radio Button** | Radio button | ⭐⭐ |
| **ButtonGroup** | Groupe de boutons | ⭐⭐ |
| **Chips** | Chips filtres/tags | ⭐⭐ |
| **List Items** | List Item | ⭐⭐ |
| **Progression** | ProgressBar, Stepper (H/V/Circulaire) | ⭐ |
| **Page Control** | Pagination, Navigation Dot | ⭐ |
| **Charts** | 6 types de graphiques | ⭐ |
| **Miscellaneous** | HeadIcon, BrandLogo | ⭐ |

---

## Icônes — Tabler Icons

- **Librairie** : [Tabler Icons](https://tabler.io/icons) — 836 icônes dans le Figma
- **Package npm** : `@tabler/icons-react`
- **Usage** : `import { IconHome } from '@tabler/icons-react'`
- **Taille par défaut** : 24px, stroke 1.5

### Changer de librairie d'icônes sur un nouveau projet

| Librairie | Package | Import |
|---|---|---|
| Tabler (défaut) | `@tabler/icons-react` | `import { IconHome }` |
| Lucide | `lucide-react` | `import { Home }` |
| Heroicons | `@heroicons/react` | `import { HomeIcon }` |
| Phosphor | `@phosphor-icons/react` | `import { House }` |

**Procédure de swap** : Demander à Claude "remplace Tabler par [librairie] dans tout le projet" → il fait un find & replace sur tous les imports d'icônes.

---

## Workflow Figma → Code

1. Ouvrir le fichier Figma (file key : `K7WS880rk8Q3bibhVRJ5fe`)
2. Modifier les Figma Variables (couleurs, typos, radius)
3. Demander à Claude : _"Sync les tokens Figma vers globals.css"_
4. Claude lit les variables via le Figma MCP et met à jour uniquement le bloc `@theme {}`
5. Tous les composants reflètent la nouvelle DA automatiquement

---

## Structure des fichiers

```
louis-ds/
├── DESIGN-SYSTEM.md       ← ce fichier
├── app/
│   ├── globals.css        ← @theme {} = UNIQUE point de changement DA
│   ├── layout.tsx
│   └── design/
│       └── page.tsx       ← showcase de tous les composants
├── components/
│   ├── ui/                ← primitives shadcn/ui thémifiées
│   └── blocks/            ← blocs composés (Hero, Nav, Footer…)
├── lib/
│   └── utils.ts
└── README.md
```
