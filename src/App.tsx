import { ThemeProvider } from './context/ThemeContext';
import { Navigation } from './components/layout/Navigation';
import { Home } from './components/sections/Home';
import { WhyBinder } from './components/sections/WhyBinder';
import { Solutions } from './components/sections/Solutions';
import { Apps } from './components/sections/Apps';
import { Testimonials } from './components/sections/Testimonials';
import { Contact } from './components/sections/Contact';
import { Footer } from './components/sections/Footer';
import './styles/globals.css';

function App() {
  return (
    <ThemeProvider>
      <div className="app">
        <Navigation />
        <main>
          <Home />
          <WhyBinder />
          <Solutions />
          <Apps />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;

