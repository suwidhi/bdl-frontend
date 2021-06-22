import { Box, Button, Progress } from '@chakra-ui/react'
import React from 'react'
import CarModelView from '../dataview/CarModelView'
import CreateForm from '../components/CreateForm'

import apiClient from '../services/api';
import UpdateForm from '../components/UpdateForm'
import CarModelForm from '../formdialog/CarModelForm';
import { Context } from '../Store'


function CarModelManager() {
    const [state, dispatch] = React.useContext(Context)
    
    const head = ['Model Name', 'Description']
    // data from database
    const [data, setData] = React.useState([]);

    // error from database
    const [errors, setErrors] = React.useState({})

    // loading ?
    const [loading, setLoading] = React.useState(true)

    React.useEffect(function(){
        fetchData()
    }, [])
    const config = {
        headers: {
            'Content-Type' : 'application/json',
            'Authorization': 'Bearer ' + state.token
        }
    }

    const fetchData = function() {
        setLoading(true)
        apiClient.get('/api/carmodels', config)
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
        apiClient.post('/api/carmodels', entries, config)
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
        apiClient.patch('/api/carmodels/' + entries.id, entries, config)
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

        apiClient.delete('/api/carmodels/' + id, config)
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
            <CarModelView dataset={{head: head, body: data}} deleteCallback={doDelete} openFormCallback={doOpenForm} />

            <UpdateForm form={<CarModelForm error={errors} data={updateFormData} />}
                callback={doUpdate}
                isOpen={updateFormOpen} 
                onClose={onUpdateFormClose} 
                doClose={doUpdateFormClose}
                doOpen={doUpdateFormOpen}
            />

            <CreateForm form={<CarModelForm error={errors} data="" />} 
                callback={doCreate}  
                isOpen={createFormOpen} 
                onClose={onCreateFormClose} 
                doClose={doCreateFormClose}
                doOpen={doCreateFormOpen}
            />

            {
                loading && <Progress size="sm" isIndeterminate />
            }
            <Box position="absolute" bottom="1rem" right="1rem" overflow="hidden">
                <Button colorScheme="blue" leftIcon={<i className="la la-plus"></i>} onClick={doCreateFormOpen} size="md" marginRight=".5rem" >Create New</Button>
            </Box>
        </>
    )
}

export default CarModelManager
