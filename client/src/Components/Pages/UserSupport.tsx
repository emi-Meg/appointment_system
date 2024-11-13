import React from "react";
import vector from "../../Assets/Images/support.png";
import faq from "../../Assets/Images/question.png";
import communications from "../../Assets/Images/communications.png";
import feedbacks from "../../Assets/Images/marketing.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { faFacebookMessenger } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import ratings from "../../Data/FeedbacksData.json";
import { Card, CardContent, Rating, Typography } from "@mui/material";

const SupportUser: React.FC = () => {
  return (
    <>
      <div className="flex flex-col w-full">
        <div className="w-full bg-[#E0F7FA] flex flex-col items-center py-5">
          <img src={vector} alt="" className="w-[800px]" />
          <p className="text-center mx-64 font-medium">
            <span className="font-semibold text-xl">
              Welcome to our Customer Support Page!
            </span>
            <br />
            We're so glad you're here. Whether you're booking your first
            appointment or managing your schedule, we want to make your
            experience as easy and seamless as possible.
            <br /> Our support team is dedicated to providing quick, helpful,
            and friendly assistance every step of the way.
          </p>
        </div>
        <div className="mt-5">
          <div className="px-24 flex w-full">
            <div className="flex items-start justify-between w-full">
              <img src={communications} alt="" className="w-52" />
              <div>
                <div className="pt-5 flex flex-col items-center">
                  <h2 className="text-2xl font-semibold">CONTACT US</h2>
                  <div className="mt-3">
                    <label htmlFor="name" className="font-semibold">
                      Name
                    </label>
                    <br />
                    <input
                      type="text"
                      id="name"
                      placeholder="Enter your name..."
                      className="bg-[#f5f5f5] p-2 rounded-lg mb-2 w-96"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="font-semibold">
                      Email
                    </label>
                    <br />
                    <input
                      type="email"
                      id="email"
                      placeholder="Enter your email..."
                      className="bg-[#f5f5f5] p-2 rounded-lg mb-2 w-96"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="font-semibold">
                      Message
                    </label>
                    <br />
                    <textarea
                      typeof="text"
                      id="message"
                      placeholder="Enter your message..."
                      className="bg-[#f5f5f5] p-2 rounded-lg mb-2 w-96"
                    />
                  </div>
                  <button className="w-full font-semibold bg-[#FF6600] py-2 rounded-lg text-white active:scale-95 active:border-2 active:bg-[#E65C00] active:border-[#333]">
                    SEND
                  </button>
                </div>
              </div>
              <div className="flex pt-5 flex-col gap-3">
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    size="lg"
                    color="#333"
                  />
                  <p>Alano Corner Jamisola St.,Pagadian City</p>
                </div>
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faEnvelope} size="lg" color="#333" />
                  <p>info@strongmotocentrum.com</p>
                </div>
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faPhone} size="lg" color="#333" />
                  <p>(+63) 970 192 9564</p>
                </div>
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon
                    icon={faFacebookMessenger}
                    size="lg"
                    color="#333"
                  />
                  <p>Strong Moto Centrum Chat</p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full pt-16 px-24">
            <div className="flex justify-between flex-row-reverse">
              <img src={faq} alt="FAQs" className="w-52" />
              <div className="w-full">
                <div className="flex flex-col">
                  <h2 className="text-4xl font-semibold text-center text-[#333]">
                    Need help? Check our FAQs!
                  </h2>
                  <div className="flex items-stretch justify-evenly mt-8 px-10 gap-5">
                    <div className="border-[#EBEBE4] border-2 w-full flex justify-center items-center p-3 rounded-lg transition-all duration-150 hover:scale-105 cursor-pointer">
                      <p className="text-center text-xl font-medium">
                        Cancel or reschedule an appointment?
                      </p>
                    </div>
                    <div className="border-[#EBEBE4] border-2 w-full flex justify-center items-center p-3 rounded-lg transition-all duration-150 hover:scale-105 cursor-pointer">
                      <p className="text-center text-xl font-medium">
                        Payment methods?
                      </p>
                    </div>
                    <div className="border-[#EBEBE4] border-2 w-full flex justify-center items-center p-3 rounded-lg transition-all duration-150 hover:scale-105 cursor-pointer">
                      <p className="text-center text-xl font-medium">
                        Warranty on repairs?
                      </p>
                    </div>
                    <div className="border-[#EBEBE4] border-2 w-full flex justify-center items-center p-3 rounded-lg transition-all duration-150 hover:scale-105 cursor-pointer">
                      <p className="text-center text-xl font-medium">
                        Business hours?
                      </p>
                    </div>
                  </div>
                  <div className="mt-5 flex justify-center">
                    <Link to="/user/faqs">
                      <button className="bg-[#0033A0] text-white px-10 py-3 rounded-2xl font-semibold hover:scale-105 active:scale-95">
                        SEE MORE FAQs
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full pt-16 px-24">
            <h2 className="text-4xl font-semibold text-center text-[#333]">
              Curious About How Others Feel? Check Out More Feedback!
            </h2>
            <div className="flex w-full gap-5 mt-8">
              <img src={feedbacks} alt="Feedbacks" className="w-52" />
              {ratings
                .filter((feedback) => feedback.id <= 4)
                .map((feedback) => (
                  <Card key={feedback.id} sx={{ width: "100%" }}>
                    <CardContent>
                      <Typography
                        gutterBottom
                        sx={{ color: "text.secondary", fontSize: 14 }}
                      >
                        {feedback.customerName}
                      </Typography>
                      <Typography variant="h5" component="div">
                        {feedback.branch}
                      </Typography>
                      <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                        {feedback.date}
                      </Typography>
                      <Typography variant="body2">
                        {feedback.ratingComment}
                      </Typography>
                      <Rating
                        name="read-only"
                        value={feedback.ratingScore}
                        readOnly
                      />
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
                  <div className="mt-5 flex justify-center">
                    <Link to="/user/feedbacks">
                      <button className="bg-[#0033A0] text-white px-10 py-3 rounded-2xl font-semibold hover:scale-105 active:scale-95">
                        SEE MORE FEEDBACKS
                      </button>
                    </Link>
                  </div>
        </div>
      </div>
    </>
  );
};

export default SupportUser;
