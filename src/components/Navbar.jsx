import React from 'react'
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { cerrarSesionAccion } from '../redux/usuarioDucks';
import { withRouter } from 'react-router-dom';


const Navbar = ({ history }) => {
    const activo = useSelector(store => store.usuario.activo);
    const dispatch = useDispatch()

    const handleCerrarSecion = () => {
        dispatch(cerrarSesionAccion())
        history.push('login');
    }

    return (
        <div className="navbar navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">APP POKE</Link>
                <div className="d-flex">
                    {
                        activo ? (
                            <>
                                <NavLink className="btn btn-dark mx-1" to="/" exact>Inicio</NavLink>
                                <NavLink className="btn btn-dark mx-1" to="/perfil" exact>Perfil</NavLink>
                                <button className="btn btn-dark mx-1" onClick={handleCerrarSecion} >Cerrar Seción</button>
                            </>
                        ) : (

                            <NavLink className="btn btn-dark mx-1" to="/login" exact>Login</NavLink>
                        )
                    }

                </div>
            </div>
        </div>
    )
}

export default withRouter(Navbar);
