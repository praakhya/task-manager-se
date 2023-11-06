import React, { useState } from 'react'
import NotesList from '../../components/NotesList'
import Button from 'react-bootstrap/esm/Button'
import ManageNote from './../../components/ManageNote'

const AllNotes = (props) => {
	const [isShowAddNote, setShowAddNote] = useState(false)

	const handleAddNote = () => {
		setShowAddNote(true)
	}

	return (
		<div>
			<div style={{ display: 'flex', marginBottom: 24 }}>
				<div style={{ flex: 1, fontSize: 24, marginLeft: 28, marginTop: 12 }}>All Notes</div>
				<div>
					<Button onClick={handleAddNote} style={{ backgroundColor: '#fd5d5b', borderColor: '#fd5d5b', width: 180, marginTop: 16 }}>
						&nbsp;&nbsp;&nbsp;Add New Note&nbsp;&nbsp;&nbsp;
					</Button>
				</div>
			</div>

			<div>
				<NotesList handleCreateNote={handleAddNote} />
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
