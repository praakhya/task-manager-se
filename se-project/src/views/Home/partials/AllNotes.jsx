import React, { useState, useRef } from 'react'
import NotesList from '../components/NotesList'
import Button from 'react-bootstrap/esm/Button'
import ManageNote from '../components/ManageNote'
import "../Notes.css"
const AllNotes = (props) => {
	const [isShowAddNote, setShowAddNote] = useState(false)

	const childRef = useRef()

	const handleAddNote = () => {
		setShowAddNote(true)
	}

	return (
		<div>
			<div className='allNotesHeader'>
				<h1>All Notes</h1>
				<div>
					<Button onClick={handleAddNote} 
					style={{ backgroundColor: 'var(--dark-green)', borderColor: 'var(--dark-green)'}}
					className='addNoteButton'>
						Add New Note
					</Button>
				</div>
			</div>

			<div>
				<NotesList handleCreateNote={handleAddNote} ref={childRef} />
			</div>
			{isShowAddNote && (
				<ManageNote
					handleClose={() => {
						setShowAddNote(false)
					}}
					onManageNoteSuccess={(note) => {
						childRef.current.getNotesList()
						setShowAddNote(false)
					}}
				/>
			)}
		</div>
	)
}

export default AllNotes
