import React, {useEffect, useState} from 'react';
import fireDb from "../Firebase/config";
import moment from "moment";
import TextField from "@material-ui/core/TextField";
import {Button} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const SellDetails = (props) => {

    const [contactObj, setContactObj] = useState({})
    const [sellObj, setSellObj] = useState({})

    const initialFieldValues = {
        id: '',
        itemName: '',
        price: '',
        amount: '',
        dateTime: moment().format("DD MMM, YYYY"),
        total: ''
    }

    const emptyOBJ = {
        id: '',
        itemName: '',
        price: '',
        amount: '',
        dateTime: moment().format("DD MMM, YYYY"),
        total: ''
    }

    const [values, setValues] = useState(initialFieldValues)

    useEffect(() => {
        fireDb.child('Products').on('value', snapshot => {
            if (snapshot.val() != null)
                setContactObj({...snapshot.val()})
        })

        fireDb.child('sellDetails').on('value', snapshot => {
            if (snapshot.val() != null)
                setSellObj({...snapshot.val()})
        })

    }, [])

    const addToDataBase = (obj) => {
        fireDb.child('sellDetails').push(
            obj,
            error => {
                if (error)
                    console.log(error)
            }
        )
    }

    const submitHandler = (e) => {
		e.preventDefault()
        values.total = parseInt(values.price) * parseInt(values.amount)
        addToDataBase(values)
        setValues(emptyOBJ)
    }

    const inputChangeHandler = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    const idChangeHandler = (e) => {
        let selectedIdDetails = e.target.value
        values.id = selectedIdDetails.id
        values.itemName = selectedIdDetails.itemName
        values.price = selectedIdDetails.price
    }

    return (
        <div className="row mt-5">
            <div className="col-md-2 offset-md-1 text-left">
                <form onSubmit={submitHandler} className='mb-sm-4' autoComplete="off">
                    <FormControl fullWidth variant="outlined">
                        <InputLabel id="demo-simple-select-outlined-label">Item</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            label="Item"
                            onChange={idChangeHandler}
                        >
                            {
                                Object.keys(contactObj).map((id) =>
                                    <MenuItem key={id} value={contactObj[id]}>{contactObj[id].itemName}</MenuItem>
                                )

                            }
                        </Select>
                    </FormControl>
                    <div className="form-group">
                        <div className="input-group mb-3">
                            <TextField label="Number Of Plates" variant='outlined' onChange={inputChangeHandler}
                                       name='amount' type="number" className="mt-2"
                                       placeholder="Number Of Plates" value={values.amount}/>
                        </div>
                    </div>
                    <Button variant='contained' color='primary' type="submit" className="mb-sm-5">Save
                    </Button>
                </form>
            </div>
            <div className="col-md-8">
                <table className="table">
                    <thead style={{backgroundColor: '#3f51b5', color: "white"}}>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Item Name</th>
                        <th scope="col">Price (BDT)</th>
                        <th scope="col">Number of Plates</th>
                        <th scope="col">Date</th>
                        <th scope="col">Total Price (BDT)</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        Object.keys(sellObj).map((id) =>
                            <tr key={id}>
                                <td>{sellObj[id].id}</td>
                                <td>{sellObj[id].itemName}</td>
                                <td>{sellObj[id].price}</td>
                                <td>{sellObj[id].amount}</td>
                                <td>{sellObj[id].dateTime}</td>
                                <td>{sellObj[id].total}</td>
                            </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SellDetails;

