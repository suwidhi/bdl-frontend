import Nav from './user/Nav';
import Hero from './user/Hero';
import Login from './user/Login';
import Register from './user/Register';
import Cars from './user/Cars';

import { Route } from 'react-router-dom'
import Transaction from './user/Transaction';
import Payed from './user/Payed';
import React from 'react';

export default function Main(){

    // test
    React.useEffect(() => {
        console.log('This in main')
    }, [])
    return (
        <>
            <Route path="/" exact>
                <Nav />
                <Hero />
            </Route>

            <Route path="/store" exact>
                <Nav />
                <Hero />
            </Route>

            <Route path="/store/login">
                <Nav />
                <Login />
            </Route>

            <Route path="/store/register">
                <Nav />
                <Register />
            </Route>

            <Route path="/store/cars">
                <Nav />
                <Cars />
            </Route>

            <Route path="/store/dealers">
                <Nav />
                <Register />
            </Route>

            <Route path="/store/transactions">
                <Nav />
                <Transaction />
            </Route>

            <Route path="/store/completed">
                <Nav />
                <Payed />
            </Route>

        </>
    )
}
