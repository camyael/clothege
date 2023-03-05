import AxiosClient from "../utils/AxiosClient";
import { getJSONHeaders } from "../utils/http";

export default class UsersService {
    constructor() {
        this.client = new AxiosClient()
    }

    loginPost = ({body, callbackSuccess, callbackError}) => {
        const reqInfo = {
            url: `${process.env.REACT_APP_URL_BACKEND}/api/login`,
            body: body,
            config: getJSONHeaders(),
            callbackSuccess,
            callbackError
        }
        this.client.postRequest(reqInfo)
    }

    registerPost = ({body, callbackSuccess, callbackError}) => {
        const reqInfo = {
            url: `${process.env.REACT_APP_URL_BACKEND}/api/register`,
            body: body,
            callbackSuccess,
            callbackError
        }
        this.client.postRequest(reqInfo)
    }

    restorePassword = ({body, callbackSuccess, callbackError}) => {
        const reqInfo = {
            url: `${process.env.REACT_APP_URL_BACKEND}/api/passportrestore`,
            body: body,
            callbackSuccess,
            callbackError
        }
        this.client.postRequest(reqInfo)
    }

    newPassword = ({body, callbackSuccess, callbackError}) => {
        const reqInfo = {
            url: `${process.env.REACT_APP_URL_BACKEND}/api/restorepassword`,
            body: body,
            callbackSuccess,
            callbackError
        }
        this.client.putRequest(reqInfo)
    }

    logout = ({callbackSuccess, callbackError}) => {
        const reqInfo = {
            url: `${process.env.REACT_APP_URL_BACKEND}/api/logout`,
            callbackSuccess,
            callbackError
        }
        this.client.getRequest(reqInfo)
    }

    deleteAccount = ({url, callbackSuccess, callbackError}) => {
        const reqInfo = {
            url: `${process.env.REACT_APP_URL_BACKEND}/api/deleteaccount/${url}`,
            callbackSuccess,
            callbackError
        }
        this.client.deleteRequest(reqInfo)
    }
}