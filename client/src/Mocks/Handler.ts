import { http, HttpResponse } from "msw";
import registeredUserData from "../Data/RegisteredUser.json";
import { Admin, SignupRequestBody } from "../Types/types";
import admins from '../Data/AdminList.json';
import userdata from '../Data/UserList.json';
import bookings from "../Data/BookingListDetailsCategory.json";

const users = registeredUserData.users;
const admin = admins;

export const handlers = [
  //For fetching users
  http.get('/api/user', () => {
    return HttpResponse.json(registeredUserData);
  }),

  //For sign up
  http.post("/api/signup", async ({ request }) => {
    try {
      const info = await request.json() as SignupRequestBody;
    
      const { name, username, email, contact, address, password, cpassword } = info;
  
      if (!username || !email || !password) {
        return HttpResponse.json(
          { message: "Please fill in all required fields." },
          { status: 400 }
        );
      }
  
      if (password !== cpassword) {
        return HttpResponse.json(
          { message: "Passwords do not match." },
          { status: 400 }
        );
      }
  
      const existingUser = users.find(user => user.username === username || user.email === email);
      if (existingUser) {
        return HttpResponse.json(
          { message: "User already exists." },
          { status: 409 }
        );
      }
  
      const newUserId = users.length + 1;
  
      const newUser = {
        id: newUserId,
        name,
        username,
        email,
        contact,
        address,
        password,
        cpassword
      };
    
      // Simulate saving user data
      users.push(newUser);
      
      return HttpResponse.json(
        { message: "Registration successful!" },
        { status: 201 }
      );

    } catch (error) {
      console.error("Signup error:", error);
      return HttpResponse.json(
        { message: "Internal server error." },
        { status: 500 }
      );
    }
  }),

  //For sign in
  http.post("/api/signin", async ({ request }) => {
    const info = await request.formData();
    const email = info.get("email");
    const password = info.get("password");

    console.log("Received email:", email);
    console.log("Received password:", password);

    const user = users.find(
      (user) =>
        (user.username === email || user.email === email) &&
        user.password === password
    );

    if (user) {
      return HttpResponse.json(
        {
          message: "Login successful!",
          token: "mocked_token",
          user: { email },
        },
        { status: 200 }
      );
    }

    return HttpResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }),

  //For logout
  http.post("/api/logout", () => {
    return HttpResponse.json(
      { message: "Logout successful!" },
      { status: 200 }
    );
  }),
  
  //For admin list
  http.get("/api/admin-list", () => {
    return HttpResponse.json(admins);
  }),

  //For users list
  http.get("/api/user-list", ()=> {
    return HttpResponse.json(userdata);
  }),

  //For booking list admin
  http.get("/api/booking-list", () => {
    return HttpResponse.json(bookings);
  }),

  //For add admin
  http.post("/api/add-admin", async ({ request }) => {
    try {
      const info = await request.json() as Admin;
    
      const { firstName, lastName, email, gender, branchName, branchCode, position, password } = info;
  
      const newAdminId = users.length + 1;
  
      const newAdmin = {
        id: newAdminId,
        firstName,
        lastName,
        email,
        gender,
        branchName,
        branchCode,
        position,
        password
      };
    
      // Simulate saving user data
      admin.push(newAdmin);
      
      return HttpResponse.json(
        { message: "You added new admin!" },
        { status: 201 }
      );

    } catch (error) {
      console.error("Creation error:", error);
      return HttpResponse.json(
        { message: "Internal server error." },
        { status: 500 }
      );
    }
  }),
];