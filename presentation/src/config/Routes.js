import React from 'react'
import { Route, Switch } from 'react-router-dom';
import Items from '../pages/Items';
import Signup from '../pages/Signup';
import Home from '../pages/Home';


const Routes =() => {
    return(
        <>
            <h3>Routes</h3>
            <Switch>
                <Route path="/items">
                    <Items />
                </Route>
                <Route path="/signup">
                    <Signup />
                </Route>
                <Route path="/">
                    <Home />
                </Route>
            </Switch>
        </>
    )
}

export default Routes