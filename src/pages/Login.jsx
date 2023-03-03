import { useContext, useState } from "react"
import { CartContext } from "../context/CartContext";
import UsersService from "../services/UsersService";
import { setItem } from "../utils/localStorage";
import Navbar from "../components/Navbar";

const Login = () => {
    const [ mail, setMail ] = useState([])
    const [ password, setPassword ] = useState([])
    const { user, setUser } = useContext(CartContext)

    const submit = (e) => {
        e.preventDefault()

        const callbackSuccess = (res) => {
            const userReq = res.data.payload
            setUser(userReq)
            setItem('user', JSON.stringify(userReq))
            if(res.data.status === "success") {
                setTimeout(() => window.location.replace('/products'), 1000)
            }
        }
    
        const callbackError = (error) => {
            console.log(error)
        }

        const info = {
            mail: mail,
            password: password
        }
        const service = new UsersService();
        service.loginPost({
            body: info,
            callbackSuccess: callbackSuccess,
            callbackError: callbackError
        })
    }   

    return (
        <>
            <Navbar/>
            {
                user === null 
                ? <div>
                    <h1>Inicio de sesion</h1>

                    <form id="formLogIn" onSubmit={submit}>
                        <label>Email</label>
                        <input name="mail" value={mail} onChange={e => setMail(e.target.value)}/>
                        <label>Contraseña</label>
                        <input type="text" value={password} onChange={e => setPassword(e.target.value)}/>
                        <button>Enviar</button>
                    </form>
                    <a href="/passportrequestrestore">Olvidaste la contraseña?</a>
                    <p>no tienes una cuenta? Entonces <a href="/register">registrate!</a></p>
                </div>
                : <p>Ya te registraste</p>
            }
        </>
    )
}

export default Login;