import { useBackground } from '../../context/BackgroundContext';
import { useLocation } from 'react-router-dom';
import { GentleWaves } from '../sections/GentleWaves';
import { CanyonMultiLayerFlows } from '../sections/CanyonFlows';
import { FlowingPattern } from '../sections/FlowPattern';
import './BackgroundRenderer.css';

export const BackgroundRenderer = () => {
  const { background } = useBackground();
  const location = useLocation();

  if (background === 'none') {
    return null;
  }

  // Determine accent color based on current route
  let accentColor: { r: number; g: number; b: number } | null = null;
  
  if (location.pathname === '/casos-uso/expediente-digital') {
    // Expediente Digital: #5fbdff (95, 189, 255)
    accentColor = { r: 95, g: 189, b: 255 };
  } else if (location.pathname === '/casos-uso/clm') {
    // Deals: #6d3cff (109, 60, 255)
    accentColor = { r: 109, g: 60, b: 255 };
  }

  return (
    <div className="background-renderer">
      {background === 'gentle-waves' && <GentleWaves accentColor={accentColor} />}
      {background === 'canyon-flows' && <CanyonMultiLayerFlows accentColor={accentColor} />}
      {background === 'flow-pattern' && <FlowingPattern accentColor={accentColor} />}
    </div>
  );
};

