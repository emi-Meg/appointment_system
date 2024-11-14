import React from "react";
import building from "../../Assets/Images/HO-Building.png";
import vision from "../../Assets/Images/vision.png";
import mission from "../../Assets/Images/target.png";
import values from "../../Assets/Images/values.png";

const AboutUs: React.FC = () => {
  return (
    <div className="w-full px-96 py-20">
      <div className="flex w-full justify-between gap-20 mb-20">
        <div className="flex flex-col justify-center w-full text-justify space-y-10">
          <h3 className="text-3xl font-semibold">About Us</h3>
          <p>
            Strong Moto Centrum, Inc. operates as a multi-brand motorcycle,
            appliances, and tri-wheeler dealership, aiming to be one of the
            leading dealers in the Philippines.
          </p>
          <p>
            Our branches in major cities like Cavite, Laguna, Cebu, Davao,
            Cagayan de Oro, Zamboanga, and other areas in Luzon, Visayas, and
            Mindanao are open to cater to our customer’s needs. With over 30
            branches nationwide, we are always ready to give you the best
            motorcycles and appliances that will suit your needs.
          </p>
          <p>
            At present, we are increasing our efforts in expanding to reach a
            larger number of customers to help bring comfort to their homes, as
            we continue to offer quality service and improve customer
            experience.{" "}
          </p>
        </div>
        <img src={building} alt="HO Building" className="w-1/2" />
      </div>
      <div className="flex w-full justify-between gap-20">
        <img src={vision} alt="Vision" className="w-72" />
        <div className="flex flex-col justify-center w-full text-left space-y-10">
          <h3 className="text-3xl font-semibold">Our Vision</h3>
          <p className="w-2/4 text-lg">
            To become the leader in the Philippine vehicle and appliance
            industry. We believe in improving the quality of life of Filipinos
            both inside and outside their homes.
          </p>
        </div>
      </div>
      <div className="flex w-full">
        <div className="flex flex-col justify-center items-end w-full text-end space-y-10">
          <h3 className="text-3xl font-semibold">Our Mission</h3>
          <p className="text-lg w-2/4">
          We offer quality technology and excellent services that are affordable and accessible to all Filipinos. 
          </p>
        </div>
        <img src={mission} alt="Mission" className="w-72" />
      </div>
      <div className="flex flex-col items-center w-full">
        <div className="flex items-center justify-center w-full bg-[#E0F7FA] mb-5">
        <img src={values} alt="Core Values" className="w-52"/>
        <h3 className="text-4xl font-semibold uppercase">Our Core Values</h3>
        </div>
        <div className="space-y-2">
            <p>Every interaction with our customers, partners, and employees is guided by being a L.E.A.D.E.R in mind: </p>
            <p><strong>L –</strong> Loyalty </p>
            <p>We are dedicated to our company, customers, and co-workers.</p>
            <p><strong>E–</strong> Expertise </p>
            <p>We are professionals on the job and in our field.</p>
            <p><strong>A –</strong> Accountability</p>
            <p>We take ownership of our work.</p>
            <p><strong>D–</strong> Diligence</p>
            <p>We work hard and persevere.</p>
            <p><strong>E –</strong> Efficiency</p>
            <p>We make the best use of our time and energy in the service of our customers. </p>
            <p><strong>R –</strong> Respect</p>
            <p>We hold our company, co-workers, customers, and partners in high regard.</p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
