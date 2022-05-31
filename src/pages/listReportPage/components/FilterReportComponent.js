import { faCalendar, faCalendarAlt, faClose, faFilter, faInfo } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Col, Row, Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { deleteFilterTime } from '../../../redux/filterReport/filterReportSlice'
import DateTimeRangePicker from '@wojtekmaj/react-datetimerange-picker'


function FilterReport(
    {
        setSelectRangeDate, selectRangeDate, setShowModalFilter, filters
    }
) {

    return (
        <Row>
            <Col>
                <div className='m-2 float-start'>
                    <DateTimeRangePicker format='y-MM-dd' onChange={setSelectRangeDate} value={selectRangeDate} />
                </div>
                <div className='m-2 float-start btn btn-sm' onClick={() => setShowModalFilter(true)}
                    style={{
                        position: 'relative',
                    }}
                >
                    <FontAwesomeIcon icon={faFilter} style={{ color: 'blue', fontSize: '20px' }} />
                    {
                        filters.status != '' ||
                            filters.type != '' ||
                            filters.incident != '' ||
                            filters.department != '' ||
                            filters.searchKey != ''
                            ?
                            <div
                                style={{
                                    position: 'absolute',
                                    top: '0px',
                                    right: '5px',
                                    fontSize: '10px',
                                    color: 'white',
                                    backgroundColor: 'red',
                                    borderRadius: '10px',
                                    padding: '1px',
                                    paddingRight: '4px',
                                    paddingLeft: '3px'
                                }}
                            >
                                <FontAwesomeIcon icon={faInfo} />
                            </div>
                            :
                            <></>
                    }

                </div>
            </Col>
        </Row>
    )

}

export default FilterReport