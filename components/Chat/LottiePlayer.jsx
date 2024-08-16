import React, { useEffect } from 'react';

const LottiePlayer = ({widths,heights}) => {
  // console.log(widths)
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs';
    document.head.appendChild(script);

    script.onload = () => {
      // console.log('dotLottie Player module loaded.');
    };

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div>
      <dotlottie-player
        src="https://lottie.host/b24e17b0-e556-4f4c-bfdd-ec36677bf8a8/7uBJoOFEsb.json"
        background="transparent"
        speed="1"
        style={{ width:widths, height: heights }}
        direction="1"
        mode="normal"
        loop
        autoplay
      ></dotlottie-player>
    </div>
  );
};

export default LottiePlayer;
