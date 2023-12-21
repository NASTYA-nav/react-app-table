import * as React from "react"
import {useEffect, useState} from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import Grid, {ColumnDefinition, Order} from "./grid";
import {IData} from "../../services/contracts";
import {useData} from "../../hooks/useData.hooks";
import {Button, Spinner} from "react-bootstrap";
import AddForm from "./addForm";
import Search from "./search";
import {values, mapObject, find, sortBy} from "underscore";

function GridPage() {
    const [rows, setRows] = useState<IData[]>([])
    const [isBigData, setIsBigData] = useState(false)
    const [sortByRow, setSortByRow] = useState<ColumnDefinition>({name: 'id', sortDirection: Order.asc})
    const {data, isLoading, error} = useData(isBigData)

    const tableColumns: ColumnDefinition[] = [
        {
            name:'id',
            sortDirection: Order.noOrder
        },
        {
            name:'firstName',
            sortDirection: Order.noOrder
        },
        {
            name:'lastName',
            sortDirection: Order.noOrder
        },
        {
            name:'email',
            sortDirection: Order.noOrder
        },
        {
            name:'phone',
            sortDirection: Order.noOrder
        }
    ]

    const onChangeSizeData = () => {
        setIsBigData(!isBigData)
    }
    const onAddTableRow = (item: any) => {
        setRows([{
            id: rows.length + 1,
            firstName: item.firstName,
            lastName: item.lastName,
            email: item.email,
            phone: item.phone
        }, ...rows])
    }

    const onSearch = (s: string) => {
        if (s.length === 0) return setRows(data ? sortBy(data, sortByRow.name) : [])

        let filteredRows: IData[] = []
        mapObject(rows, (row) => {
            const w: string[] = values(row).slice(0, 5);
            const isRowExist = find(w, (i) => {
                return i.toString().includes(s.toLowerCase())
            })
            if (isRowExist) {
                filteredRows.push(row)
            }
        })
        setRows(filteredRows)
    }

    const onSort = (c: ColumnDefinition) => {
        debugger
        let sorted = sortBy(rows, c.name)
        if (c.sortDirection === Order.desc) {
            sorted.reverse()
        }
        setSortByRow(c)
        setRows(sorted)
    }

    useEffect(() => {
        debugger
        if (!isLoading && !error && data) {
            setRows(rows.length !==0 ? rows : sortBy(data, sortByRow.name))
        }
    }, [isLoading, error, data, sortByRow, rows])

    return (
        <>
            <Button className='m-2' variant="outline-secondary" onClick={onChangeSizeData}>
                {isBigData ? 'Показать маленькие данные' : 'Показать большие данные'}
            </Button>
            <div className='d-flex flex-row p-3'>
                <AddForm onAddTableRow={onAddTableRow}/>
            </div>
            <Search onSearch={onSearch}/>

            {rows.length !== 0 && <Grid data={rows} tableColumns={tableColumns} onSort={onSort} sortByRow={sortByRow}/>}
            {(rows.length === 0 && !isLoading && !error) && <div>No data</div>}
            {isLoading && <Spinner animation="border"/>}
            {error && <div>Error!</div>}
        </>
    );
}

export default GridPage;