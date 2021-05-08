import React, { useEffect, useState } from 'react';
import Pokemones from './components/Pokemones';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Perfil from './components/Perfil';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import { auth } from './firebase';



function App() {

    const [firebaseUser, setFirebaseUser] = useState(false)

    useEffect(() => {
        const fetchUser = () => {
            auth.onAuthStateChanged(user => {
                console.log(user)
                if (user) {
                    setFirebaseUser(user)
                } else {
                    setFirebaseUser(null)
                }
            })
        }
        fetchUser()

    }, [])
    const RutaProtegida = ({ component, path, ...rest }) => {
        const dataLocal = localStorage.getItem('usuario')
        if (dataLocal) {
            const usrStorage = JSON.parse(dataLocal)
            if (usrStorage.uid === firebaseUser.uid) {
                return <Route component={component} path={path} {...rest} />
            } else {
                return <Redirect to="/login" {...rest} />
            }

        } else {
            return <Redirect to="/login" {...rest} />
        }
    }
    return firebaseUser !== false ? (
        <Router>
            <div className="container">
                <Navbar />
                <Switch>
                    <RutaProtegida component={Pokemones} path="/" exact />
                    <Route component={Login} path="/login" exact />
                    <Route component={Perfil} path="/perfil" exact />
                </Switch>
            </div>
        </Router>
    ) : (<div className="container">
        <div className="alert alert-info text-center mt-5">
            Loading...
        </div>
    </div>)
}

export default App;
