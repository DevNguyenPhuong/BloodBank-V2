import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/UI/ProtectedRoute";
import PageNotFound from "./page/PageNotFound";
import Signup from "./page/guest/Signup";
import HomePage from "./page/guest/HomePage";
import PageLayout from "./components/UI/PageLayout";
import UserHome from "./page/user/Home";
import UserProcessingActivity from "./page/user/ProcessingActivity";
import UserDonateHistory from "./page/user/DonateHistory";
import HospitalHome from "./page/hospital/Home";
import HospitalDonateActivity from "./page/hospital/DonateActivities";
import HospitalProcessingActivity from "./page/hospital/ProcessingActivity";
import RequestHistory from "./page/hospital/RequestHistory";
import BloodRequest from "./page/hospital/BloodRequest";

import { CookiesProvider } from "react-cookie";

import Authencicate from "./page/guest/Authenticate";
import DonateActivity from "./page/hospital/DonateActivity";
import HospitalProcessingActivities from "./page/hospital/ProcessingActivities";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

// const configTheme = {
//   token: {},
//   components: {
//     Menu: {
//       algorithm: true, // Enable algorithm
//     },
//   },
// };

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <CookiesProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path="/user"
              element={
                <ProtectedRoute role="user">
                  <PageLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate replace to="home" />} />
              <Route path="home" element={<UserHome />} />
              <Route path="activities" element={<UserProcessingActivity />} />
              <Route path="histories" element={<UserDonateHistory />} />
            </Route>

            <Route
              path="/hospital"
              element={
                <ProtectedRoute role="hospital">
                  <PageLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate replace to="home" />} />
              <Route path="home" element={<HospitalHome />} />
              <Route path="activities">
                <Route path="donate" element={<HospitalDonateActivity />} />
                <Route path="donate/:id" element={<DonateActivity />} />
                <Route
                  path="processing"
                  element={<HospitalProcessingActivities />}
                />
                <Route
                  path="processing/:id"
                  element={<HospitalProcessingActivity />}
                />
              </Route>

              <Route path="blood">
                <Route path="request" element={<BloodRequest />}></Route>
              </Route>

              <Route path="histories" element={<RequestHistory />} />
            </Route>

            <Route path="/" element={<HomePage />} />
            <Route path="authenticate" element={<Authencicate />} />
            <Route path="signup" element={<Signup />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </CookiesProvider>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 3000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "#eff6ff",
            color: "#1d4ed8",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
