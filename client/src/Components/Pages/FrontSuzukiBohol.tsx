import React from "react";
import "../../Styles/FrontPage.css";
import suzuki_bohol from "../../Assets/Images/suzuki_auto_bohol.png";
import suzukibhl_sample from "../../Assets/Images/suzukibhl_img_sample.png";

const SuzukiBoholFront: React.FC = () => {

  return (
    <div>
      <div className="smct-background absolute top-0 left-0 w-full h-full bg-[#F0F8FF] clip-path-custom-polygon z-[-1]"></div>
      <div className="smct-container">
        <div className="smct-logo pt-12 pl-24">
          <img src={suzuki_bohol} alt="Suzuki Bohol Logo" className="w-96" />
        </div>
        <div className="smct-body1 flex justify-center items-center mr-80 ml-80 mt-44">
          <div className="smct-welcome opacity-0 animate-fade-in delay-1000">
            <div className="smct-welcome-title">
              <h1 className="text-center text-4xl font-bold">
                Rev Up Your Ride with Ease!
              </h1>
            </div>
            <div className="smct-welcome-message mt-10">
              <p className="text-xl text-center">
                Feeling the need for a tune-up or repair? Take a break from the
                hassle and book your car or motorcycle service with us. No more
                waiting or lengthy phone calls—schedule your appointment online
                effortlessly. Enjoy our seamless booking service and keep your
                vehicle in top shape. <br /> Book your service today!
              </p>
            </div>
            <div className="smct-btn flex justify-center mt-10">
              <button className="text-xl font-semibold border-none bg-[#2F4F4F] text-white w-72 h-14 rounded-full cursor-pointer">
                BOOK APPOINTMENT
              </button>
            </div>
          </div>
          <div className="smct-img">
            <img
              src={suzukibhl_sample}
              alt="Suzuki Auto Bohol"
              className="w-['600px'] animate-slide-in-left"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuzukiBoholFront;
