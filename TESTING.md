# Testing Guide - Binder Web

## Manual Testing Checklist

### 🏠 Home Section
- [ ] Page loads correctly
- [ ] Title and subtitle are visible and centered
- [ ] Image placeholder displays properly
- [ ] "Solicita tu Demo" button is visible and styled correctly
- [ ] Button click scrolls to contact section
- [ ] Background gradient displays properly
- [ ] Responsive: Text scales appropriately on mobile

### 🔄 Why Binder Carousel
- [ ] Carousel auto-advances every 5 seconds
- [ ] Hover pauses the auto-advance
- [ ] Manual arrow controls work (prev/next)
- [ ] Indicator dots show current slide
- [ ] Clicking dots navigates to specific slides
- [ ] Smooth transitions between slides
- [ ] Floating icons display around the container
- [ ] Responsive: Arrows hidden on mobile, touch swipe works

### 📊 Solutions Tabs
- [ ] All 5 tabs are visible
- [ ] Clicking a tab shows its content
- [ ] Active tab is highlighted
- [ ] Tab transitions are smooth
- [ ] Image and text display side by side
- [ ] Bullet points render correctly
- [ ] Responsive: Content stacks vertically on mobile

### 📱 Apps Grid
- [ ] All 6 app cards display in 3-column grid
- [ ] Each card has unique color
- [ ] "En desarrollo" badges show for pending apps
- [ ] Hover effects work on cards
- [ ] Card heights are consistent
- [ ] "Ver más" links are visible
- [ ] Responsive: 2 columns on tablet, 1 on mobile

### 💬 Testimonials
- [ ] 3 testimonials display in grid (desktop)
- [ ] Company logos/placeholders visible
- [ ] Cards have proper styling with shadows
- [ ] Hover effects work
- [ ] Responsive: Carousel appears on mobile
- [ ] Mobile: Swipe works, dots navigate
- [ ] Mobile: Arrow controls function

### 📧 Contact Form
- [ ] Form displays with proper layout (split 50/50)
- [ ] All input fields are visible
- [ ] Placeholder text is clear
- [ ] Clicking submit without filling shows errors
- [ ] Email validation works
- [ ] Consent checkbox is required
- [ ] Success state shows after valid submission
- [ ] Form resets after 3 seconds
- [ ] Responsive: Form stacks on mobile

### 🔗 Footer
- [ ] All 4 columns display
- [ ] Links are clickable
- [ ] LinkedIn icon and link present
- [ ] Legal note displays at bottom
- [ ] Teal background color
- [ ] White text is readable
- [ ] Responsive: Columns stack on mobile

### 🧭 Navigation
- [ ] Logo is visible and clickable
- [ ] All nav links are present
- [ ] Theme toggle button works
- [ ] Demo and Login buttons visible
- [ ] Navigation becomes scrolled style after 50px
- [ ] Clicking nav links scrolls to sections
- [ ] Responsive: Hamburger menu appears on mobile
- [ ] Mobile menu opens/closes correctly
- [ ] Mobile menu shows all links and buttons

### 🌓 Dark Mode
- [ ] Theme toggle switches between light/dark
- [ ] Preference persists on page reload
- [ ] All sections adapt to dark mode
- [ ] Text remains readable in dark mode
- [ ] Buttons maintain proper contrast
- [ ] Form inputs are styled correctly
- [ ] Footer adapts appropriately

### 📱 Responsive Testing

#### Desktop (1200px+)
- [ ] All sections fit properly
- [ ] Navigation shows all items
- [ ] Grid layouts use full columns
- [ ] Images and text are balanced

#### Tablet (768px - 968px)
- [ ] Navigation may collapse
- [ ] Grids adjust to 2 columns
- [ ] Text sizes scale down slightly
- [ ] Touch interactions work

#### Mobile (< 640px)
- [ ] Hamburger menu appears
- [ ] Single column layouts
- [ ] Font sizes reduce appropriately
- [ ] Touch targets are large enough
- [ ] Carousels are swipeable
- [ ] No horizontal scroll

### ♿ Accessibility
- [ ] All interactive elements are keyboard accessible
- [ ] Tab order is logical
- [ ] Focus states are visible
- [ ] Form labels are present (placeholders)
- [ ] Buttons have aria-labels where needed
- [ ] Color contrast meets WCAG standards
- [ ] Images have alt text/descriptions

### ⚡ Performance
- [ ] Page loads in under 3 seconds
- [ ] Smooth scrolling between sections
- [ ] No layout shifts during load
- [ ] Animations don't cause jank
- [ ] CSS transitions are smooth
- [ ] No console errors

## Browser Testing Matrix

Test in the following browsers:

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

## Common Issues to Check

### Layout Issues
- Text overflow in cards
- Broken grids at specific widths
- Overlapping content
- Missing spacing

### Interaction Issues
- Buttons not clickable
- Forms not submitting
- Carousel not advancing
- Navigation not scrolling

### Visual Issues
- Colors not matching design
- Fonts not loading
- Images not displaying
- Dark mode inconsistencies

## Testing Commands

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## Automated Testing (Future)

For production-ready code, consider adding:

1. **Unit Tests** (Vitest + React Testing Library)
   - Test component rendering
   - Test user interactions
   - Test form validation

2. **E2E Tests** (Playwright/Cypress)
   - Test full user flows
   - Test navigation
   - Test form submission

3. **Visual Regression** (Percy/Chromatic)
   - Catch unintended visual changes
   - Test across browsers

4. **Accessibility Tests** (axe-core)
   - Automated a11y checks
   - WCAG compliance

## Reporting Issues

When reporting a bug, include:
- Browser and version
- Screen size/device
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Console errors if any

