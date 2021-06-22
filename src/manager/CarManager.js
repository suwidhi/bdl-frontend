import { Box, Button, Progress } from '@chakra-ui/react'
import React from 'react'
import CarView from '../dataview/CarView'
import CreateForm from '../components/CreateForm'

import apiClient from '../services/api';
import UpdateForm from '../components/UpdateForm'
import CarForm from '../formdialog/CarForm';
import CarUpdateForm from '../formdialog/CarUpdateForm';
import { Context } from '../Store'

function BrandManager() {
    const [state, dispatch] = React.useContext(Context)
    
    const head = ['Vin', 'Brand', 'Type', 'Option', 'Price']
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
        apiClient.get('/api/cars', config)
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
        apiClient.post('/api/cars', entries, config)
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
        apiClient.patch('/api/cars/' + entries.vin, entries, config)
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

        apiClient.delete('/api/cars/' + id, config)
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
            <CarView dataset={{head: head, body: data}} deleteCallback={doDelete} openFormCallback={doOpenForm} />

            <UpdateForm form={<CarUpdateForm error={errors} data={updateFormData} />}
                callback={doUpdate}
                isOpen={updateFormOpen} 
                onClose={onUpdateFormClose} 
                doClose={doUpdateFormClose}
                doOpen={doUpdateFormOpen}
            />

            <CreateForm form={<CarForm error={errors} data="" />} 
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

export default BrandManager
