import "./Eye.scss";
import React, { useState, useEffect } from "react";

const Eye: React.FC = () => {

  const [eyeRotation, setEyeRotation] = useState(0);

  useEffect(() => {
    document.addEventListener("mousemove", moveEyeball);
  }, []);

  // document.addEventListener("mousemove", moveEyeball);

  function moveEyeball(event: MouseEvent) {
    const eye = document.getElementById("eye");

    if (eye) {
      let x = eye.getBoundingClientRect().left + eye.clientWidth / 2;
      let y = eye.getBoundingClientRect().top + eye.clientHeight / 2;
  
      let radian = Math.atan2(event.pageX - x, event.pageY - y);
      let rotate = radian * (180 / Math.PI) * -1 + 270;
      setEyeRotation(rotate);
    }
  }
  
  return (
    <div className="eye" id="eye" style={{transform: `rotate(${eyeRotation}deg)`}}>
      <div className="eye__ball"></div>
    </div>
  );
};

export default Eye;