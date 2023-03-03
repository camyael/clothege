import AxiosClient from "../utils/AxiosClient";

export default class CartsService {
    constructor() {
        this.client = new AxiosClient()
    }

    order = ({body, callbackSuccess, callbackError}) => {
        const reqInfo = {
            url: `${process.env.REACT_APP_URL_BACKEND}/api/carts/checkout`,
            body: body,
            callbackSuccess,
            callbackError
        }
        return this.client.postRequest(reqInfo)
    }
}