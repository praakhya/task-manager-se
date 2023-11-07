import React, { useContext, useEffect, forwardRef, useRef, useImperativeHandle } from 'react'
import { useState } from 'react'
import Spinner from './../../../../components/spinner'
import Button from 'react-bootstrap/esm/Button'
import Card from 'react-bootstrap/Card'
import axios from 'axios'
import { MdOutlineModeEditOutline, MdFavoriteBorder, MdDeleteOutline } from 'react-icons/md'
import AppContext from '../../../../contexts/AppContext'

import ManageNote from '../ManageNote'
import DeleteNoteModal from '../DeleteNote'
const baseUrl = "/api"
const NotesList = (props, ref) => {
	const [isLoading, setIsLoading] = useState(true)
	const [notesList, setNotesList] = useState([])
	const { userInfo } = useContext(AppContext)
	const [currentNote, setCurrentNote] = useState(null)
	const [isShowAddNote, setShowAddNote] = useState(false)
	const [isShowDeleteModal, setShowDeleteModal] = useState(false)

	const headers = {
		Authorization: 'accessToken=' + userInfo.accessToken + ';username=' + userInfo.username
	}

	useEffect(() => {
		console.log("In useEffect body of noteslist")
		getNotesList()
	}, [])

	const getNotesList = () => {
		axios
			.get(baseUrl+'/load/notes', { headers: headers })
			.then((res) => {
				console.log("Response in getnoteslist:",res)
				if (res && res.data && res.data.notes) {
					setNotesList(res.data.notes)
				} else {
					setNotesList([])
				}

				setIsLoading(false)
			})
			.catch((error) => {
				console.log("/load/notes:",error)
				setNotesList([])
				setIsLoading(false)
			})
	}

	useImperativeHandle(ref, () => ({
		getNotesList: getNotesList
	}))

	const handleEditNote = (note) => {
		console.log('Edit Note Invoked', note)
		setCurrentNote(note)
		setShowAddNote(true)
	}

	const handleMarkFavourite = (note) => {
		console.log('Mark as Favourite Note Invoked', note)

		const headers = {
			Authorization: 'accessToken=' + userInfo.accessToken + ';username=' + userInfo.username
		}

		axios
			.post(
				baseUrl+'/load/note/favourite',
				{
					noteId: note._id,
					isFavourite: !note.isFavourite
				},
				{ headers: headers }
			)
			.then((res) => {
				if (res && res.data && res.data.status == 'success') {
					getNotesList()
				}
			})
			.catch((error) => {
				console.log("error /load/note/favourite:",error)
				setNotesList([])
				setIsLoading(false)
			})
	}

	const handleDelete = (note) => {
		console.log('Delete Note Invoked', note)
		setCurrentNote(note)
		setShowDeleteModal(true)
	}

	const handleDeleteNote = (note) => {
		const headers = {
			Authorization: 'accessToken=' + userInfo.accessToken + ';username=' + userInfo.username
		}

		axios
			.delete(baseUrl+'/load/note/' + note._id, { headers: headers })
			.then((res) => {
				if (res && res.data && res.data.status == 'success') {
					getNotesList()
				}
			})
			.catch((error) => {
				console.log("error /load/note/:",error)
				setNotesList([])
				setIsLoading(false)
			})
	}

	return (
		<div className='home-view' style={{ minHeight: 400 }}>
			{isLoading ? (
				<Spinner size={'md'} />
			) : (
				<div>
					{notesList.length ? (
						<ul className='row'>
							{notesList.map((note) => {
								let date = new Date(note.createdAt)
								let formattedDate = new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium' }).format(date)

								return (
									<li key={note._id} className={'col-md-4'} style={{ listStyle: 'none', marginTop: 24 }}>
										<Card>
											<Card.Body>
												<Card.Title>{note.title}</Card.Title>
												<Card.Text>{note.description}</Card.Text>
												<Card.Text>
													<span style={{ display: 'flex' }}>
														<span style={{ flex: 1, color: 'rgb(123, 123, 123)' }}>{formattedDate}</span>
														<span style={{ flex: 2, textAlign: 'right' }}>
															<span>
																<MdFavoriteBorder
																	size={20}
																	style={{ cursor: 'pointer', color: note.isFavourite ? 'red' : 'black' }}
																	onClick={() => {
																		handleMarkFavourite(note)
																	}}
																/>
															</span>
															<span style={{ marginLeft: 8 }}>
																<MdOutlineModeEditOutline
																	size={20}
																	style={{ cursor: 'pointer' }}
																	onClick={() => {
																		handleEditNote(note)
																	}}
																/>
															</span>
															<span style={{ marginLeft: 8 }}>
																<MdDeleteOutline
																	size={20}
																	style={{ cursor: 'pointer' }}
																	onClick={() => {
																		handleDelete(note)
																	}}
																/>
															</span>
														</span>
													</span>
												</Card.Text>
											</Card.Body>
										</Card>
									</li>
								)
							})}
						</ul>
					) : (
						<div style={{ textAlign: 'center', paddingTop: 120 }}>
							<div>
								You don't have any notes!{' '}
								<span onClick={props.handleCreateNote} style={{ color: 'var(--dark-green)', cursor: 'pointer' }}>
									Add New Note
								</span>
							</div>
							{/* <Button style={{ backgroundColor: '#fd5d5b', borderColor: '#fd5d5b', width: 180, marginTop: 16 }}>&nbsp;&nbsp;&nbsp;Add New Note&nbsp;&nbsp;&nbsp;</Button> */}
						</div>
					)}
				</div>
			)}

			{isShowAddNote && (
				<ManageNote
					mode={'edit'}
					note={currentNote}
					handleClose={() => {
						setShowAddNote(false)
					}}
					onManageNoteSuccess={() => {
						getNotesList()
						setShowAddNote(false)
					}}
				/>
			)}

			{isShowDeleteModal && (
				<DeleteNoteModal
					handleClose={() => {
						setShowDeleteModal(false)
					}}
					handleDelete={() => {
						handleDeleteNote(currentNote)
						setShowDeleteModal(false)
					}}
				/>
			)}
		</div>
	)
}

export default forwardRef(NotesList)
