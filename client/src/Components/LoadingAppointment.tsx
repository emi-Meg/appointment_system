import Lottie from "lottie-react";
import React from "react";
import loading from "../Assets/Lottie/loading_lottie.json";

const LoadingAppointment: React.FC = () => {
  return (
    <div>
      <Lottie
        animationData={loading}
        loop={true}
        autoPlay={true}
        style={{
          width: "100px",
        }}
      />
    </div>
  );
};

export default LoadingAppointment;