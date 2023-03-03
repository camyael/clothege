const setItem = (key, value) => {
    try {
        window.localStorage.setItem(key, value)
    } catch (error) {
        console.log(error)
    }
}

const getItem = (key) => {
    try {
        const result = window.localStorage.getItem(key)
        return result
    } catch (error) {
        console.log(error)
    }
}

export { setItem, getItem };