import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { BackgroundProvider } from './context/BackgroundContext';
import { Navigation } from './components/layout/Navigation';
import { BackgroundRenderer } from './components/ui/BackgroundRenderer';
import { Home } from './components/sections/Home';
import { WhyBinder } from './components/sections/WhyBinder';
import { Solutions } from './components/sections/Solutions';
import { Apps } from './components/sections/Apps';
import { Testimonials } from './components/sections/Testimonials';
import { Contact } from './components/sections/Contact';
import { Footer } from './components/sections/Footer';
import { GentleWavesPage } from './components/sections/GentleWaves';
import { CanyonFlowsPage } from './components/sections/CanyonFlows';
import { FlowPatternPage } from './components/sections/FlowPattern';
import { PorQueBinderPage } from './pages/PorQueBinderPage';
import { FuncionalidadesPage } from './pages/FuncionalidadesPage';
import { SolucionesPage } from './pages/SolucionesPage';
import { TestimoniosPage } from './pages/TestimoniosPage';
import { ContactoPage } from './pages/ContactoPage';
import { PrivacidadPage } from './pages/legal/PrivacidadPage';
import { TerminosPage } from './pages/legal/TerminosPage';
import { AvisoLegalPage } from './pages/legal/AvisoLegalPage';
import { SeguridadPage } from './pages/legal/SeguridadPage';
import { ReclamacionesPage } from './pages/legal/ReclamacionesPage';
import { CLMPage } from './pages/casos-uso/CLMPage';
import { GestionProcesosPage } from './pages/casos-uso/GestionProcesosPage';
import { ExpedienteDigitalPage } from './pages/casos-uso/ExpedienteDigitalPage';
import './styles/globals.css';

function App() {
  return (
    <ThemeProvider>
      <BackgroundProvider>
        <Router>
          <div className="app">
            <BackgroundRenderer />
            <Navigation />
            <Routes>
              <Route
                path="/gentle-waves"
                element={<GentleWavesPage />}
              />
              <Route
                path="/canyon-flows"
                element={<CanyonFlowsPage />}
              />
              <Route
                path="/flow-pattern"
                element={<FlowPatternPage />}
              />
              <Route
                path="/porquebinder"
                element={<PorQueBinderPage />}
              />
              <Route
                path="/funcionalidades"
                element={<FuncionalidadesPage />}
              />
              <Route
                path="/soluciones"
                element={<SolucionesPage />}
              />
              <Route
                path="/testimonios"
                element={<TestimoniosPage />}
              />
              <Route
                path="/contacto"
                element={<ContactoPage />}
              />
              <Route
                path="/legal/privacidad"
                element={<PrivacidadPage />}
              />
              <Route
                path="/legal/terminos"
                element={<TerminosPage />}
              />
              <Route
                path="/legal/aviso"
                element={<AvisoLegalPage />}
              />
              <Route
                path="/legal/seguridad"
                element={<SeguridadPage />}
              />
              <Route
                path="/legal/reclamaciones"
                element={<ReclamacionesPage />}
              />
              <Route
                path="/casos-uso/clm"
                element={<CLMPage />}
              />
              <Route
                path="/casos-uso/gestion-procesos"
                element={<GestionProcesosPage />}
              />
              <Route
                path="/casos-uso/expediente-digital"
                element={<ExpedienteDigitalPage />}
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
      </BackgroundProvider>
    </ThemeProvider>
  );
}

export default App;

