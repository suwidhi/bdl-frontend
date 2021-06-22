import { Box, Button, Progress } from '@chakra-ui/react'
import React from 'react'
import InventoryView from '../dataview/InventoryView'
import CreateForm from '../components/CreateForm'
import DealerForm from '../formdialog/DealerForm'

import apiClient from '../services/api';
import UpdateForm from '../components/UpdateForm'
import { Context } from '../Store'

function DealerManager() {
    const [state, dispatch] = React.useContext(Context)
    
    const head = ['Car VIN', 'Is Sold', 'Date']
    // data from database
    const [data, setData] = React.useState([]);

    // error from database
    const [errors, setErrors] = React.useState({})

    // loading ?
    const [loading, setLoading] = React.useState(true)

    const config = {
        headers: {
            'Content-Type' : 'application/json',
            'Authorization': 'Bearer ' + state.token
        }
    }
    React.useEffect(function(){
        fetchData()
    }, [])

    const fetchData = function() {
        setLoading(true)
        apiClient.get('/api/inventories', config)
        .then(response => {
            setData(response.data)
            setLoading(false)
        }).catch(error => {})
    }
    
    return (
        <>
            <InventoryView dataset={{head: head, body: data}} />

            {
                loading && <Progress size="sm" isIndeterminate />
            }
        </>
    )
}

export default DealerManager
