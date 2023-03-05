import { useState } from 'react';
import { useSearchParams } from 'react-router-dom'
import UsersService from '../services/UsersService';

const RestorePassword = () => {
    const [ password, setPassword ] = useState('')
    const [params] = useSearchParams()
    const token = params.get('token');
    
    const newPassword = (e) => {
        e.preventDefault()
        const callbackSuccess = (res) => {
            if(res.data.status === "success") {
                setTimeout(() => window.location.replace('/login'), 2000);
            }
        }

        const callbackError = (error) => {
            console.log(error)
        }

        const service = new UsersService()
        service.newPassword({
            body: {
                password,
                token
            },
            callbackSuccess,
            callbackError
        })
    }

    return (
        <div className='content-size'>
            <form onSubmit={newPassword} className="mailRestore">
                <h2>Nueva contraseña</h2>
                <input type="text" placeholder="nueva contraseña" value={password} onChange={e => setPassword(e.target.value)}/>
                <input type="submit" className='mailRestore-submit'/>
            </form>
        </div>
    )
}

export default RestorePassword;