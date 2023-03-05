import { useContext } from "react"
import { CartContext } from "../context/CartContext"
import Navbar from "./Navbar"
import UsersService from "../services/UsersService";

const Profile = () => {
    const { user } = useContext(CartContext)

    const handleLogout = () => {
        const callbackSuccess = (res) => {
            if(res.data.status === "success") {
                localStorage.clear()
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

    const handleDeleteUser = () => {
        const callbackSuccess = (res) => {
            if(res.data.status === "success") {
                localStorage.clear()
                setTimeout(() => window.location.replace('/login'), 2000);
            }
        }

        const callbackError = (error) => {
            console.log(error)
        }
        
        const service = new UsersService()
        service.deleteAccount({
            url: user.user.mail,
            callbackSuccess,
            callbackError
        })
    }

    return (
        <div className="content-size">
        <Navbar/>
        <div className="section-profile">
            <h2 className="section-title">Perfil</h2>
            {
                user !== null
                ? <div className="section-profile-card">
                    <img src={user.user.image} alt="user-profile"/>
                    <p>{user.user.fullname}</p>
                    <p>Email: {user.user.mail}</p>
                    <p>Télefono: ${user.user.phoneNumber}</p>
                    <button className="button-logout" onClick={handleLogout}>Cerrar sesion</button>
                    <button className="button-deleteuser" onClick={handleDeleteUser}>Eliminar cuenta</button>
                </div>
                :   <p>No existe el perfil</p>
            }
        </div>
        </div>
    )
}

export default Profile;