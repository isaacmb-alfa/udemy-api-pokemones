import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ingresoUsuarioAccion } from '../redux/usuarioDucks';
import { withRouter } from 'react-router-dom';

const Login = ({ history }) => {
    const dispatch = useDispatch();
    const loading = useSelector(store => store.usuario.loading);
    const activo = useSelector(store => store.usuario.activo);
    useEffect(() => {
        // console.log(activo);
        if (activo) {
            history.push('/');
        }
    }, [history, activo])


    const handleAuthDispatch = () => {
        dispatch(ingresoUsuarioAccion());
    }
    return (
        <div className=" mt-5 text-center">
            <h3>Ingreso con Google</h3>
            <hr />
            <button
                className="btn btn-dark mx-1"
                onClick={handleAuthDispatch}
                disabled={loading}>Acceder</button>
        </div>
    )
}

export default withRouter(Login)
