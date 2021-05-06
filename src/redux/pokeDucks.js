import axios from 'axios';

// const
const dataInit = {
    count: 0,
    next: null,
    previous: null,
    results: []
}


const OBTENER_POKEMONES_EXITO = 'OBTENER_POKEMONES_EXITO'
const SIGUIENTE_POKEMONES_EXITO = 'SIGUIENTE_POKEMONES_EXITO'
const PREVIOUS_POKEMONES_EXITO = 'PREVIOUS_POKEMONES_EXITO'
const INFO_POKEMON_EXITO = 'INFO_POKEMON_EXITO'

// reducer

export default function pokeReducer(state = dataInit, action) {
    switch (action.type) {
        case OBTENER_POKEMONES_EXITO:
            return {
                ...state,
                ...action.payload
            }
        case SIGUIENTE_POKEMONES_EXITO:
            return {
                ...state,
                ...action.payload
            }
        case PREVIOUS_POKEMONES_EXITO:
            return {
                ...state,
                ...action.payload
            }
        case INFO_POKEMON_EXITO:
            return {
                ...state, unPokemon: action.payload
            }
        default:
            return state;
    }
}

// acctions

export const pokeDetalleAccion = (url = `https://pokeapi.co/api/v2/pokemon/1/`) => async (dispatch, getState) => {
    const dataLocal = localStorage.getItem(url)
    if(dataLocal){
        dispatch({
            type: INFO_POKEMON_EXITO,
            payload: JSON.parse(dataLocal)
        })
        return
    }
    try {
        const res = await axios.get(url)
        const datos = res.data;
        // console.log(res.data);
        dispatch({
            type: INFO_POKEMON_EXITO,
            payload: {
                nombre: datos.name,
                ancho: datos.weight,
                alto: datos.height,
                foto: datos.sprites.front_default
            }
        })
        localStorage.setItem(url, JSON.stringify({
            nombre: datos.name,
            ancho: datos.weight,
            alto: datos.height,
            foto: datos.sprites.front_default
        }))
    } catch (error) {
        console.log(error);
    }

}

export const obtenerPokemonesAccion = () => async (dispatch) => {
    const dataLocal = localStorage.getItem(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=10`)
    if (dataLocal) {
        dispatch({
            type: OBTENER_POKEMONES_EXITO,
            payload: JSON.parse(dataLocal)
        })
        return
    }

    // const { offset } = getState().pokemones
    try {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=10`)
        // console.log(res.data)
        dispatch({
            type: OBTENER_POKEMONES_EXITO,
            payload: res.data
        })
        localStorage.setItem(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=10`, JSON.stringify(res.data))
    } catch (error) {
        console.log(error);
    }

}

export const siguientePokemonAcction = () => async (dispatch, getState) => {
    const { next } = getState().pokemones
    const dataLocal = localStorage.getItem(`${next}`)
    if (dataLocal) {
        dispatch({
            type: SIGUIENTE_POKEMONES_EXITO,
            payload: JSON.parse(dataLocal)
        })
        // console.log('desde local');
        return
    }
    try {
        const res = await axios.get(next)
        // console.log(res.data)
        dispatch({
            type: SIGUIENTE_POKEMONES_EXITO,
            payload: res.data
        })
        // console.log('desde la api')
        localStorage.setItem(`${next}`, JSON.stringify(res.data))
    } catch (error) {
        console.log(error);
    }
}

export const previousPokemonAcction = () => async (dispatch, getState) => {
    const { previous } = getState().pokemones
    const dataLocal = localStorage.getItem(`${previous}`)
    if (dataLocal) {
        dispatch({
            type: SIGUIENTE_POKEMONES_EXITO,
            payload: JSON.parse(dataLocal)
        })
        // console.log('desde local');
        return
    }
    try {
        const res = await axios.get(previous)
        console.log(res.data)
        dispatch({
            type: PREVIOUS_POKEMONES_EXITO,
            payload: res.data
        })
        // console.log('desde la api')
        localStorage.setItem(`${previous}`, JSON.stringify(res.data))
    } catch (error) {
        console.log(error)
    }
}