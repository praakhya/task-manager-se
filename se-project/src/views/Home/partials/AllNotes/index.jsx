import React, { useState, useRef } from 'react'
import NotesList from '../../components/NotesList'
import Button from 'react-bootstrap/esm/Button'
import ManageNote from './../../components/ManageNote'

const AllNotes = (props) => {
	const [isShowAddNote, setShowAddNote] = useState(false)

	const childRef = useRef()

	const handleAddNote = () => {
		setShowAddNote(true)
	}

	return (
		<div className="allNotesDiv">
			<div className="allNotesTitleDiv">
				<div>All Notes</div>
				<div>
					<Button onClick={handleAddNote} style={{ backgroundColor: 'var(--dark-green)', borderColor: 'var(--dark-green)', width: 180 }}>
						&nbsp;&nbsp;&nbsp;Add New Note&nbsp;&nbsp;&nbsp;
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
