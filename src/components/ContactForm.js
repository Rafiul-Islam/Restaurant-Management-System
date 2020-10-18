import React, {useEffect, useState} from 'react';
import moment from "moment";
import {Button} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

const ContactForm = (props) => {

    const initialFieldValues = {
        id: '',
        itemName: '',
        price: '',
        amount: '',
        dateTime: moment().format("DD MMM, YYYY"),
        total: ''
    }
    const [values, setValues] = useState(initialFieldValues)

    useEffect(() => {
        if (props.currentId == '') {
            setValues({
                ...initialFieldValues
            })
        } else {
            setValues({
                ...props.contactObj[props.currentId]
            })
        }
    }, [props.currentId, props.contactObj])

    const submitHandler = (e) => {
        e.preventDefault()
        let total = parseInt(values.price) * parseInt(values.amount)
        values.total = total
        props.addOrEdit(values)

    }

    const inputChangeHandler = (e) => {
        const {name, value} = e.target
        setValues({
            ...values,
            [name]: value
        })
    }
    return (
        <>
            <form onSubmit={submitHandler} className='mb-sm-4' autoComplete="off">
                <div className="form-group">
                    <div className="input-group mb-3">
                        <TextField label="ID" variant='outlined' onChange={inputChangeHandler} name='id' type="number"
                               placeholder="ID" value={values.id}/>
                    </div>
                </div>
                <div className="form-group">
                    <div className="input-group mb-3">
                        <TextField label="Item Name" variant='outlined' onChange={inputChangeHandler} name='itemName' type="text" className="mt-2"
                               placeholder="Item Name" value={values.itemName}/>
                    </div>
                </div>
                <div className="form-group">
                    <div className="input-group mb-3">
                        <TextField label="Price" variant='outlined' onChange={inputChangeHandler} name='price' type="number" className="mt-2"
                               placeholder="Price" value={values.price}/>
                    </div>
                </div>
                <div className="form-group">
                    <div className="input-group mb-3">
                        <TextField label="Number Of Plates" variant='outlined' onChange={inputChangeHandler} name='amount' type="number" className="mt-2"
                               placeholder="Number Of Plates" value={values.amount}/>
                    </div>
                </div>
                <Button variant='contained' color='primary' type="submit" className="mb-sm-5">{
                    props.currentId ? 'Update' : 'Save'
                }</Button>
            </form>
        </>
    );
};

export default ContactForm;
