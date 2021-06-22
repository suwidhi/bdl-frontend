import React from 'react';
import {
    ChakraProvider,
} from '@chakra-ui/react';

import { Context } from './Store'
import { Route, Switch } from 'react-router-dom'
import Admin from './Admin';
import Login from './Login';
import Main from './Main';

function App() {

    const [state, dispatch] = React.useContext(Context)

    return (
        <ChakraProvider>
            <Route path='/admin'>
                { state.token == '' ? <Login /> : <Admin /> }
            </Route>

            <Route path='/'>
                <Main />
            </Route>

        </ChakraProvider>
    );
}

export default App;
