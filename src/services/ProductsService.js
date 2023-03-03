import AxiosClient from "../utils/AxiosClient";

export default class ProductsService {
    constructor() {
        this.client = new AxiosClient()
    }

    getAll = ({callbackSuccess, callbackError}) => {
        const reqInfo = {
            url: `${process.env.REACT_APP_URL_BACKEND}/api/products`,
            callbackSuccess,
            callbackError
        }
        this.client.getRequest(reqInfo)
    }

    getById = ({id, callbackSuccess, callbackError}) => {
        const reqInfo = {
            url: `${process.env.REACT_APP_URL_BACKEND}/api/products/${id}`,
            callbackSuccess,
            callbackError
        }
        this.client.getRequest(reqInfo)
    }
}