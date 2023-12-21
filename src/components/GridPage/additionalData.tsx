import 'bootstrap/dist/css/bootstrap.min.css'
import React from "react";

interface AdditionalDataProps {
    additionalData: any
}

const AdditionalData: React.FC<AdditionalDataProps> = (props: AdditionalDataProps) => {

    return (
            <div className='d-flex flex-column p-2'>
                Выбран пользователь <b>{props.additionalData.firstName + ' ' + props.additionalData.lastName}</b>
                Описание:
                <b>{props.additionalData.address.description || ''}</b>
                Адрес проживания: <b>{props.additionalData.address.streetAddress || ''}</b>
                Город: <b>{props.additionalData.address.city || ''}</b>
                Провинция/штат: <b>{props.additionalData.address.state || ''}</b>
                Индекс: <b>{props.additionalData.address.zip || ''}</b>
            </div>
    )
}

export default AdditionalData;