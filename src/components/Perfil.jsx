import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { actualizarUsuarioAccion } from '../redux/usuarioDucks';

const Perfil = () => {
    const { displayName, email, photoURL } = useSelector(store => store.usuario.user);
    const loading = useSelector(store => store.usuario.loading);

    const [nombreUsuario, setNombreUsuario] = useState(displayName);
    const [activarForm, setActivarForm] = useState(false);
    const dispatch = useDispatch();

    const handleActivarForm = () => {
        setActivarForm(true);
    }
    const handleActualizarUsuario = () => {

        if (!nombreUsuario.trim()) {
            console.log('Nombre vacio');
        }
        dispatch(actualizarUsuarioAccion(nombreUsuario))
        setActivarForm(false);

    }
    const handleUsuarioDatos = (e) => {
        setNombreUsuario(e.target.value)
    }
    return (
        <div className="mt-5 text-center">
            <div className="card">
                <div className="card-body">
                    <img src={photoURL} alt={displayName} width="100px" className="img-fluid" />
                    <h5 className="card-title">Nombre {displayName}</h5>
                    <p className="card-text">Email: {email}</p>
                    <button className="btn btn-dark" onClick={handleActivarForm}>Editar nombre</button>
                </div>
                {
                    loading && (
                        <div className="card-body">
                        <div className="d-flex justify-content-center my-3">
                            <div className="bouncingLoader">
                            <div></div>
                            </div>
                        </div>
                        </div>
                    )
                }
                {
                    activarForm && (

                        <div className="card-body">
                            <div className="row justify-content-center">
                                <div className="col-md-5">
                                    <div className="input-group mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={nombreUsuario}
                                            onChange={handleUsuarioDatos}
                                        />
                                        <button
                                            className="btn btn-dark"
                                            type="button"
                                            onClick={handleActualizarUsuario}
                                        >Actualizar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>

        </div>
    )
}

export default Perfil
