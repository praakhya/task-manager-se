import React, { useState } from 'react'
import NotesList from './NoteList'
import Button from 'react-bootstrap/esm/Button'
import ManageNote from './ManageNote'
import "./Notes.css"
const AllNotes = (props) => {
	const [isShowAddNote, setShowAddNote] = useState(false)

	const handleAddNote = () => {
		setShowAddNote(true)
	}

	return (
		<div className="allNotesContainer">
			<div className='allNotesHeader'>
				<h1>Favourite Notes</h1>
				<div>
					<Button onClick={handleAddNote} 
					style={{ backgroundColor: 'var(--dark-green)', borderColor: 'var(--dark-green)'}}
					className='addNoteButton'>
						Add New Note
					</Button>
				</div>
			</div>

			<div>
				<NotesList handleCreateNote={handleAddNote} favourites={true}/>
			</div>
			{isShowAddNote && (
				<ManageNote
					handleClose={() => {
						setShowAddNote(false)
					}}
				/>
			)}
		</div>
	)
}

export default AllNotes
