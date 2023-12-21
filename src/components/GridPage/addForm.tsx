import 'bootstrap/dist/css/bootstrap.min.css'
import React, {useState} from "react";
import {Button, Form} from "react-bootstrap";

interface AddFormProps {
    onAddTableRow: (i: any) => void
}


const AddForm: React.FC<AddFormProps> = (props: AddFormProps) => {

    const [inputs, setInputs] = useState({firstName: '', lastName: '', email: '', phone: ''})

    const handleChangeInput = (e: any) => setInputs({
        ...inputs,
        [e.target.name]: e.target.value,
    });

    const isAddDisabled = (): boolean => {
        return inputs.phone.length === 0 ||
            inputs.email.length === 0 ||
            inputs.lastName.length === 0 ||
            inputs.firstName.length === 0
    }

    return (
        <>
            <Form>
                {Object.entries(inputs).map(([key, value]) => {
                    return (
                        <div className='d-inline-flex p-2'>
                            <Form.Control
                                type='text'
                                name={key}
                                value={value}
                                onChange={handleChangeInput}
                                placeholder={key}/>
                        </div>
                    )
                })}
            </Form>
            <Button className='m-2' variant="outline-primary" disabled={isAddDisabled()} onClick={() => {
                props.onAddTableRow(inputs);
                setInputs({firstName: '', lastName: '', email: '', phone: ''})
            }}>
                Добавить в таблицу
            </Button>
        </>
    );
}

export default AddForm;