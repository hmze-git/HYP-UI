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


const UploadVideo = () => {

const [selectedPipeline,setSelectedPipeline]=useState(null)
const [videoToClassify,setVideoToClassify]=useState(null)
const [previewURL,setPreviewURl]=useState("")


const setThePipeline=(newVal)=>{

    setSelectedPipeline(newVal)
    console.log(newVal)
}

const handleVideo=(e)=>{
    const File= e.target.files[0]
    setVideoToClassify(File)

    if (!!File){
        setPreviewURl(URL.createObjectURL(File))
    }
}

const submitVideo = async ()=>{
    try {
        const vidData=new FormData();
 
        vidData.append('file',videoToClassify);
        vidData.append('pipeline',selectedPipeline);
          Swal.fire({
            title:"Uploading Video",
            text:"Please Wait While Your Video Is Processed",
            allowOutsideClick:false,
            allowEscapeKey:false,
            didOpen:()=>{
                Swal.showLoading()
          
            }

    
        })
        
        const resp=await api.post('video/upload',vidData);

      
            if(resp.data.success===false){
                  
        Swal.fire({
                title:"Video Upload Failed",
                text:`Accident was classified as ${data.AType}`,
                icon:'error'
        })
            }else{
                       Swal.fire({
                title:"Video Upload Complete",
                text:`Accident was classified as ${resp.data.AType}`,
                icon:'success'
        })

            }


    } catch (error) {
        console.log("ERR uploading ",error)
        
    }


}


    return(
    <>
        <CCard className="mb-4">
            <CCardBody>
                <CRow>
                     <CFormLabel htmlFor="formFile">Default file input example</CFormLabel>
                    <CCol sm={5}>
                       
                        <CInputGroup className="mb-3">
                            <CDropdown variant="input-group">
                                <CDropdownToggle color="secondary" variant="outline">
                                   {!!selectedPipeline?selectedPipeline:"Select A Pipeline"}
                                </CDropdownToggle>
                                <CDropdownMenu>
                                    <CDropdownItem onClick={()=>setThePipeline("LibLSTMCNN")}>LIB LSTM-CNN (P1)</CDropdownItem>
                                    <CDropdownItem onClick={()=>setThePipeline("NLibLSTMCNN")}>No Lib LSTM-CNN(P2)</CDropdownItem>

                                </CDropdownMenu>
                            </CDropdown>
                            <CFormInput aria-label="Text input with dropdown button" />
                        </CInputGroup>
          
                    </CCol>
                    <CCol sm={5}>
                        
      
                        <CFormInput type="file" id="formFile"  onChange={(e)=>handleVideo(e)}/>
                    </CCol>

                </CRow>
            </CCardBody>

        </CCard>

        {!!videoToClassify?( <CCard className="mb-4">   
            <CCardBody>
                <CRow className='justify-content-center '>
                    
                    <CFormLabel htmlFor="formFile"><b>Video To Classify</b></CFormLabel>
                    <CCol> 
                    <ReactPlayer src={previewURL} controls={true} width="100%" height="auto"/>
                    </CCol>
                    
                </CRow>

              <CCardFooter className='d-flex justify-content-end'>
                    <CButton color='dark' default={false} onClick={submitVideo}>
                        Submit
                    </CButton>


              </CCardFooter>
            </CCardBody>

        </CCard>):
        <></>
        }

          

    </>)
}

export default UploadVideo
