import 'bootstrap/dist/css/bootstrap.min.css'
import React, {useState} from "react";
import {Button, Form} from "react-bootstrap";

interface SearchProps {
    onSearch: (substring: string) => void
}

const Search: React.FC<SearchProps> = (props: SearchProps) => {
    const [search, setSearch] = useState('')

    const isSearchDisabled = (): boolean => {
        return search.length === 0
    }

    return (
        <div className='d-inline col-3'>
            <Form.Control
                type='text'
                name='find'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder=''/>
            <Button className='m-2' variant="outline-primary" onClick={() => props.onSearch(search.trim().toLowerCase())}>
                Найти
            </Button>
        </div>
    )
}

export default Search;