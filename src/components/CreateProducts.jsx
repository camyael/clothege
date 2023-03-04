import { useState } from "react";
import ProductsService from "../services/ProductsService";
import Navbar from "./Navbar";

const CreateProducts = () => {
    const [ file, setFile ] = useState("")
    const [ values, setValues ] = useState({
        title: "",
        description: "",
        price: "",
        brand: ""
    })

    const inputChange = (evt) => {
        const { name, value } = evt.target;
        setValues({
            ...values,
            [name]: value
        })
    }

    const handleCreateProduct = (e) => {
        e.preventDefault()
        const form = new FormData()
        form.append('title', values.title)
        form.append('description', values.description)
        form.append('price', values.price)
        form.append('brand', values.brand)
        form.append('image', file)
        
        const callbackSuccess = (res) => {
            console.log(res)
        }

        const callbackError = (err) => {
            console.log(err)
        }

        const service = new ProductsService()
        service.createProduct({
            body: form,
            callbackSuccess,
            callbackError
        })
    }

    return (
        <>
        <Navbar/>
            <h2 className="section-title">crear productos</h2>
            <form onSubmit={e => handleCreateProduct(e)}>
                <input type="text" name="title" placeholder="title" value={values.title} onChange={e => inputChange(e)}/>
                <input type="text" name="description" placeholder="description" value={values.description} onChange={e => inputChange(e)}/>
                <input type="number" name="price" placeholder="price" value={values.price} onChange={e => inputChange(e)}/>
                <input type="text" name="brand" placeholder="brand" value={values.brand} onChange={e => inputChange(e)}/>
                <input type="file" name="image" onChange={e => setFile(e.target.files[0])}/>
                <input type="submit"/>
            </form>
        </>
    )
}

export default CreateProducts;