# Binder Web - Marketing Site

Modern, responsive marketing website for Binder built with React, TypeScript, and Vite.

## 🚀 Quick Start

### Prerequisites
- Node.js 20+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

The site will be available at `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Navigation.tsx      # Fixed navigation bar with mobile menu
│   │   └── Navigation.css
│   ├── sections/
│   │   ├── Home.tsx            # Hero section
│   │   ├── WhyBinder.tsx       # Auto-rotating carousel
│   │   ├── Solutions.tsx       # Tabbed solutions showcase
│   │   ├── Apps.tsx            # App grid with color coding
│   │   ├── Testimonials.tsx    # Client testimonials (grid/carousel)
│   │   ├── Contact.tsx         # Contact form with validation
│   │   └── Footer.tsx          # Footer with links
│   └── ui/
│       ├── Button.tsx          # Reusable button component
│       └── ThemeToggle.tsx     # Light/dark mode toggle
├── content/
│   ├── home.ts                 # Home section content
│   ├── porquebinder.ts         # Why Binder carousel data
│   ├── soluciones.ts           # Solutions tabs data
│   ├── apps.ts                 # Apps grid data
│   ├── testimonios.ts          # Testimonials data
│   ├── contacto.ts             # Contact form configuration
│   └── footer.ts               # Footer links and content
├── context/
│   └── ThemeContext.tsx        # Theme provider (light/dark)
├── styles/
│   └── globals.css             # Global styles, CSS variables, typography
├── App.tsx                     # Main app component
└── main.tsx                    # Entry point
```

## 🎨 Design System

### Colors
All colors are defined in `src/styles/globals.css` based on the Binder color lineage:

- **Primary**: `--accent` (#0098B1 - Teal), `--accent-light` (#AEDEE6)
- **Secondary**: Navy, Medium Blue, Bright Purple, Pink
- **App-specific**: Each Binder app has its own brand color
- **Grayscale**: Dark, Light, White
- **Theme-aware**: Colors automatically adapt in dark mode

### Typography
- **Font**: Montserrat (300, 400, 500, 700)
- **Scale**: 12px to 48px with semantic naming (--fs-12 to --fs-48)

### Components

#### Button
Two variants aligned with Binder design:
- **Primary**: Blue background, teal text
- **Secondary**: Light teal background, teal text

```tsx
<Button variant="primary">Solicita tu Demo</Button>
<Button variant="secondary">Iniciar Sesión</Button>
```

#### ThemeToggle
Light/dark mode switcher with persistent preference:
```tsx
<ThemeToggle />
```

## 📱 Responsive Design

All sections adapt to three breakpoints:
- **Desktop**: 968px+
- **Tablet**: 641px - 968px
- **Mobile**: ≤640px

### Key Responsive Features
- Navigation collapses to hamburger menu on mobile
- Solutions tabs stack vertically on smaller screens
- Apps grid adjusts from 3 → 2 → 1 columns
- Testimonials switch from grid to carousel on mobile
- Contact form stacks on mobile
- Footer columns adapt: 4 → 2 → 1

## 🔧 Content Management

All text and data are separated from components in `src/content/` files. To update content:

1. Edit the appropriate file in `src/content/`
2. No need to touch component code
3. TypeScript ensures type safety

Example:
```typescript
// src/content/home.ts
export const homeContent = {
  topText: "El workspace legal todo en uno",
  title: "Gestiona, automatiza y analiza...",
  // ...
};
```

## ✨ Features

### Interactive Components

#### Why Binder Carousel
- Auto-advances every 5 seconds
- Pauses on hover
- Manual controls (arrows + dots)
- Smooth transitions

#### Solutions Tabs
- 5 tabs showcasing platform capabilities
- Animated tab transitions
- Image placeholder for each solution
- Bullet points for key features

#### Apps Grid
- 6 app cards with unique brand colors
- Development status badges
- Consistent card heights
- Hover effects

#### Testimonials
- Desktop: 3-column grid
- Mobile: Touch-friendly carousel
- Company logos
- Quote styling

#### Contact Form
- Real-time validation
- Error messages
- Required field indicators
- Consent checkbox
- Success state

### Accessibility
- Semantic HTML
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus visible states
- Screen reader friendly

### Performance
- Vite for fast builds
- CSS transitions (no heavy JS animations)
- Lazy loaded sections
- Optimized images (placeholders ready for real assets)

## 🌓 Dark Mode

Dark mode is fully implemented:
- Theme toggle in navigation
- Persists in localStorage
- All sections adapt properly
- Maintains contrast and readability

## 🎯 Next Steps

### To Complete the Site
1. **Replace Image Placeholders**: Add real images to match the designs
2. **Implement Dot Animation**: Add animated background for Home and Solutions
3. **Connect Form**: Hook up contact form to backend/email service
4. **Add Analytics**: Implement tracking (GA, Mixpanel, etc.)
5. **SEO Optimization**: Add meta tags, og:image, structured data
6. **Performance Optimization**: Image optimization, code splitting

### Optional Enhancements
- Add animations with Framer Motion
- Implement scroll-based animations
- Add video backgrounds
- Create blog section
- Add language switcher (ES/EN)

## 📦 Dependencies

### Core
- React 18.2
- TypeScript 5.2
- Vite 5.2

### UI/UX
- Framer Motion 11.0 (ready for animations)
- Swiper 11.0 (carousel library)
- Classnames 2.5 (utility)

### Development
- ESLint + TypeScript ESLint
- @vitejs/plugin-react

## 🤝 Contributing

1. Keep components modular and reusable
2. Maintain the content/component separation
3. Follow the existing CSS variable system
4. Test responsive behavior at all breakpoints
5. Ensure dark mode compatibility

## 📄 License

© 2024 Binder. All rights reserved.

