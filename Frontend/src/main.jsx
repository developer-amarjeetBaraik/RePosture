import { StrictMode } from 'react'
import * as React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import './index.css'
import Home from './pages/Home';
import AnalysisReportStore from './store/AnalysisReportStore';
import PageNotFound from './components/PageNotFound';

const router = createBrowserRouter([
  {
    path:'/',
    element:<AnalysisReportStore><Home/></AnalysisReportStore>
  },
  {
    path:'*',
    element:<PageNotFound/>
  }
])


ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);