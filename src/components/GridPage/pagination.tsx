import 'bootstrap/dist/css/bootstrap.min.css'
import React from "react";
import {Pagination} from "react-bootstrap";

interface PaginationProps {
    currentPage: number,
    itemsCount: number,
    itemsPerPage: number,
    paginate: (n: number) => void,
    nextPage: () => void,
    prevPage: () => void
}

const TablePagination: React.FC<PaginationProps> = (props: PaginationProps) => {
    const pageNumbers = []

    for (let i =1; i <= Math.ceil(props.itemsCount / props.itemsPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <>
            <div>
                <Pagination>
                    <Pagination.Prev onClick={props.prevPage}/>
                    {pageNumbers.map(n => {
                        return (
                            <Pagination.Item
                                active={props.currentPage === n}
                                onClick={() => props.paginate(n)}>
                                {n}
                            </Pagination.Item>
                        )
                    })}

                    <Pagination.Next onClick={props.nextPage}/>
                </Pagination>
            </div>
        </>
    );
}

export default TablePagination;