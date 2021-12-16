
import React, { useContext } from "react";
import { PropTypes } from "prop-types";

import { GlobalStateContext } from "../../context/GlobalContextProvider";

export default function MoonTexture({ x, y, r }) {

  const { moonPhase } = useContext(GlobalStateContext);

  const craters = [ 
    { r: r / 5, x: 15, y: 35 },
    { r: r / 6, x: 21, y: 11 },
    { r: r / 8, x: 32, y: 21 },
    { r: r / 7, x: 28, y: 42 },
    { r: r / 6, x: 48, y: 32 },
  ];

  return (
    <g>
      <defs>
        <filter
          id="moon-crater-shadow"
          x="-50%"
          y="-50%"
          width="200%"
          height="200%">
          <feComponentTransfer in="SourceAlpha">
            <feFuncA type="table" tableValues="1 0" />
          </feComponentTransfer>
          <feGaussianBlur stdDeviation="0"/>
          <feOffset dx="1" dy="1" result="offsetblur"/>
          <feFlood floodColor="#c0beb3" result="color"/>
          <feComposite in2="offsetblur" operator="in"/>
          <feComposite in2="SourceAlpha" operator="in" />
          <feMerge>
            <feMergeNode in="SourceGraphic" />
            <feMergeNode />
          </feMerge>
        </filter> 

        { moonPhase.includes("Gibbous") && (
          <mask id="moon-phase">
            <circle
              fill="white"
              opacity="0.95"
              cx={ moonPhase.includes("Waxing") ? x + 10 : x - 10 }
              cy={ y }
              r={ r } />
          </mask>
        ) }

        { moonPhase.includes("Quarter") && (
          <mask id="moon-phase">
            <circle
              fill="white"
              opacity="0.95"
              cx={ moonPhase.includes("First") ? x - (r * 2.75) : x + (r * 2.75) }
              cy={ y }
              r={ r * 3 } />
          </mask>
        ) }

        { moonPhase === "NewMoon" && (
          <mask id="moon-phase">
            <circle
              fill="white"
              opacity="0.1"
              r={ r }
              cx={ x }
              cy={ y } />
          </mask>
        ) }

        { moonPhase.includes("Crescent") && (
          <mask id="moon-phase">
            <rect
              width="100%"
              height="100%"
              fill="white"
              opacity="0.95"
              cx="0"
              cy="0" />
            <circle
              cx={ moonPhase.includes("Waxing") ? x - 18 : x + 18 }
              cy={ y }
              r={ r } />
          </mask>
        ) }
      </defs>

      <svg
        x={ x }
        y={ y }
        width={ r * 2 }
        height={ r * 2 }>

        <circle
          fill="var(#sky-gradient)"
          opacity="0.175"
          cx={ r }
          cy={ r }
          r={ r } />

        <circle
          fill="var(--color-moon)"
          cx={ r }
          cy={ r }
          r={ r }
          mask="url(#moon-phase)" />

        {
          craters.map(({r, x, y}, i) => (
            <circle
              key={ i }
              r={ r }
              cx={ x }
              cy={ y }
              mask="url(#moon-phase)"
              filter="url(#moon-crater-shadow)"
              fill="var(--color-moon-crater)"
            />
          ))
        }
      </svg>
    </g>
  );
}

MoonTexture.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  r: PropTypes.number.isRequired
};

