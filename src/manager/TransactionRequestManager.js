import { Box, Button, Progress } from '@chakra-ui/react'
import React from 'react'
import TransactionRequestView from '../dataview/TransactionRequestView'
import CreateForm from '../components/CreateForm'

import apiClient from '../services/api';
import UpdateForm from '../components/UpdateForm'
import TransactionForm from '../formdialog/TransactionForm';
import { Context } from '../Store'

function TransactionRequestManager() {
    const [state, dispatch] = React.useContext(Context)
    
    const head = ['Admin', 'Type', 'Model', 'Amount', 'Status', 'Date']
    // data from database
    const [data, setData] = React.useState([]);

    // error from database
    const [errors, setErrors] = React.useState({})

    // loading ?
    const [loading, setLoading] = React.useState(true)

    const [brands, setBrands] = React.useState([])
    const [types, setTypes] = React.useState([])
    
    const config = {
        headers: {
            'Content-Type' : 'application/json',
            'Authorization': 'Bearer ' + state.token
        }
    }
    const fetchAll = (name, setter) => {
        apiClient.get('/api/' + name, config)
        .then(response => {
            setter(response.data)
        })
    }

    React.useEffect(function(){
        fetchData()
    }, [])

    const fetchData = function() {
        setLoading(true)
        apiClient.get('/api/transactions', config)
        .then(response => {
            setData(response.data)
            setLoading(false)
        }).catch(error => {})
    }

    const doUpdate = function(item){

        // check the cars
        apiClient.get('/api/transfer/' + item.id + '/' + item.model + '/' + item.amount, config)
        .then(response => {
            apiClient.patch('/api/transactions/' + item.id, {
            status: 2
            }, config)
            .then(response => {
                fetchData()
            }).catch(error => {
                if(error.response.status == 422){
                    setErrors(error.response.data.errors)
                }
            })
        })
        .catch(error => {
            alert('this is error and you dont know what you doing...')
        })

        
    }

    const [createFormOpen, setCreateFormOpen] = React.useState(false)

    return (
        <>
            <TransactionRequestView dataset={{head: head, body: data}} callback={doUpdate} />

            {
                loading && <Progress size="sm" isIndeterminate />
            }
        </>
    )
}

export default TransactionRequestManager
