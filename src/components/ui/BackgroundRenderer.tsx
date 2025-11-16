import { useBackground } from '../../context/BackgroundContext';
import { GentleWaves } from '../sections/GentleWaves';
import { CanyonMultiLayerFlows } from '../sections/CanyonFlows';
import { FlowingPattern } from '../sections/FlowPattern';
import './BackgroundRenderer.css';

export const BackgroundRenderer = () => {
  const { background } = useBackground();

  if (background === 'none') {
    return null;
  }

  return (
    <div className="background-renderer">
      {background === 'gentle-waves' && <GentleWaves />}
      {background === 'canyon-flows' && <CanyonMultiLayerFlows />}
      {background === 'flow-pattern' && <FlowingPattern />}
    </div>
  );
};

