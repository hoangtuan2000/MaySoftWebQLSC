import React from 'react'
import { Col, Pagination, Row } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { createFilterPage } from '../../../redux/filterReport/filterReportSlice'

function ReportPagination({ totalReportPages, filters }) {
    const dispatch = useDispatch()
    return (
        <Row>
            <Col className='mx-2'>
                <span>Trang</span>
                <Pagination>
                    {
                        totalReportPages.length > 2 && filters.page > 1?
                            <>
                                <Pagination.First
                                    onClick={() => dispatch(createFilterPage(totalReportPages[0].pageNumber))}
                                />
                                <Pagination.Prev
                                    onClick={() => {
                                        if (filters.page - 1 >= 1) {
                                            dispatch(createFilterPage(filters.page - 1))
                                        }
                                    }}
                                />
                            </>
                            : <></>
                    }

                    {
                        totalReportPages.map((page) => {
                            return (
                                <Pagination.Item
                                    key={page.pageNumber}
                                    className={page.pageNumber == filters.page ? 'active' : ''}
                                    onClick={() => {
                                        if (page.pageNumber != filters.page) {
                                            dispatch(createFilterPage(page.pageNumber))
                                        }
                                    }}
                                >
                                    {page.pageNumber}
                                </Pagination.Item>
                            )
                        })
                    }

                    {
                        totalReportPages.length > 2 &&  filters.page <totalReportPages.length ?
                            <>
                                <Pagination.Next
                                    onClick={() => {
                                        if (filters.page + 1 <= totalReportPages.length) {
                                            dispatch(createFilterPage(filters.page + 1))
                                        }
                                    }}
                                />
                                <Pagination.Last
                                    onClick={() => {
                                        dispatch(createFilterPage(totalReportPages[totalReportPages.length - 1].pageNumber))
                                    }}

                                />
                            </>
                            : <></>
                    }
                </Pagination>
            </Col>
        </Row>
    )
}

export default ReportPagination