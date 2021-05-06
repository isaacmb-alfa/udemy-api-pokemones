import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    obtenerPokemonesAccion,
    siguientePokemonAcction,
    previousPokemonAcction,
    pokeDetalleAccion
} from '../redux/pokeDucks'
import Poke from './Poke'

const Pokemones = () => {

    const dispatch = useDispatch()
    const pokemones = useSelector(store => store.pokemones.results)
    const next = useSelector(store => store.pokemones.next)
    const previous = useSelector(store => store.pokemones.previous)

    const handleDispatch = () => {
        dispatch(obtenerPokemonesAccion());
    }
    const handleSiguiente = () => {
        dispatch(siguientePokemonAcction())
    }
    const handlePrevious = () => {
        dispatch(previousPokemonAcction())
    }
    const handleInfo = (url) => {
        dispatch(pokeDetalleAccion(url))
    }



    return (
        <>
            <div className="row">

                <h1 className="display-3 text-center">Pokemones api</h1>
                <br />
                <div className="row">
                    <div className="col-md-4">
                        <div className="d-grid gap-2">
                            <button className={pokemones.length === 0 ? 'btn btn-primary' : 'btn btn-primary disabled'} onClick={handleDispatch} > Get Pokemones </button>

                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="d-grid gap-2">
                            <button className={next !== null ? 'btn btn-warning' : 'btn btn-warning disabled'} onClick={handleSiguiente}> Siguiente </button>
                        </div>
                    </div>
                    <div className="col-md-4 ">
                        <div className="d-grid gap-2">
                            <button className={previous !== null ? 'btn btn-success' : 'btn btn-success disabled'} onClick={handlePrevious}> Atras </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-2">
                <div className="col-md-6">
                    <ul className="mt-3 list-group mx-1">
                        {
                            pokemones.map(item => (

                                <div key={item.name} className="d-flex flex-row ">
                                    <li key={item.name} className="list-group-item text-capitalize my-2 col-10 p-1">{item.name}</li>
                                    <button className="btn btn-info col-2 my-2 ml-1" onClick={() => handleInfo(item.url)}>Info</button>
                                </div>
                            ))
                        }
                    </ul>
                </div>
                <div className="col-md-6 my-3">
                    <h3 className="text-center">Detalle Pokemón</h3>
                    <Poke />
                </div>
            </div>
        </>
    )
}

export default Pokemones
