import React from 'react';
import ReactDOM from 'react-dom/client';
//import {Route } from "react-router-dom";
import App from './App';
import reportWebVitals from './reportWebVitals';
import GQ from './components/GenderQuestion'
import BQ from './components/BMIQuestion'
import BSQ from './components/BloodSugarLevelQuestion';
import BPQ from './components/BloodPressureLevelPage';
import BCQ from './components/BloodCholesterolLevelPage'
import AL from './components/ActitivityLevelQuestion'
import R from './components/RecommendationPage'
import FP from './components/FoodPreferencePage'
import NP from './components/NutritionPage'
import F from './components/Feedback'


import { GlobalProvider } from './GlobalContext';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
const router = createBrowserRouter([
   
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/gq",
    element: <GQ/>,
  },
  {
    path: "/bq",
    element: <BQ/>,
  },
  {
    path: "/bsq",
    element: <BSQ/>,
  },
  {
    path: "/bpq",
    element: <BPQ/>,
  },
  {
    path: "/bcq",
    element: <BCQ/>,
  },
  {
    path: "/al",
    element: <AL/>,
  },
  {
    path: "/fp",
    element: <FP/>,
  },
  {
    path: "/r",
    element: <R/>,
  },
  {
    path: "/np",
    element: <NP/>,
  },
  {
    path: "/fb",
    element: <F/>,
  },
  
  
 
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    
    <GlobalProvider>
  <RouterProvider router={router} />
</GlobalProvider>
  </React.StrictMode>
  
);


reportWebVitals();
