import { Box, Button, Progress } from '@chakra-ui/react'
import React from 'react'
import DealerView from '../dataview/DealerView'
import CreateForm from '../components/CreateForm'
import DealerForm from '../formdialog/DealerForm'

import apiClient from '../services/api';
import UpdateForm from '../components/UpdateForm'
import { Context } from '../Store'

function DealerManager() {
    const [state, dispatch] = React.useContext(Context)
    
    const head = ['Dealer Name', 'UID']
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
        apiClient.get('/api/dealers', config)
        .then(response => {
            setData(response.data)
            setLoading(false)
        }).catch(error => {})
    }

    const doCreate = function(event){
        event.preventDefault()
        const formdata = new FormData(event.target)
        const entries = Object.fromEntries(formdata)

        console.log(entries)
        apiClient.post('/api/dealers', entries, config)
        .then(response => {
            setCreateFormOpen(false)
            fetchData()
        }).catch(error => {
            if(error.response.status == 422){
                setErrors(error.response.data.errors)
            }
        })
    }
    const doUpdate = function(event){
        event.preventDefault()
        const formdata = new FormData(event.target)
        let entries = Object.fromEntries(formdata)
        entries = Object.assign(updateFormData, entries)

        console.log(entries)
        apiClient.patch('/api/dealers/' + entries.id, entries, config)
        .then(response => {
            setUpdateFormOpen(false)
            fetchData()
        }).catch(error => {
            if(error.response.status == 422){
                setErrors(error.response.data.errors)
            }
        })
    }

    const doDelete = function(id){
        setLoading(true)
        console.log(id)

        apiClient.delete('/api/dealers/' + id, config)
        .then(response => {
            fetchData()
            setLoading(false)
        }).catch(error=>{
            console.log(error.response)
        })
    }

    const [createFormOpen, setCreateFormOpen] = React.useState(false)

    const onCreateFormClose = () => {
        setErrors([])
    }

    const doCreateFormClose = () => {
        setCreateFormOpen(false)
        onCreateFormClose()
    }

    const doCreateFormOpen = () => {
        setCreateFormOpen(true)
    }

    const [updateFormOpen, setUpdateFormOpen] = React.useState(false)
    const [updateFormData, setUpdateFormData] = React.useState({})

    const onUpdateFormClose = () => {
        setErrors([])
    }

    const doUpdateFormClose = () => {
        setUpdateFormOpen(false)
        onUpdateFormClose()
    }

    const doUpdateFormOpen = () => {
        setUpdateFormOpen(true)
    }

    const doOpenForm = (item) => {
        setUpdateFormData(item)
        setUpdateFormOpen(true)
    }

    return (
        <>
            <DealerView dataset={{head: head, body: data}} deleteCallback={doDelete} openFormCallback={doOpenForm} />

            {
                loading && <Progress size="sm" isIndeterminate />
            }
        </>
    )
}

export default DealerManager
