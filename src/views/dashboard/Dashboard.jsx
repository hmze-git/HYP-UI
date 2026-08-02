import React, { useEffect, useState } from 'react'
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

import WidgetsBrand from '../widgets/WidgetsBrand'
import WidgetsDropdown from '../widgets/WidgetsDropdown'
import MainChart from './MainChart'
import api from '../../services/api'
import HeatMap from '../../My pages/MyComponents/HeatMap'
import Tables from '../../components/Tables'

const Dashboard = () => {

  const [majorAccidentData, setMajorAccidentData] = useState([])
  const [minorAccidentData, setMinorAccidentData] = useState([])
  const [moderateAccidentData, setModerateAccidentData] = useState([])
  const [heatPoints, setHeatPoints] = useState([])
  const [tableData, setTableData] = useState([])

  useEffect(() => {


    fetchChartData()
    fetchHeatMapdata()
    fetchTableData()


  }, [])
  const lineData = ['major', 'minor', 'moderate']

  const fetchChartData = async () => {

    try {


      const data = await api.get('classification/severity/metrics', { params: { year: '2026' } })

      if (data.data.success === true) {

        const MJR = data.data.metricsMajor
        const MNR = data.data.metricsMinor
        const MDR = data.data.metricsModerate
        setMajorAccidentData(MJR.map(val => val.total))
        setMinorAccidentData(MNR.map(val => val.total))
        setModerateAccidentData(MDR.map(val => val.total))

        console.log("RUNNS")
        console.log(MJR)
        console.log(MNR)
        console.log(MDR)
      }


    } catch (error) {
      console.log("ERRR", error)
    }

  }

  const fetchHeatMapdata = async () => {
    try {

      const data = await api.get('classification/heatmap/values', { params: { year: '2026' } })

      if (data.data.success === true) {
        console.log(data.data)
        setHeatPoints(data.data.cordinateHeat.map((val) => {

          const arrReturn = []

          arrReturn.push(parseFloat(val.xCord))
          arrReturn.push(parseFloat(val.yCord))
          arrReturn.push(parseFloat(val.intensity))


          return arrReturn



        }))

        console.log(heatPoints)

      }


    } catch (error) {

      console.log(`Failed to get heat map data due to ${error}`)
    }


  }
  const fetchTableData = async () => {
    try {
      const data = await api.get('/classification/severity/table/values', { params: { year: "2026" } })

      if (data.data.success === true) {
          console.log(data.data.location)
        setTableData(data.data.location.map((val) => {

        
          return {
            'locale': val.locale,
            'major': val.numMajor,
            'moderate': val.numModerate,
            'minor': val.numMinor
          }

        }))
      }
    } catch (error) {
      console.log("Failed getting table data due to ", error)
    }
  }

  const outputTableRows = () => {


   return tableData.map((val, index) => (



      <CTableRow>
        <CTableHeaderCell scope="row">{index}</CTableHeaderCell>
        <CTableDataCell>{val.locale}</CTableDataCell>
        <CTableDataCell>{val.minor}</CTableDataCell>
        <CTableDataCell>{val.moderate}</CTableDataCell>
        <CTableDataCell>{val.major}</CTableDataCell> 
</CTableRow>))

  }

  return (
    <>
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                Accident Severity Classifications
              </h4>
              <div className="small text-body-secondary">January - July 2026</div>
            </CCol>
          </CRow>
          <MainChart major={majorAccidentData} moderate={moderateAccidentData} minor={minorAccidentData} label={lineData} />
        </CCardBody>


      </CCard>

      <CCard className="mb-4">
        <CCardBody>

          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                Heatmap of accident hotspots (Severity And Frequency)
              </h4>
              <div className="small text-body-secondary">July 2026</div>
            </CCol>
          </CRow>
          <CRow style={{ height: "70vh" }}>
            <CCol sm={5}>
            <HeatMap HeatPoints={heatPoints} />
            </CCol>
                 <CCol sm={5}>
            <CTable color='dark' striped>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Area Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Number of minor crashes </CTableHeaderCell>
                    <CTableHeaderCell scope="col">Number of moderate crashes </CTableHeaderCell>
                    <CTableHeaderCell scope="col">Number of major crashes </CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {outputTableRows()}
                </CTableBody>
              </CTable>
            </CCol>
          </CRow>

        </CCardBody>


      </CCard>


    </>
  )
}

export default Dashboard
