import React, { useEffect, useState } from "react";

import * as styles from "./clock.module.css";

const emojis = [
  "🕐","🕑","🕒","🕓","🕔","🕕","🕖","🕗","🕘","🕙","🕚","🕛",
];

export default function Clock() {

  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(time => (time >= emojis.length - 1) ? 0 : time + 1);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className={ styles.clock }>{ emojis[time] }</span>
  );
}
