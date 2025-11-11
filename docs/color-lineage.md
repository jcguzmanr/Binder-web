# Binder UI Color Lineage

This export consolidates the canonical Binder UI color tokens and typography scale.

## Primary Palette

| Token / Variable | Hex | RGB | Recommended Usage |
| --- | --- | --- | --- |
| `--accent` / `COLORS.teal` | `#0098B1` | 0, 152, 177 | Brand teal, primary actions, interactive states |
| `--accent-light` / `COLORS.tealLight` | `#AEDEE6` | 174, 222, 230 | Subtle backgrounds, secondary emphasis |
| `--gray-dark` / `COLORS.grayDark` | `#1B1B1B` | 27, 27, 27 | Primary text on light backgrounds |
| `--gray-light` / `COLORS.grayLight` | `#DFDFDF` | 223, 223, 223 | Secondary surfaces, borders |
| `--white` / `COLORS.white` | `#FFFFFF` | 255, 255, 255 | Core surfaces, text on dark backgrounds |
| `--bg` | `#F5F5F5` | 245, 245, 245 | Platform background across layouts |
| `--fg` | `#1B1B1B` (light theme) | 27, 27, 27 | Theme-aware foreground for text |

### Primary Palette Notes
- Opacity variants (`--opacity-75`, `--opacity-50`, `--opacity-25`) provide standardized hover, disabled, and subtle background treatments.
- Adaptive tokens (`--fg`, `--bg`, `--border`) switch values automatically according to the active theme.

## Secondary Palette

| Token / Variable | Hex | RGB | Recommended Usage |
| --- | --- | --- | --- |
| `COLORS.orange` | `#FF9000` | 255, 144, 0 | Warning highlights, attention grabbers |
| `COLORS.green` | `#00D44E` | 0, 212, 78 | Success states, confirmations |
| `COLORS.accentTeal` | `#8AD0DC` | 138, 208, 220 | Binder Tally accenting, soft emphasis |
| `COLORS.veryLightBlue` | `#96EFFF` | 150, 239, 255 | Binder Quorum backgrounds, cards |
| `COLORS.lightBlue` / `--blue-accent` | `#5FBDFF` | 95, 189, 255 | Secondary CTAs, hover states |
| `COLORS.mediumBlue` | `#3987BE` | 57, 135, 190 | Compliance surfaces, trust indicators |
| `COLORS.brightPurple` | `#6D3CFF` | 109, 60, 255 | Deals highlights, special elements |
| `COLORS.navy` | `#30339C` | 48, 51, 156 | Navigation emphasis, brand headers |
| `COLORS.pink` | `#F251FF` | 242, 81, 255 | Design system surfaces, standout content |

### Secondary Palette Notes
- All secondary colors inherit the standardized opacity guidance noted above.
- Application-specific pairing follows the matrix below.

## Application Brand Lineage

| Application | Brand Color | Usage Highlights |
| --- | --- | --- |
| Cases | `#30339C` (Navy) | Authority-driven navigation, case dashboards |
| Comply | `#3987BE` (Medium Blue) | Regulatory workflows, compliance KPIs |
| Deals | `#6D3CFF` (Bright Purple) | Contract lifecycle visual anchors |
| Archive | `#5FBDFF` (Light Blue) | Archive cards, document interactions |
| FrontDesk | `#0098B1` (Teal Principal) | Request tracking, dashboard focus |
| Tally | `#8AD0DC` (Accent Teal) | Billing states, financial summaries |
| Quorum | `#96EFFF` (Very Light Blue) | Voting flows, assembly views |
| Binder UI (Template) | `#F251FF` (Pink) | Design system documentation modules |

## Typography Lineage

| Token / Variable | Value | Recommended Usage |
| --- | --- | --- |
| `--font-family` | `'Montserrat', ui-sans-serif, system-ui, -apple-system, sans-serif` | Global typography stack |
| `--font-weight-light` | 300 | Subheadings, complementary copy |
| `--font-weight-regular` | 400 | Body text, supporting labels |
| `--font-weight-medium` | 500 | Navigation labels, badges |
| `--font-weight-bold` | 700 | Headlines, CTAs |
| `--fs-12` | 0.75rem | Tooltips, metadata, sidebar section labels |
| `--fs-14` | 0.875rem | Secondary text, navigation |
| `--fs-16` | 1rem | Base body copy, button text |
| `--fs-20` | 1.25rem | Subtitles, app titles |
| `--fs-24` | 1.5rem | Primary headlines |

### Typography Notes
- Sidebar navigation leverages medium weight for labels and bold weight for section headers.

---

Generated: 2025-11-11

