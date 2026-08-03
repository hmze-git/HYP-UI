/**
 * DefaultLayout Component
 *
 * Main application layout wrapper that composes the primary UI structure
 * for authenticated/protected routes.
 *
 * Layout structure:
 * - AppSidebar: Collapsible navigation sidebar
 * - AppHeader: Top navigation bar with user menu and theme switcher
 * - AppContent: Main content area with route rendering
 * - AppFooter: Footer with links and copyright
 *
 * This layout is used for all routes defined in routes.js, providing
 * a consistent structure across the application.
 *
 * @component
 * @example
 * // Used in App.js for protected routes
 * <Route path="*" element={<DefaultLayout />} />
 */

import React from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

/**
 * DefaultLayout functional component
 *
 * Renders the main application layout with:
 * - Fixed sidebar navigation
 * - Sticky header
 * - Flexible content area
 * - Footer at bottom
 *
 * Uses flexbox for proper content stretching and footer positioning.
 *
 * @returns {React.ReactElement} Complete application layout
 */



const DefaultLayout = () => {
const navigate= useNavigate()

useEffect(() => {

    const interval = setInterval(async () => {

      const values = ["C:\\Users\\Hamzah\\Desktop\\HYP\\archive\\Balanced Accident Video Dataset\\test\\major", "C:\\Users\\Hamzah\\Desktop\\HYP\\archive\\Balanced Accident Video Dataset\\test\\minor", "C:\\Users\\Hamzah\\Desktop\\HYP\\archive\\Balanced Accident Video Dataset\\test\\moderate"];
      const randomValue = values[Math.floor(Math.random() * values.length)];
      const body = {
        "datasetPath": randomValue,
        "pipeType": "LibLSTMCNN"
      }

      const data=await api.post('video/random/upload',body)
     
      if (data.data.success === true) {
           toast(renderAccidentNoti(data.data.localName,data.data.AType,data.data.xCord,data.data.yCord), {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      }
    }, 300000000000); //5 min wait 300000

    return () => clearInterval(interval);

  }, [])

  const handleButtonClick=(xCord,yCord,aType)=>{
    navigate('/dashboard',{state:{xC:xCord,yC:yCord,acType:aType}})



  }
  const renderAccidentNoti=(aLocation,aType,xCord,yCord)=>{

    return(
  <div className="alert alert-warning" role="alert">
    <h4 className="alert-heading">Incoming Accident Event</h4>
     <p className="mb-0">Location is : {aLocation}</p>
     <p className="mb-0">System Predicts Accident is {aType}</p>
     <p className="mb-0"><button class="alert-link" onClick={()=>handleButtonClick(xCord,yCord,aType)}>Click Here To View In Map</button>.</p>

  </div>

    )

  }
  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
          <AppContent />
        </div>
      </div>
    </div>
  )
}

export default DefaultLayout
