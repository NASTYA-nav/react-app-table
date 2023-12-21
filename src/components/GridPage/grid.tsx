import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css'
import React, {useEffect, useState} from "react";
import {IData} from "../../services/contracts";
import TablePagination from "./pagination";
import AdditionalData from "./additionalData";

export enum Order {asc = 'asc', desc = 'desc', noOrder = 'no'}

export interface ColumnDefinition {
    name: string,
    sortDirection: string
}

interface GridProps {
    data: any[],
    tableColumns: any[],
    sortByRow: ColumnDefinition,
    onSort: (c: ColumnDefinition) => void
}

const Grid: React.FC<GridProps> = (props: GridProps) => {
    const itemsPerPage = 50
    const [currentPage, setCurrentPage] = useState(1)
    const [lastCurrentRow, setLastCurrentRow] = useState(currentPage * itemsPerPage)
    const [firstCurrentRow, setFirstCurrentRow] = useState(lastCurrentRow - itemsPerPage)
    const [currentRows, setCurrentRows] = useState<IData[]>([])
    const [selectedRow, setSelectedRow] = useState<any>()
    const [sortByRow, setSortByRow] = useState<ColumnDefinition>(props.sortByRow)

    const paginate = (page: number) => {
        setCurrentPage(page)
    }

    const nextPage = () => setCurrentPage(currentPage + 1)

    const prevPage = () => setCurrentPage(currentPage - 1)

    const handleClickRow = (i: IData) => {
        setSelectedRow(i)
    }

    const handleSort = (i: ColumnDefinition) => {
        debugger
        let order = i.sortDirection === 'asc' ? 'desc' : 'asc'
        if (sortByRow.name === i.name){
            order = sortByRow.sortDirection === 'asc' ? 'desc' : 'asc'
        }
        setSortByRow({name: i.name, sortDirection: order})

        props.onSort({
            name: i.name,
            sortDirection: order
        })
    }

    function sorting(i: ColumnDefinition): React.ReactElement {
        debugger
        if (i.sortDirection === Order.asc) {
            return <img src={require('../../icons/arrow_up.svg').default}/>
        }
        if (i.sortDirection === Order.desc) {
            return <img src={require('../../icons/arrow_down.svg').default}/>
        }
        return <></>
    }

    useEffect(() => {
        debugger
        const data = props.data.slice(firstCurrentRow, lastCurrentRow)
        setCurrentRows(data)
        setLastCurrentRow(currentPage * itemsPerPage)
        setFirstCurrentRow(lastCurrentRow - itemsPerPage)
    }, [firstCurrentRow, lastCurrentRow, props.data, currentPage])

    return (
        <>
            <Table striped bordered hover>
                <thead>
                <tr>
                    {props.tableColumns.map((i: ColumnDefinition) => {
                        return <th onClick={() => handleSort(i)}>
                            <div>{i.name}</div>
                            {i.name === props.sortByRow.name && sorting(sortByRow)}
                        </th>
                    })}
                </tr>
                </thead>
                <tbody>
                {currentRows.map((i: IData) => {
                    return (
                        <tr onClick={() => handleClickRow(i)}>
                            <td>{i.id}</td>
                            <td>{i.firstName}</td>
                            <td>{i.lastName}</td>
                            <td>{i.email}</td>
                            <td>{i.phone}</td>
                        </tr>
                    )
                })}

                </tbody>
            </Table>
            <TablePagination
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                itemsCount={props.data.length}
                paginate={paginate}
                nextPage={nextPage}
                prevPage={prevPage}
            />
            {(selectedRow) && <AdditionalData additionalData={selectedRow}/>}
        </>
    );
}

export default Grid;