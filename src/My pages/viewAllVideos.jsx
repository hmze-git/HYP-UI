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

import { useState, useEffect } from 'react'
import api from '../services/api'
import Swal from 'sweetalert2'
import { data } from 'autoprefixer'
import { Link } from 'react-router-dom'


const ViewAllVids = () => {

    const [videos, setVideos] = useState([])




    const fetchVids = async () => {
        try {

            const resp = await api.get('videos/classfication')

            if (resp.data.success) {
                setVideos([...resp.data.records])
            }

        } catch (error) {
            console.log("ERR fetching ", error)

        }


    }

    useEffect(() => {
        fetchVids()
    }, [])

    return (
        <>


            {!!videos.length ? (<CCard className="mb-4">
                <CCardBody>
                  <CRow className='justify-content-center '>
                    
                    <CFormLabel htmlFor="formFile"><b>Processed Videos</b></CFormLabel>
                    
                </CRow>
                    <div  className='d-flex flex-wrap gap-3'>
                    {
                        videos.map((val) => {
                            return( 
                                <Link to={`/viewVideo/${val.vidId}`}state={{vId:val.vidId}}>
                                <div className="card" style={{width: "18rem"}}>
                                    <img src="src\assets\images\react.jpg" className="card-img-top" alt="..."/>
                                        <div className="card-body">
                                            <h5 className="card-title">{val.vidLocale}</h5>
                                            <p className="card-text">{val.upDate}</p>
                                            
                                        </div>
                                </div>
                                </Link>
                                );
                            
                        })
                        
                    }
                    </div>
                </CCardBody>

            </CCard>) :
                <></>
            }



        </>)
}

export default ViewAllVids
