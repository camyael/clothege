import axios from 'axios'

export default class AxiosClient {
    getRequest = ({url, callbackSuccess, callbackError}) => {
        axios.get(url)
        .then(callbackSuccess)
        .catch(callbackError)
    }

    postRequest = ({url, body, callbackSuccess, callbackError}) => {
        axios.post(url, body)
        .then(callbackSuccess)
        .catch(callbackError)
    }

    putRequest = ({url, body, callbackSuccess, callbackError}) => {
        axios.put(url, body)
        .then(callbackSuccess)
        .catch(callbackError)
    }

    deleteRequest = ({url, callbackSuccess, callbackError}) => {
        axios.delete(url)
        .then(callbackSuccess)
        .catch(callbackError)
    }
}