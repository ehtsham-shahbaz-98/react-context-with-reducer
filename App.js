import * as React from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import "./App.css";

// Auth Pages
import Layout from "./components/Layout/Layout";
import ResetPassword from "./pages/auth/ResetPassword";
import Notification from "./pages/auth/Notification";
import RegisterPhone from "./pages/auth/RegisterPhone";
import NavigateToLogin from "./pages/auth/NavigateToLogin";

// Test Login Page
import IdentityLogin from "./pages/auth/IdentityLogin";

// Admin Home Page
import Homepage from "./pages/admin/Homepage/Homepage";

// Sponsor Pages
import Sponsors from "./pages/admin/Sponsors/Sponsors";
import CreateSponsors from "./pages/admin/Sponsors/CreateSponsors";
import EditSponsors from "./pages/admin/Sponsors/EditSponsors";
import ViewSponsors from "./pages/admin/Sponsors/ViewSponsors";
import AllSponsors from "./pages/admin/Sponsors/AllSponsors";

// Study Pages
import Study from "./pages/admin/Studies/Study";
import AllStudies from "./pages/admin/Studies/AllStudies";
import ViewStudies from "./pages/admin/Studies/ViewStudies";
import CreateStudy from "./pages/admin/Studies/CreateStudy";
import EditStudy from "./pages/admin/Studies/EditStudy";

// User Pages
import AddUser from "./pages/admin/Users/AddUser";
import AllUsers from "./pages/admin/Users/AllUsers";
import EditUser from "./pages/admin/Users/EditUser";
import Import from "./pages/admin/Studies/Import";

// SIGN IN OIDC
import SignInOidc from "./pages/admin/Homepage/SignInOidc";

// Context API
import SponsorContext from "./context/sponsor/SponsorContext";
import StudyContext from "./context/study/StudyContext";
import UserContext from "./context/user/UserContext";
import AuthContext from "./context/auth/AuthContext";

// Toast and css dependencies
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

import ProtectedRoute from "./routes/ProtectedRoute";
import UnProtectedRoute from "./routes/UnProtectedRoute";

// MUI X Grid License Key
import { LicenseInfo } from "@mui/x-license-pro";

LicenseInfo.setLicenseKey(
  "1aa44b00912d99c636bb4f9d8da8d732Tz01NTAyMixFPTE3MDEwMTIzNjYxODQsUz1wcm8sTE09c3Vic2NyaXB0aW9uLEtWPTI="
);

export default function App() {
  const { getTokenDispatch, getUserLoggedIn } = React.useContext(AuthContext);
  const { fetchSponsors } = React.useContext(SponsorContext);
  const { fetchStudies } = React.useContext(StudyContext);
  const { fetchUsers } = React.useContext(UserContext);

  const token = localStorage.getItem('accessToken')

  React.useEffect(() => {
    if (token) {
      getTokenDispatch(token);
      getUserLoggedIn();
      fetchSponsors();
      fetchStudies();
      fetchUsers();
    }
  }, [token]);

  return (
    <div className="App">
      <Routes>
        <Route element={<UnProtectedRoute />}>
          <Route path="/" element={<NavigateToLogin />} />
          <Route path="/login" element={<IdentityLogin />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/password-sent" element={<Notification />} />
          <Route path="/register-phone" element={<RegisterPhone />} />
          <Route
            path="/get-token"
            element={<Layout children={<SignInOidc />} />}
          />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route
            path="/homepage"
            element={<Layout children={<Homepage />} />}
            exact
          />
          <Route
            path="/sponsors"
            element={<Layout children={<Sponsors />} />}
          />
          <Route
            path="/create-sponsor"
            element={<Layout children={<CreateSponsors />} />}
          />
          <Route
            path="/edit-sponsor/"
            element={<Layout children={<EditSponsors />} />}
          />
          <Route
            path="/view-sponsor"
            element={<Layout children={<ViewSponsors />} />}
          />
          <Route
            path="/all-sponsors"
            element={<Layout children={<AllSponsors />} />}
          />
          <Route
            path="/studies"
            element={<Layout children={<Study />} />}
          />
          <Route
            path="/all-studies"
            element={<Layout children={<AllStudies />} />}
          />
          <Route
            path="/edit-study/"
            element={<Layout children={<EditStudy />} />}
          />

          <Route
            path="/add-user"
            element={<Layout children={<AddUser />} />}
          />
          <Route
            path="/all-users"
            element={<Layout children={<AllUsers />} />}
          />
          <Route
            path="/edit-user/"
            element={<Layout children={<EditUser />} />}
          />
          <Route
            path="/import-study"
            element={<Layout children={<Import />} />}
          />
          <Route
            path="/view-study"
            element={<Layout children={<ViewStudies />} />}
          />
          <Route
            path="/create-study"
            element={<Layout children={<CreateStudy />} />}
          />

        </Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}
