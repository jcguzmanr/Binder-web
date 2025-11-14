import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { Navigation } from './components/layout/Navigation';
import { Home } from './components/sections/Home';
import { WhyBinder } from './components/sections/WhyBinder';
import { Solutions } from './components/sections/Solutions';
import { Apps } from './components/sections/Apps';
import { Testimonials } from './components/sections/Testimonials';
import { Contact } from './components/sections/Contact';
import { Footer } from './components/sections/Footer';
import { Test } from './components/sections/Test';
import './styles/globals.css';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="app">
          <Navigation />
          <Routes>
            <Route
              path="/test"
              element={<Test />}
            />
            <Route
              path="/"
              element={
                <main>
                  <Home />
                  <WhyBinder />
                  <Solutions />
                  <Apps />
                  <Testimonials />
                  <Contact />
                </main>
              }
            />
          </Routes>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;

