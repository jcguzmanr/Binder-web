import { useBackground } from '../../context/BackgroundContext';
import './BackgroundRenderer.css';

export const BackgroundRenderer = () => {
  const { background } = useBackground();

  if (background === 'none') {
    return null;
  }

  return (
    <div className="background-renderer">
      {background === 'video' && (
        <video
          className="background-renderer-video"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
        >
          <source src="/videos/videobackground.mp4" type="video/mp4" />
        </video>
      )}

      {/*
        Temporalmente desactivado: fondos animados previos.
        <GentleWaves accentColor={accentColor} />
        <CanyonMultiLayerFlows accentColor={accentColor} />
        <FlowingPattern accentColor={accentColor} />
        <AntigravityHero asBackground={true} />
      */}
    </div>
  );
};
