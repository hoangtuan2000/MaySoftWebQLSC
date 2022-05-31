import React from 'react'
import { Container, Row, Col, Image, Pagination } from 'react-bootstrap'
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import Axios from 'axios'

import { createFilterTime, createFilterPage } from '../../redux/filterReport/filterReportSlice'

import SideBar from '../../components/sidebar/SideBar';
import FilterReportComponent from './components/FilterReportComponent';
import ShowReportComponent from './components/ShowReportComponent'
import ModalFilter from './components/ModalFilter';
import ReportPagination from './components/ReportPagination';

function ListReportPage() {

    const [auth, setAuth] = React.useState('')

    // get data in redux
    const filterTime = useSelector((state) => state.filterReportRedux.filterTime)
    const filters = useSelector((state) => state.filterReportRedux.filters)
    const dispatch = useDispatch()

    const [reports, setReports] = React.useState([])
    const [totalReportPages, setTotalReportPages] = React.useState([])
    const [filterReports, setFilterReports] = React.useState([])
    const [incidentObject, setIncidentObject] = React.useState([])
    const [departments, setDepartments] = React.useState([])
    const [reportStatus, setReportStatus] = React.useState([])
    const [reportType, setReportType] = React.useState([])

    const [selectRangeDate, setSelectRangeDate] = React.useState(null)

    const [showModalFilter, setShowModalFilter] = React.useState(false)

    const getAllReports = () => {
        Axios.post('https://qlsc.maysoft.io/server/api/getAllReports',
            {
                page: filters.page,
                limitEntry: filters.limitEntry
            },
            {
                headers: {
                    'Authorization': auth
                }
            })
            .then((res) => {
                if (res.status) {
                    // setTotalReportPages())
                    setReports(res.data.data.data)
                    setFilterReports(res.data.data.data)
                    let totalPages = Math.ceil(res.data.data.sizeQuerySnapshot / filters.limitEntry)
                    let pages = []
                    for (let i = 1; i <= totalPages; i++) {
                        let object = {}
                        object.pageNumber = i
                        object.pageName = 'Trang ' + i
                        pages.push(object)
                    }
                    setTotalReportPages(pages)
                }
            })
            .catch((err) => {
                console.log('err', err);
            })
    }

    const getCommon = () => {
        Axios.post('https://qlsc.maysoft.io/server/api/getCommon',
            {
                groups: 'incidentObject, reportStatus, reportType'
            },
            {
                headers: {
                    'Authorization': auth
                }
            })
            .then((res) => {
                if (res.status) {
                    setIncidentObject(res.data.data.incidentObject);
                    setReportStatus(res.data.data.reportStatus);
                    setReportType(res.data.data.reportType);
                }
            })
            .catch((err) => {
                console.log('err', err);
            })
    }

    const getAllDepartments = () => {
        Axios.post('https://qlsc.maysoft.io/server/api/getAllDepartments', {},
            {
                headers: {
                    'Authorization': auth
                }
            })
            .then((res) => {
                if (res.status) {
                    setDepartments(res.data.data.data);
                }
            })
            .catch((err) => {
                console.log('err', err);
            })
    }

    // filter time report
    const handlerFilterTime = () => {
        // filtered by time
        if (selectRangeDate != null) {
            let filterResult = []
            filterResult = reports.filter((report) => {
                // timeStamp => dateTime
                let reportTime = new Date(report.reportTime * 1000)

                // get day month year in dateTime
                let reportDate = new Date(reportTime.getFullYear(), reportTime.getMonth(), reportTime.getDate())
                let filterDateStart = new Date(selectRangeDate[0].getFullYear(), selectRangeDate[0].getMonth(), selectRangeDate[0].getDate())
                let filterDateEnd = new Date(selectRangeDate[1].getFullYear(), selectRangeDate[1].getMonth(), selectRangeDate[1].getDate())

                if (reportDate >= filterDateStart && reportDate <= filterDateEnd) {
                    return report
                }
            })

            setFilterReports(filterResult)

        } else {
            // not filtered by time => re-render all report
            setFilterReports(reports)
        }
    }

    // get authentication in localStorage
    React.useEffect(() => {
        let authentication = localStorage.getItem("curentUserLogin")
        setAuth(JSON.parse(authentication).token_type + ' ' + JSON.parse(authentication).access_token);
    }, [])

    // get database (all report and commmon code)
    React.useEffect(() => {
        if (auth != '') {
            getCommon()
            getAllDepartments()
            getAllReports()
        }
    }, [auth])

    // when filter time report
    React.useEffect(() => {
        handlerFilterTime()
        // console.log(selectRangeDate);
    }, [selectRangeDate, reports])

    // when filters report (filter status report)
    React.useEffect(() => {
        if (
            filters.status != '' ||
            filters.type != '' ||
            filters.incident != '' ||
            filters.department != '' ||
            filters.searchKey != ''
        ) {

            let multiFilters = {
                page: filters.page,
                limitEntry: filters.limitEntry
            }

            if (filters.status != '') { multiFilters.status = filters.status }
            if (filters.type != '') { multiFilters.reportType = filters.type }
            if (filters.incident != '') { multiFilters.incidentObject = filters.incident }
            if (filters.department != '') { multiFilters.departmentId = filters.department }
            if (filters.searchKey != '') { multiFilters.searchKey = filters.searchKey }

            Axios.post('https://qlsc.maysoft.io/server/api/getAllReports',
                multiFilters,
                {
                    headers: {
                        'Authorization': auth
                    }
                })
                .then((res) => {
                    setReports(res.data.data.data)
                })
                .catch((err) => {
                    console.log('err', err);
                })

        } else {
            getAllReports()
        }
    }, [filters])


    return (
        <Container fluid>
            <Row style={{ height: window.innerHeight }}>

                <SideBar />

                <Col md={10}>
                    {/* view filters */}
                    <FilterReportComponent
                        filters={filters}
                        setSelectRangeDate={setSelectRangeDate}
                        selectRangeDate={selectRangeDate}
                        setShowModalFilter={setShowModalFilter}
                    />

                    {/* pages */}
                    <ReportPagination
                        totalReportPages={totalReportPages}
                        filters={filters}
                    />

                    {/* view show report */}
                    <ShowReportComponent
                        filterReports={filterReports}
                        reportStatus={reportStatus}
                        reportType={reportType}
                        incidentObject={incidentObject}
                    />

                    {/* modal filters */}
                    <ModalFilter
                        showModalFilter={showModalFilter}
                        setShowModalFilter={setShowModalFilter}
                        reportStatus={reportStatus}
                        reportType={reportType}
                        incidentObject={incidentObject}
                        departments={departments}
                    />
                </Col>
            </Row>
        </Container>
    )
}

export default ListReportPage