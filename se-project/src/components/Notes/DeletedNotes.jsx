import React from 'react'
import NotesList from './NoteList'

const AllNotes = (props) => {
	return (
		<div>
			<div>Recently Deleted Notes</div>
			<div>
				<NotesList />
			</div>
		</div>
	)
}

export default AllNotes
