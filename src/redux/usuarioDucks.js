import { auth, firebase, db, storage } from '../firebase';
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
            return { ...dataInicial }
        default:
            return { ...state }
    }
}


//action
export const ingresoUsuarioAccion = () => async (dispatch, getState) => {
    dispatch({
        type: LOADING
    })
    try {
        const privider = new firebase.auth.GoogleAuthProvider();
        const res = await auth.signInWithPopup(privider);

        const usuario = {
            uid: res.user.uid,
            email: res.user.email,
            displayName: res.user.displayName,
            photoURL: res.user.photoURL
        }
        console.log(res.email);
        const usuarioDB = await db.collection('usuarios').doc(usuario.email).get()
        if (usuarioDB.exists) {
            // Cuando exista el usuario en firestore
            dispatch({
                type: USUARIO_EXITO,
                payload: usuarioDB.data()
            })
            localStorage.setItem('usuario', JSON.stringify(usuarioDB.data()))
        } else {
            // *en caso de que no exista el usuario
            await db.collection('usuarios').doc(usuario.email).set(usuario)
            dispatch({
                type: USUARIO_EXITO,
                payload: usuario
            })
            localStorage.setItem('usuario', JSON.stringify(usuario))
        }

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

export const actualizarUsuarioAccion = (nombreActualizado) => async (dispatch, getState) => {
    dispatch({
        type: LOADING
    })
    const { user } = getState().usuario
    console.log(user);
    try {

        await db.collection('usuarios').doc(user.email).update({
            displayName: nombreActualizado
        })
        const usuario = {
            ...user,
            displayName: nombreActualizado
        }
        dispatch({
            type: USUARIO_EXITO,
            payload: usuario
        })
        localStorage.setItem('usuario', JSON.stringify(usuario));
    } catch (error) {
        console.log(error);
    }
}
export const editarFotoAccion = (imagenEditada) => async (dispatch, getState) => {
    dispatch({
        type: LOADING
    })
    const { user } = getState().usuario

    try {
        const imagenRef = await storage.ref().child(user.email).child('foto perfil');
        await imagenRef.put(imagenEditada)
        const imagenURL = await imagenRef.getDownloadURL()
        await db.collection('usuarios').doc(user.email).update({
            photoURL: imagenURL
        })
        const usuario = {
            ...user,
            photoURL: imagenURL
        }
        dispatch({
            type: USUARIO_EXITO,
            payload: usuario
        })
        localStorage.setItem('usuario', JSON.stringify(usuario));
    } catch (error) {
        console.log(error);
    }
}