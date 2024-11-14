import { Grid2 } from "@mui/material";
import React from "react";
import vector from "../../Assets/Images/support.png";
// import faq from "../../Assets/Images/question.png";
// import communications from "../../Assets/Images/communications.png";
// import feedbacks from "../../Assets/Images/marketing.png";
import { Link } from "react-router-dom";
import ratings from "../../Data/FeedbacksData.json";
import { Card, CardContent, Rating, Typography } from "@mui/material";

const SupportUser: React.FC = () => {
  return (
    <>
      <Grid2 container spacing={2}>
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
        <Grid2 size={{ lg: 2, sm: 1, xs: 1 }} />
        <Grid2 size={{ lg: 8, sm: 10, xs: 10 }}>
          <div className="flex flex-col mt-10">
            <div className="flex w-full">
              <div className="flex items-start justify-between w-full px-24">
                {/* <img src={communications} alt="" className="w-52" /> */}
                <div className="w-full">
                  <div className="pt-5 px-20 w-full flex flex-col items-center">
                    <h2 className="text-4xl font-semibold text-center text-[#333]">
                      CONTACT US
                    </h2>
                    <div className="mt-3 w-full">
                      <label htmlFor="name" className="font-semibold">
                        Name
                      </label>
                      <br />
                      <input
                        type="text"
                        id="name"
                        placeholder="Enter your name..."
                        className="bg-[#f5f5f5] p-2 rounded-lg mb-2 w-full"
                      />
                    </div>
                    <div className="w-full">
                      <label htmlFor="email" className="font-semibold">
                        Email
                      </label>
                      <br />
                      <input
                        type="email"
                        id="email"
                        placeholder="Enter your email..."
                        className="bg-[#f5f5f5] p-2 rounded-lg mb-2 w-full"
                      />
                    </div>
                    <div className="w-full">
                      <label htmlFor="message" className="font-semibold">
                        Message
                      </label>
                      <br />
                      <textarea
                        typeof="text"
                        id="message"
                        placeholder="Enter your message..."
                        className="bg-[#f5f5f5] p-2 rounded-lg mb-2 w-full"
                        rows={4}
                      />
                    </div>
                    <button className="w-full font-semibold bg-[#FF6600] py-2 rounded-lg text-white active:scale-95 active:border-2 active:bg-[#E65C00] active:border-[#333]">
                      SEND
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full pt-16 px-24">
              <h2 className="text-4xl font-semibold text-center text-[#333]">
                Need help? Check our FAQs!
              </h2>
              <div className="flex justify-between">
                {/* <img src={faq} alt="FAQs" className="w-52" /> */}
                <div className="w-full">
                  <div className="flex flex-col">
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
                {/* <img src={feedbacks} alt="Feedbacks" className="w-52" /> */}
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
        </Grid2>
        <Grid2 size={{ lg: 2, sm: 1, xs: 1 }} />
      </Grid2>
    </>
  );
};

export default SupportUser;
