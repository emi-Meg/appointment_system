import React from "react";
import repair from "../../Assets/Images/repair.png";
import { Link } from "react-router-dom";
import deslogo from "../../Assets/Images/dsm.png";
import smctlogo from "../../Assets/Images/smct_branch.png";

const AfterSubmissionBookingPage: React.FC = () => {
  return (
    <div className="w-full min-h-screen bg-[#0033A0] flex flex-col items-center pt-10 pb-5">
      <img src={repair} alt="Vector" className="w-52 md:w-80 lg:w-96" />
      <h1 className="text-center text-white text-xl md:text-3xl lg:text-4xl font-bold">
        THANK YOU FOR BOOKING YOUR APPOINTMENT WITH US!
      </h1>
      <p className="text-white mt-2 text-base px-5 md:text-xl lg:text-xl text-center">
        We’ve successfully received your booking, and we’re excited to serve
        you!
      </p>
      <p className="text-white text-base md:text-xl lg:text-xl font-semibold mt-5 md:mt-10 lg:mt-10 text-center">
        Need to Reschedule or Have Questions?
      </p>
      <p className="text-white px-4 text-xs md:text-base lg:text-base text-center w-full lg:w-[1300px]">
        Reach out to us via email at <strong>info@strongmotocentrum.com</strong>{" "}
        or call us at <strong>(+63) 970 192 9564</strong>.
      </p>
      <div className="mt-5 md:mt-10">
        <Link to="/guestbooking">
          <button className="py-2 px-3 md:py-3 md:px-5 bg-[#FF6600] hover:bg-[#E65C00] text-white font-semibold rounded-3xl uppercase transition-all duration-200 hover:scale-105 active:scale-95">
            Book Another Appointment
          </button>
        </Link>
      </div>
      <div className="mt-10 md:mt-12 lg:mt-16 px-5">
        <p className="text-sm text-white font-medium">
          Feel free to explore our products on our website:
        </p>
        <div className="flex flex-col md:flex-row lg:flex-row gap-5 mt-3">
          <a
            href="https://desstrongmotors.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={deslogo}
              alt="DES Strong Motors"
              className="cursor-pointer hover:scale-105"
            />
          </a>
          <a
            href="https://strongmotocentrum.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={smctlogo}
              alt="SMCT, Inc."
              className="cursor-pointer hover:scale-105"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default AfterSubmissionBookingPage;
