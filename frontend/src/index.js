import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ComplaintForm from './component_Dimuthu/ComplaintForm'
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FeedbackForm from './component_Dimuthu/FeedbackForm';
import AdminComplaintDisplay from './component_Dimuthu/AdminComplaintDisplay';
import FeedbackDisplay from './component_Dimuthu/FeedbackDisplay';
import GalleryForm from './component_Dimuthu/GalleryForm';
import GalleryAdmin from './component_Dimuthu/GalleryAdmin';
import ComplaintDisplay from './component_Dimuthu/ComplaintDisplay';
import AdminFeedbackDisplay from './component_Dimuthu/AdminFeedbackDisplay';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
        <Route path='/' element={<App />} />
        <Route path='/ComplaintForm' element={<ComplaintForm/>} />
        <Route path='/FeedbackForm' element={<FeedbackForm/>} />
        <Route path='/AdminComplaintDisplay' element={<AdminComplaintDisplay/>}/>
        <Route path='/FeedbackDisplay' element={<FeedbackDisplay/>}/>
        <Route path='/GalleryForm' element={<GalleryForm/>}/>
        <Route path='/GelleryAdmin' element={<GalleryAdmin/>}/>
        <Route path='/ComplaintDisplay' element={<ComplaintDisplay/>}/>
        <Route path='/AdminFeedbackDisplay' element={<AdminFeedbackDisplay
        />}/>
        

    </Routes>
    </BrowserRouter>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
