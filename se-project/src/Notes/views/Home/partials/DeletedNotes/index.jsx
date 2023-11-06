import React from 'react'
import NotesList from '../../components/NotesList'

const AllNotes = (props) => {
	return (
		<div>
			<div style={{ fontSize: 24, marginLeft: 28, marginBottom: 24 }}>Recently Deleted Notes</div>
			<div>
				<NotesList />
			</div>
		</div>
	)
}

export default AllNotes
