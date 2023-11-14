import React, { useCallback } from 'react'

import Particles from "react-tsparticles";
import { Container, Engine } from 'tsparticles-engine';
import { loadSlim } from "tsparticles-slim";

function index({ theme }: any) {

  //PARTICLES FUNCTIONS
  const particlesInit = useCallback(async (engine: Engine) => {
    // console.log(engine);

    // you can initialize the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    //await loadFull(engine);
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    // await console.log(container);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        // background: {
        //   color: {
        //     // value: "#ffffff",
        //   },
        // },
        fpsLimit: 120,
        // interactivity: {
        //   events: {
        //     onClick: {
        //       enable: true,
        //       mode: "push",
        //     },
        //     onHover: {
        //       enable: true,
        //       mode: "repulse",
        //     },
        //     resize: true,
        //   },
        //   modes: {
        //     push: {
        //       quantity: 4,
        //     },
        //     repulse: {
        //       distance: 200,
        //       duration: 0.4,
        //     },
        //   },
        // },
        particles: {
          color: {
            value: theme.white,
          },
          links: {
            color: theme.mainpurple,
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: false,
            speed: 3,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 1200,
            },
            value: 10,
          },
          opacity: {
            value: 0.5,
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 200, max: 200 },
          },
        },
        detectRetina: true,
      }}
    />
  )
}

export default index