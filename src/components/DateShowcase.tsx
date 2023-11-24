'use client'
import React from 'react'
import ReactDatePicker from 'react-datepicker'

interface PageProps {
    date: Date | string
}

function DateShowcase({ date }: PageProps) {
    return (
        <>
            {date && <ReactDatePicker
                className='bg-transparent flex text-center'
                dateFormat="dd-MM-yyyy"
                selected={new Date(date)}
                onChange={e => console.log(e)}
                placeholderText="This is readOnly"
                readOnly
            />}
        </>
    )
}

export default DateShowcase