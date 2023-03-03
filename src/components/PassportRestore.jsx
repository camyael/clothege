import { useState } from "react";
import UsersService from "../services/UsersService";

const PassportRequestRestore = () => {
    const [mail, setMail] = useState([])

    const sendMailRestore = (e) => {
        e.preventDefault()

        const callbackSuccess = (res) => {
            console.log(res)
        }
    
        const callbackError = (error) => {
            console.log(error)
        }

        const service = new UsersService()
        service.restorePassword({
            body: {
                mailBody : mail
            },
            callbackSuccess,
            callbackError
        })
    }

    return (
        <>
            <form onSubmit={sendMailRestore}>
                <input type="text" name="mail" value={mail} onChange={e => setMail(e.target.value)}/>
                <input type="submit"/>
            </form>
        </>
    )
}

export default PassportRequestRestore;