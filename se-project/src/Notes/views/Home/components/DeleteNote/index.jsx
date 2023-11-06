import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

const DeleteNoteModal = (props) => {
	return (
		<div>
			<Modal show={true} onHide={props.handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Add Note</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div>
						<label>Do you want to delete the note?</label>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={props.handleClose}>
						Cancel
					</Button>
					<Button variant='primary' onClick={props.handleDelete} style={{ backgroundColor: '#fd5d5b', borderColor: '#fd5d5b', width: 100 }}>
						Delete
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	)
}

export default DeleteNoteModal
