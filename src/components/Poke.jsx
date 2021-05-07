import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {pokeDetalleAccion} from '../redux/pokeDucks'

const Poke = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        
        const fetchData = () => {
            dispatch(pokeDetalleAccion())
        }
        fetchData()

    }, [dispatch])
    const pokemon = useSelector(store => store.pokemones.unPokemon)
    // console.log(pokemon);
    const {nombre, ancho, alto, foto} = !!pokemon && pokemon;
    return (
        <div className="d-flex justify-content-center">
        <div className="card text-center col-md-6">
            <div className="card-body">
            <img src={foto} alt={nombre} className="card-img-top"/>
            <div className="card-title text-uppercase">
             {nombre}
            </div>
            <p className="card-text">Alto: {alto} | Ancho: {ancho}</p>
            </div>
        </div>
        </div>
    )
}

export default Poke
