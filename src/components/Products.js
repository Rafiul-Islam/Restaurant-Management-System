import React, {useEffect, useState} from 'react';
import ProductForm from "./ProductForm";
import fireDb from '../Firebase/config'

const Products = () => {

    const [productObj, setProductObj] = useState({})
    const [currentId, setCurrentId] = useState('')

    useEffect(() => {
        fireDb.child('Products').on('value', snapshot => {
            if (snapshot.val() != null)
                setProductObj({...snapshot.val()})
            else {
                setProductObj({})
            }
        })
    }, [])

    const addOrEdit = (obj) => {
        if (!currentId) {
            fireDb.child('Products').push(
                obj,
                error => {
                    if (error)
                        console.log(error)
                    else
                        setCurrentId('')
                }
            )
        } else {
            fireDb.child(`Products/${currentId}`).set(
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
        if (window.confirm('Do you want to delete this?')) {
            fireDb.child(`Products/${id}`).remove(
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
            <div className="row mt-5">
                <div className="col-md-2 offset-md-1 text-left">
                    <ProductForm {...({addOrEdit, currentId, productObj})}/>
                </div>
                <div className="col-md-8">
                    <table className="table">
                        <thead style={{backgroundColor: '#3f51b5', color: "white"}}>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Item Name</th>
                            <th scope="col">Price (BDT)</th>
                            <th scope="col">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            Object.keys(productObj).map((id) =>
                                <tr key={id}>
                                    <td>{productObj[id].id}</td>
                                    <td>{productObj[id].itemName}</td>
                                    <td>{productObj[id].price}</td>
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

export default Products;
