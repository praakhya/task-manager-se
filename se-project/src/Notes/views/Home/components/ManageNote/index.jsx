import React, { useState, useEffect } from 'react'
import { useContext } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import AppContext from '../../../../contexts/AppContext'
import axios from 'axios'
const baseUrl="/api"
const ManageNote = (props) => {
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [error, setError] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')
	const { userInfo } = useContext(AppContext)

	useEffect(() => {
		if (props.mode == 'edit') {
			setTitle(props.note.title)
			setDescription(props.note.description)
		}
	}, [])

	const handleManageNote = (e) => {
		if (!title || !description) {
			setErrorMessage('Fill all fields!')
			setError(true)
			return
		}

		const headers = {
			Authorization: 'accessToken=' + userInfo.accessToken + ';username=' + userInfo.username
		}

		let _data = {
			title: title,
			description: description
		}

		if (props.mode == 'edit') {
			_data.noteId = props.note._id
			axios
				.put(baseUrl+'/load/note', _data, { headers: headers })
				.then((response) => {
					handleRequestResponse(response)
				})
				.catch((error) => {
					console.log("error in notes put:",error)
					setErrorMessage('Error in Saving data!')
					setError(true)
				})
		} else {
			axios
				.post(baseUrl+'/load/note', _data, { headers: headers })
				.then((response) => {
					handleRequestResponse(response)
				})
				.catch((error) => {
					console.log("error in /load/note:",error)
					setErrorMessage('Error in Saving data!')
					setError(true)
				})
		}
	}

	const handleRequestResponse = (response) => {
		if (response && response.data) {
			if (response.data.status == 'error') {
				console.log(error)
				setErrorMessage('Error in Saving data!')
				setError(true)
				return
			}
			props.onManageNoteSuccess()
			setError(false)
		}
	}

	return (
		<div>
			<Modal show={true} onHide={props.handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Add Note</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div>
						{error && <label style={{ color: 'red' }}>{errorMessage}</label>}
						<Form>
							<Form.Group className='mb-3'>
								<Form.Label>Title</Form.Label>
								<Form.Control
									type='text'
									placeholder='Enter title'
									value={title ? title : ''}
									onChange={(e) => {
										setTitle(e.target.value)
									}}
								/>
							</Form.Group>

							<Form.Group className='mb-3'>
								<Form.Label>Description</Form.Label>
								<Form.Control
									as='textarea'
									placeholder='Enter description'
									value={description ? description : ''}
									maxLength={500}
									rows={6}
									onChange={(e) => {
										setDescription(e.target.value)
									}}
								/>
							</Form.Group>
						</Form>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={props.handleClose}>
						Close
					</Button>
					<Button variant='primary' onClick={handleManageNote} style={{ backgroundColor: 'var(--dark-green)', borderColor: 'var(--dark-green)', width: "40%" }}>
						{props.mode == 'edit' ? 'Update' : 'Add'}
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	)
}

export default ManageNote
