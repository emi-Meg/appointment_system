// import React from "react";
import { Route, Navigate } from "react-router-dom";
import SignUp from "../Components/Auth/SignUp";
import SmctFront from "../Components/Pages/FrontSmct";
import GuestBooking from "../Components/Pages/GuestBooking";
import HomeUser from "../Components/Pages/UserHome";
import LoadingAppointment from "../Components/LoadingAppointment";
import ProtectedRoutes from "../Contexts/Authentication/ProtectedRoutes";
import SignIn from "../Components/Auth/SignIn";
import MyBookings from "../Components/Pages/UserMyBookings";
import KiaFront from "../Components/Pages/FrontKia";
import DesStrongFront from "../Components/Pages/FrontDesStrong";
import HondaDesFront from "../Components/Pages/FrontHondaDes";
import SuzukiBoholFront from "../Components/Pages/FrontSuzukiBohol";
import SuzukiOzamizFront from "../Components/Pages/FrontSuzukiOzamiz";
import AboutServices from "../Components/Pages/UserAboutServices";
import SupportUser from "../Components/Pages/UserSupport";
import AddBooking from "../Components/Views/AddBooking";
import ViewBookingDetails from "../Components/Views/ViewBookingDetails";
import EditBookingDetails from "../Components/Views/EditBookingDetails";
import ProfileUser from "../Components/Pages/UserProfile";
import FeedbacksUser from "../Components/Pages/UserFeedbacks";
import FrequentlyAskedQuestions from "../Components/Pages/UserFrequentlyAskedQuestions";
import LoginAdmin from "../Components/Auth/LoginAdmin";
import LayoutAdmin from "../Components/Layouts/AdminLayout";
import BookingListAdmin from "../Components/Pages/AdminBookingList";
import CalendarAdmin from "../Components/Pages/AdminCalendar";
import ProfileAdmin from "../Components/Pages/AdminProfile";
import AdminNotifications from "../Components/Pages/AdminNotifications";
import AdminModifyPages from "../Components/Pages/AdminModifyPages";
import AdminUsersList from "../Components/Pages/AdminUsersList";
import AdminModifyServices from "../Components/Pages/AdminModifyServices";
import AdminReports from "../Components/Pages/AdminReports";
import AdminMessage from "../Components/Pages/AdminMessage";
import UserLayout from "../Components/Layouts/UserLayout";
import SuperLayout from "../Components/Layouts/SuperLayout";
import SuperProfile from "../Components/Pages/SuperProfile";
import SuperCreateAdmin from "../Components/Pages/SuperCreateAdmin";
import SuperAdminsList from "../Components/Pages/SuperAdminsList";
import AfterSubmissionBookingPage from "../Components/Common/AfterSubmissionBookingPage";
import ForgotPassword from "../Components/Auth/ForgotPassword";
import ChangePassword from "../Components/Auth/ChangePassword";
import PrivacyPolicy from "../Components/Pages/PrivacyPolicy";
import TermsService from "../Components/Pages/TermsService";
import AboutUs from "../Components/Pages/AboutUs";

const RouterConfig = (
  <>
    {/* Routes for Admin Panel */}
    <Route path="/admin" element={<LayoutAdmin />}>
      <Route path="booking-list" element={<BookingListAdmin />} />
      <Route path="calendar" element={<CalendarAdmin />} />
      <Route path="profile" element={<ProfileAdmin />} />
      <Route path="notifications" element={<AdminNotifications />} />
      <Route path="modify-pages" element={<AdminModifyPages />} />
      <Route path="users-list" element={<AdminUsersList />} />
      <Route path="modify-services" element={<AdminModifyServices />} />
      <Route path="reports" element={<AdminReports />} />
      <Route path="message" element={<AdminMessage />} />
    </Route>

    {/* Protected Routes */}
    <Route element={<ProtectedRoutes />}>
      <Route path="/user" element={<UserLayout />}>
        <Route path="home" element={<HomeUser />} />
        <Route path="mybookings" element={<MyBookings />} />
        <Route path="aboutservices" element={<AboutServices />} />
        <Route path="support" element={<SupportUser />} />
        <Route path="feedbacks" element={<FeedbacksUser />} />
        <Route path="faqs" element={<FrequentlyAskedQuestions />} />
        <Route path="profile" element={<ProfileUser />} />
        <Route path="privacy-policy" element={<PrivacyPolicy/>}/>
        <Route path="terms-of-service" element={<TermsService/>}/>
        <Route path="about-us" element={<AboutUs/>}/>

        {/* For the Booking Sections */}
        <Route path="addbooking" element={<AddBooking />} />
        <Route path="viewbooking/:id" element={<ViewBookingDetails />} />
        <Route path="editbooking/:id" element={<EditBookingDetails />} />
      </Route>
    </Route>

    <Route path="/dev" element={<SuperLayout/>}>
      <Route path="profile" element={<SuperProfile/>}/>
      <Route path="create-admin" element={<SuperCreateAdmin/>}/>
      <Route path="admins-list" element={<SuperAdminsList/>}/>
    </Route>

    <Route path="/" element={<Navigate to="/signup" />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/signin" element={<SignIn />} />
    <Route path="/forgot-password" element={<ForgotPassword/>}/>
    <Route path="/change-password" element={<ChangePassword/>}/>
    <Route path="/login/admin" element={<LoginAdmin />} />
    <Route path="/smct" element={<SmctFront />} />
    <Route path="/kia" element={<KiaFront />} />
    <Route path="/desstrong" element={<DesStrongFront />} />
    <Route path="/hondades" element={<HondaDesFront />} />
    <Route path="/suzukibohol" element={<SuzukiBoholFront />} />
    <Route path="/suzukiozamiz" element={<SuzukiOzamizFront />} />
    <Route path="/guestbooking" element={<GuestBooking />} />
    <Route path="/loading" element={<LoadingAppointment />} />
    <Route path="/thank-you" element={<AfterSubmissionBookingPage/>} />
  </>
);

export default RouterConfig;
