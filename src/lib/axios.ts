import axios from "axios"

/**
 * @description Funcion para crear una instancia de axios para hacer peticiones a la api de Flask.
 * 
 */
const flaskApi = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL_FLASK_API
})

/**
 * @description Funcion para crear una instancia de axios para hacer peticiones a la api de Spring.
 */
const springApi = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL_SPRING_API
})

export { flaskApi, springApi }