import { auth, firebase } from '../firebase';
// constantes
const dataInicial = {
    loading: false,
    activo: false
}

//types
const LOADING = 'LOADING'
const USUARIO_ERROR = 'USUARIO_ERROR'
const USUARIO_EXITO = 'USUARIO_EXITO'
const CERRAR_SECION = 'CERRAR_SECION'
//reducer
export default function usuariosReducer(state = dataInicial, action) {
    switch (action.type) {
        case LOADING:
            return { ...state, loading: true }
        case USUARIO_ERROR:
            return { ...dataInicial }
        case USUARIO_EXITO:
            return { ...state, loading: false, user: action.payload, activo: true }
        case CERRAR_SECION:
            return {...dataInicial}
        default:
            return { ...state }
    }
}


//action
export const ingresoUsuarioAccion = () => async (dispatch) => {
    dispatch({
        type: LOADING
    })
    try {
        const privider = new firebase.auth.GoogleAuthProvider();
        const res = await auth.signInWithPopup(privider);
        dispatch({
            type: USUARIO_EXITO,
            payload: {
                uid: res.user.uid,
                email: res.user.email
            }
        })
        localStorage.setItem('usuario', JSON.stringify({
            uid: res.user.uid,
            email: res.user.email
        }))
        console.log(res);


    } catch (error) {
        console.log('====================================');
        console.log(error);
        console.log('====================================');
        dispatch({
            type: USUARIO_ERROR
        })
    }
}

export const leerUsuarioActivoAccion = () => (dispatch) => {
    const dataLocal = localStorage.getItem('usuario')
    if (dataLocal) {
        dispatch({
            type: USUARIO_EXITO,
            payload: JSON.parse(dataLocal)
        })
    }
}

export const cerrarSesionAccion = () => (dispatch) => {
    auth.signOut()
    localStorage.removeItem('usuario');
    dispatch({
        type: CERRAR_SECION,
    })
}