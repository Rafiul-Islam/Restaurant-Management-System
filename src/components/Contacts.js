import React, {useEffect, useState} from 'react';
import ContactForm from "./ContactForm";
import fireDb from '../db-service/Firebase'
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from '@material-ui/icons/Menu';
import Typography from "@material-ui/core/Typography";
import {Box} from "@material-ui/core";

const Contacts = () => {

    const [contactObj, setContactObj] = useState({})
    const [currentId, setCurrentId] = useState('')

    useEffect(() => {
        fireDb.child('contactNew').on('value', snapshot => {
            if (snapshot.val() != null)
                setContactObj({...snapshot.val()})
            else {
                setContactObj({})
            }
        })
    }, [])

    const addOrEdit = (obj) => {
        if (!currentId) {
            fireDb.child('contactNew').push(
                obj,
                error => {
                    if (error)
                        console.log(error)
                    else
                        setCurrentId('')
                }
            )
        } else {
            fireDb.child(`contactNew/${currentId}`).set(
                obj,
                error => {
                    if (error)
                        console.log(error)
                    else
                        setCurrentId('')
                }
            )
        }
    }

    const deleteHandler = (id) => {
        if (window.confirm('do you want to delete this?')) {
            fireDb.child(`contactNew/${id}`).remove(
                error => {
                    if (error)
                        console.log(error)
                    else
                        setCurrentId('')
                }
            )
        }
    }

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6">
                        Hotel Management Application
                    </Typography>
                </Toolbar>
            </AppBar>
            <div className="row mt-5">
                <div className="col-md-2 offset-md-1 text-left">
                    <ContactForm {...({addOrEdit, currentId, contactObj})}/>
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
                            <th scope="col">Total (BDT)</th>
                            <th scope="col">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            Object.keys(contactObj).map((id) =>
                                <tr key={id}>
                                    <td>{contactObj[id].id}</td>
                                    <td>{contactObj[id].itemName}</td>
                                    <td>{contactObj[id].price}</td>
                                    <td>{contactObj[id].amount}</td>
                                    <td>{contactObj[id].dateTime}</td>
                                    <td>{contactObj[id].total}</td>
                                    <td>
                                        <i className="fas fa-edit text-primary" style={{cursor: "pointer"}}
                                           onClick={() => {
                                               setCurrentId(id)
                                           }}></i>
                                        <i className="fas fa-trash ml-4 text-danger" style={{cursor: "pointer"}}
                                           onClick={() => {
                                               deleteHandler(id)
                                           }}></i>
                                    </td>
                                </tr>
                            )
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Contacts;
