import { useContext } from "react"
import { CartContext } from "../context/CartContext"
import Navbar from "./Navbar"
import UsersService from "../services/UsersService";

const Profile = () => {
    const { user } = useContext(CartContext)

    const handleLogout = () => {
        const callbackSuccess = (res) => {
            if(res.data.status === "success") {
                localStorage.removeItem('user')
                setTimeout(() => window.location.replace('/login'), 2000);
            }
        }

        const callbackError = (error) => {
            console.log(error)
        }

        const service = new UsersService()
        service.logout({
            callbackSuccess,
            callbackError
        })
    }

    return (
        <>
        <Navbar/>
        <div className="section-profile">
            <h2 className="section-title">Perfil</h2>
            {
                user !== null
                ? <div className="section-profile-card">
                    <img src={user.user.image} alt="user-profile"/>
                    <p>Nombre: {user.user.fullname}</p>
                    <p>Email: {user.user.mail}</p>
                    <p>Télefono: {user.user.phoneNumber}</p>
                    <input type="submit" className="botton-logout" value={"Cerrar sesion"} onClick={handleLogout}/>
                </div>
                :   <p>No existe el perfil</p>
            }
        </div>
        </>
    )
}

export default Profile;