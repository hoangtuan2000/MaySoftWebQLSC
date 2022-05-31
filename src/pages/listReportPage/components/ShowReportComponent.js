import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'

function ShowReport({ filterReports, reportStatus, reportType, incidentObject }) {

    return (
        <Row>
            <Col className='px-4'>

                {
                    filterReports.length > 0 ?
                    filterReports.map((report, index) => {
                        // get status name report
                        let statusName = reportStatus.filter(status => status.code == report.status)
                        // get type name report
                        let typeName = reportType.filter(type => type.code == report.reportType)
                        // get incident object name report
                        let incidentName = incidentObject.filter(incident => incident.code == report.incidentObject)
                        // get datetime report
                        let date = new Date(report.reportTime * 1000)

                        return (
                            <div
                                key={index}
                                className={
                                    `border border-danger
                                    rounded-3
                                    p-2
                                    my-3
                                    `
                                }
                                style={{ overflow: 'hidden' }}
                            >
                                <div className='float-start w-75'>
                                    <p className='float-start fw-bold me-4'>{report.reportNo}</p>
                                    <p className='float-start'
                                        style={
                                            statusName[0].code == 0 ? { color: 'green' }
                                                : statusName[0].code == 1 ? { color: '#c99d16' }
                                                    : statusName[0].code == 2 ? { color: '#c96416' }
                                                        : statusName[0].code == 3 ? { color: '#16c9a2' }
                                                            : statusName[0].code == 4 ? { color: '#c91616' }
                                                                : statusName[0].code == 5 ? { color: '#1616c9' } : ''
                                        }
                                    >
                                        {statusName[0].name}
                                    </p>
                                    <div className='clearfix'></div>
                                    <p>
                                        {
                                            date.getDate() + "/" + (date.getMonth() + 1) +
                                            "/" + date.getFullYear() + " " + date.getHours() +
                                            ":" + date.getMinutes() + ":" + date.getSeconds()
                                        }
                                    </p>
                                    <p className='float-start me-2 pe-2' style={{borderRight: '1px solid black'}}>
                                        {
                                            typeName[0].name
                                        }
                                    </p>
                                    <p className='float-start'>
                                        {
                                            incidentName[0].name
                                        }
                                    </p>
                                    <div className='clearfix'></div>
                                    <p>
                                        {report.reporterName}
                                    </p>
                                    <p>
                                        {report.detailDescription}
                                    </p>
                                </div>

                                <div className='float-end'>
                                    <FontAwesomeIcon icon={faEllipsisVertical} style={{ fontSize: '20px', color: 'blue' }} />
                                </div>
                            </div>
                        )
                    })
                    :
                    <div>
                        <p>Không Có Dữ Liệu</p>
                    </div>
                }

            </Col>
        </Row>
    )
}

export default ShowReport