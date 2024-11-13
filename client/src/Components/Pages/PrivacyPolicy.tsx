import React from "react";
import compliance from "../../Assets/Images/compliant.png";

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col justify-center items-center mt-10 py-5 border-2 w-3/4">
        <img src={compliance} alt="Privacy Policy" className="w-24" />
        <h3 className="text-center mt-3 text-2xl font-semibold text-[#333]">
          PRIVACY POLICY STATEMENT
        </h3>
        <div className="mt-4 text-justify text-[#333] px-10">
          <p>
            <strong>STRONG MOTO CENTRUM, INC.</strong> (“the Corporation”)
            values your data privacy. Please be informed of the policies
            followed by the Corporation as detailed in the following statements.
          </p>
          <p className="mt-5">
            WHAT MAY THE CORPORATION DO WITH YOUR PERSONAL DATA?
          </p>
          <p className="mt-5">
            To process customer orders, approve credit applications or both,
            <strong>STRONG MOTO CENTRUM, INC.</strong> will process the
            following categories of personal information, among others:
          </p>
          <p className="mt-5">
            -Contact information such as name, address, e-mail address and
            contact numbers;
          </p>
          <p>-Payment information and payment history;</p>
          <p>-Credit information;</p>
          <p>-Order information and order history;</p>
          <p>
            -Comments and feedback regarding products and services provided by
            <strong>STRONG MOTO CENTRUM, INC.</strong>;
          </p>
          <p>
            -Survey-related information that will allow{" "}
            <strong>STRONG MOTO CENTRUM, INC.</strong> to improve its customer
            services
          </p>
          <p className="mt-5">
            <strong>STRONG MOTO CENTRUM, INC.</strong> reserves the right to
            refuse processing of purchase orders, disapprove credit
            applications, or both if customer expressly refuses to authorize the
            Corporation to process the latter’s personal information.
          </p>
          <p className="mt-5">
            HOW DOES STRONG MOTO CENTRUM, INC. PROCESS YOUR PERSONAL
            INFORMATION?
          </p>
          <p className="mt-5">
            In order to provide our customers with the best possible products
            and customer service, we use the information gathered to do any or
            all of the following acts:
          </p>
          <p className="mt-5">
            -To improve the website, social media accounts and overall customer
            experience;
          </p>
          <p>
            -To process customer orders and survey results which may include
            communication from <strong>STRONG MOTO CENTRUM, INC.</strong> to
            customers using the personal information provided;
          </p>
          <p>
            -To properly handle and resolve customer queries and complaints;{" "}
          </p>
          <p>-To inform customers of promotions and special deals; </p>
          <p>
            -To use location-related services to show the nearest branch to the
            customer’s current location or company activities based on
            customer’s location;
          </p>
          <p>
            -To share anonymous or aggregated information to the Corporation’s
            affiliates and suppliers solely for the purpose of improving
            customer satisfaction.
            <strong>STRONG MOTO CENTRUM, INC.</strong> will never sell, barter
            or exchange your personal information to a third party;
          </p>
          <p>
            -To share anonymous or aggregated information to the Corporation’s
            affiliates and suppliers solely for the purpose of improving
            customer satisfaction. <strong>STRONG MOTO CENTRUM, INC.</strong>{" "}
            will never sell, barter or exchange your personal information to a
            third party;
          </p>
          <p>
            -To share information in compliance with any legal requirement with
            government regulatory agencies such as the Bureau of Internal
            Revenue (BIR), Land Transportation Office (LTO), Department of Trade
            and Industry (DTI), among others;
          </p>
          <p className="mt-5">
            Please note that Republic Act No. 10173, also known as the Data
            Privacy Act of 2012, issued by the National Privacy Commission in
            August 2012 provides the complete guidelines on the implementation
            of this law. <strong>STRONG MOTO CENTRUM, INC.</strong> shall
            continue to process the personal, sensitive, and privileged
            information of its clients in accordance with applicable laws and
            regulations for lawful purposes only.
          </p>
          <p className="mt-5">DATA RETENTION</p>
          <p className="mt-5">
            <strong>STRONG MOTO CENTRUM, INC.</strong> only keeps your
            information while you are a customer unless it is necessary to keep
            such information longer to fulfill the purposes for which it was
            collected or for legitimate business or legal purposes such as, but
            not limited to, security, fraud prevention, or financial
            recordkeeping. Our retention schedule is available upon written
            request. The Corporation has also established secure procedures to
            properly dispose of files that contain your information whether in
            physical or electronic form.
          </p>
          <p className="mt-5">UPDATES TO OUR PRIVACY POLICY STATEMENT</p>
          <p className="mt-5">
            We may update our Privacy Policy Statement at any time without prior
            notice.
          </p>
          <p className="mt-5">WHAT IS YOUR ROLE AS A DATA SUBJECT?</p>
          <p className="mt-5">
            By using our website and other related services, you signify that
            you have accepted this policy. If you disagree, please discontinue
            the use of our website and other related services. Continued use of
            the website and other related services even with any change of our
            privacy policy signifies your acceptanceof any change.
          </p>
          <p className="mt-5">FOR DATA PRIVACY INQUIRIES</p>
          <p className="mt-5">If you have any questions or concerns about this Privacy Policy or <strong>STRONG MOTO CENTRUM, INC.’s</strong> use of your personal information, you may contact dataprotectionofficer2022@gmail.com.</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
