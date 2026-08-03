import React from 'react'
import ReactPlayer from 'react-player'
import classNames from 'classnames'

import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CFormLabel,
  CDropdown,
  CDropdownDivider,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CFormInput,
  CInputGroup,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilCloudDownload,
  cilPeople,
  cilUser,
  cilUserFemale,
} from '@coreui/icons'

import avatar1 from 'src/assets/images/avatars/1.jpg'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import avatar3 from 'src/assets/images/avatars/3.jpg'
import avatar4 from 'src/assets/images/avatars/4.jpg'
import avatar5 from 'src/assets/images/avatars/5.jpg'
import avatar6 from 'src/assets/images/avatars/6.jpg'

import { useState,useEffect } from 'react'
import api from '../services/api'
import Swal from 'sweetalert2'
import { data } from 'autoprefixer'
import { useLocation } from 'react-router-dom'


const ViewProcessedVideo = () => {

const [classificationDetails,setClassificationDetails]=useState(null)
const location = useLocation()
const vidId= location.state?.vId




const fetchVideo = async ()=>{
    try {
        const resp=await api.get(`/video/classfication/${vidId}`)

        if(resp.data.success){
            setClassificationDetails(resp.data)
        }

    } catch (error) {
        
    }




}
    useEffect(()=>{

        fetchVideo()

    },[location.state])

    return(
    <>


        {!!classificationDetails?( <CCard className="mb-4">   
            <CCardBody>
                <CRow className='justify-content-center '>
                    
                    <CFormLabel htmlFor="formFile"><b>Video Details</b></CFormLabel>
                    <CCol> 
                    <ReactPlayer src={`http://localhost:5000/${classificationDetails.vidSrc}`} controls={true} width="100%" height="auto"/>
                    </CCol>
                    
                </CRow>
                   <CRow className='justify-content-center'>
                    
                    <CFormLabel htmlFor="formFile">Accident Marked as:<b>{classificationDetails.systemClassification}</b></CFormLabel>          
                </CRow>
            </CCardBody>

        </CCard>):
        <></>
        }

          

    </>)
}

export default ViewProcessedVideo
