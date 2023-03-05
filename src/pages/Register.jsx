import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import UsersService from "../services/UsersService";
import Navbar from "../components/Navbar";

const Register = () => {
    const { user } = useContext(CartContext)
    const [ file, setFile ] = useState("")
    const [ values, setValues ] = useState({
        first_name: "",
        last_name: "",
        mail: "",
        phoneNumber: "",
        password: ""
    })

    const handleInputChangeFile = (e) => {
        const data = e.target.files[0]
        setFile(data)
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setValues({
            ...values,
            [name]: value
        })
    }

    const handleRegister = (e) => {
        e.preventDefault()
        const form = new FormData()
        form.append('first_name', values.first_name)
        form.append('last_name', values.last_name)
        form.append('mail', values.mail)
        form.append('phoneNumber', values.phoneNumber)
        form.append('password', values.password)
        form.append('image', file)
        const service = new UsersService()
        service.registerPost({
            body: form,
            callbackSuccess,
            callbackError
        })
    }

    const callbackSuccess = (res) => {
        const userReq = res.data
        if(userReq.status === "success") {
            setTimeout(() => window.location.replace('/login'), 1000)
        }
    }

    const callbackError = (error) => {
        console.log(error)
    }

    return(
        <div className="content-size">
            <Navbar/>
            {
                user === null
                ? <div className="register-form">
                    <h2 className="section-title">registro</h2>
                    <form id="formSignIn" onSubmit={handleRegister}>
                        <input type="text" name="first_name" placeholder="nombre" value={values.first_name} onChange={handleInputChange}/>
                        <input type="text" name="last_name" placeholder="apellido" value={values.last_name} onChange={handleInputChange}/>
                        <input type="text" name="mail" placeholder="mail" value={values.mail} onChange={handleInputChange}/>
                        <input type="number" name="phoneNumber" placeholder="número de teléfono" value={values.phoneNumber} onChange={handleInputChange}/>
                        <input name="password" value={values.password} placeholder="contraseña" onChange={handleInputChange}/>
                        <div>
                            <label>foto de perfil</label>
                            <input type="file" name="image" onChange={handleInputChangeFile}/>
                        </div>
                        <button className="register-form-submit">registrarse</button>
                    </form>

                    <p>ya tienes una cuenta? <a href="/login">inicia sesion!</a></p>
                </div>
                : <div>
                    <p>Ya te registraste, vuelve a la tienda</p>
                    <a href="/">Ir al inicio</a>
                </div>
            }
        </div>
    )
}

export default Register;