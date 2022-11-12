import React, { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router";
import {
  DashboardRoute,
  StaffRoute,
  PatientsRoute,
  MessagingRoute,
  HelpRoute,
  NotFoundRoute,
} from "../const/routes";
import MainWrapper from "components/layouts/mainWrapper/MainWrapper";
import LoadingDots from "components/common/LoadingDots/LoadingDots";

const Dashboard = React.lazy(
  () => import("../components/pages/Dashboard/Dashboard")
);
const Staff = React.lazy(
  () => import("../components/pages/Staff/Staff")
);
const Patients = React.lazy(
  () => import("../components/pages/Patients/Patients")
);
const Messaging = React.lazy(
  () => import("../components/pages/Messaging/Messaging")
);
const HelpCenter = React.lazy(
  () => import("../components/pages/HelpCenter/HelpCenter")
);

const PrivateRouter = () => {
  return (
    <MainWrapper>
      <Suspense fallback={<LoadingDots isLight={true} isVisible={true} />}>
        <Routes>
          <Route index element={<Navigate to={DashboardRoute} />} />
          <Route path="*" element={<Navigate to={NotFoundRoute} />} />
          <Route path={DashboardRoute} element={<Dashboard />} />
          <Route path={StaffRoute} element={<Staff />} />
          <Route path={`${PatientsRoute}/*`} element={<Patients />} />
          <Route path={`${MessagingRoute}/*`} element={<Messaging />} />
          <Route path={HelpRoute} element={<HelpCenter />} />
        </Routes>
      </Suspense>
    </MainWrapper>
  );
};

export default PrivateRouter;
