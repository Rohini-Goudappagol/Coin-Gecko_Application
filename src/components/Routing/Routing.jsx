import { Routes, Route } from "react-router-dom";
import MainLayout from "../../pages/Layout";
import { lazy, Suspense } from "react";
// import {Facebook} from 'react-content-loader'
import { PageLoader } from "../PageLoader/Pageloader";
import CustomErrorBoundary from "../ErrorBoundary/CustomErrorBoundary";

const Home = lazy(()=>import ( "../../pages/Home"));
const CoinDetailsPage = lazy(()=>import("../../pages/CoinDetailsPage"));

export default function Routing() {
  return (
    <CustomErrorBoundary>
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={
          <Suspense fallback={<PageLoader/>}>
          <Home />
          </Suspense>
          } />

        <Route path="/details/:coinId" element={
          <Suspense fallback={<PageLoader/>}>
          <CoinDetailsPage />
          </Suspense>
          } />
      </Route>
    </Routes>
    </CustomErrorBoundary>
  );
}
