import React, { useContext, useEffect, forwardRef, useRef, useImperativeHandle } from 'react'
import { useState } from 'react'
import Spinner from '../spinner'
import Button from 'react-bootstrap/esm/Button'
import Card from 'react-bootstrap/Card'
import axios from 'axios'
import { MdOutlineModeEditOutline, MdFavoriteBorder, MdDeleteOutline } from 'react-icons/md'
import AppContext from '../../contexts/AppContext'
import "./Notes.css"

import ManageNote from './ManageNote'
import DeleteNoteModal from './DeleteNote'
const baseUrl = "/api"
const defaultNotesList = [{
	"title": "sacqw",
	"description": "cwqcce",
	"isFavourite": false,
	"username": "userOne",
	"createdAt": "2023-11-07T08:51:58.488Z",
	"updatedAt": "2023-11-07T08:51:58.488Z"
},
{
	"title": "sacqw",
	"description": "cwqcce",
	"isFavourite": false,
	"username": "userOne",
	"createdAt": "2023-11-07T08:52:13.138Z",
	"updatedAt": "2023-11-07T08:52:13.138Z"
}]
const NotesList = (props, ref) => {
	const [isLoading, setIsLoading] = useState(true)
	const [notesList, setNotesList] = useState([])
	const appContext = useContext(AppContext)
	var storedUserInfo = JSON.parse(sessionStorage.getItem("userInfo"))
	console.log("Stored user info:", storedUserInfo, typeof (storedUserInfo))
	if (!appContext.userInfo) {
		appContext.setUserInfo(storedUserInfo)

	}
	const [currentNote, setCurrentNote] = useState(null)
	const [isShowAddNote, setShowAddNote] = useState(false)
	const [isShowDeleteModal, setShowDeleteModal] = useState(false)
	var headers = {}
	if (appContext.userInfo) {
		headers = {
			Authorization: 'accessToken=' + appContext.userInfo.accessToken + ';username=' + appContext.userInfo.username
		}
	}
	else {
		headers = {
			Authorization: 'accessToken=;username='
		}
	}


	useEffect(() => {
		console.log("In useEffect body of noteslist")
		getNotesList()
	}, [isLoading])

	const getNotesList = () => {
		console.log("headers:", headers)
		axios
			.get(baseUrl + '/load/notes', { headers: headers })
			.then((res) => {
				console.log("Response in getnoteslist:", res)
				if (res && res.data && res.data.notes) {
					setNotesList(res.data.notes)
				} else {
					setNotesList(defaultNotesList)
				}

				setIsLoading(false)
			})
			.catch((error) => {
				console.log("/load/notes:", error)
				setNotesList(defaultNotesList)
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
			Authorization: 'accessToken=' + appContext.userInfo.accessToken + ';username=' + appContext.userInfo.username
		}

		axios
			.post(
				baseUrl + '/load/note/favourite',
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
				console.log("error /load/note/favourite:", error)
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
			Authorization: 'accessToken=' + appContext.userInfo.accessToken + ';username=' + appContext.userInfo.username
		}

		axios
			.delete(baseUrl + '/load/note/' + note._id, { headers: headers })
			.then((res) => {
				if (res && res.data && res.data.status == 'success') {
					getNotesList()
				}
			})
			.catch((error) => {
				console.log("error /load/note/:", error)
				setNotesList([])
				setIsLoading(false)
			})
	}

	return (
		<div>
			{isLoading ? (
				<Spinner size={'md'} />
			) :
				(notesList.length ? (
					<div className='noteListContainer'>
						{notesList.map((note) => {
							let date = new Date(note.createdAt)
							let formattedDate = new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium' }).format(date)

							return (
								<div key={note._id}>
									<Card style={{ width: '15em' }}>
										<Card.Body>
											<Card.Title>{note.title}</Card.Title>
											<Card.Text>{note.description}</Card.Text>
										</Card.Body>
										<Card.Footer>
												<span style={{ display: 'flex', flexDirection: "row", justifyContent:"space-between"}}>
													<span>{formattedDate}</span>
													<span>
														<span>
															<MdFavoriteBorder
																size={20}
																style={{ cursor: 'pointer', color: note.isFavourite ? 'red' : 'black' }}
																onClick={() => {
																	handleMarkFavourite(note)
																}}
															/>
														</span>
														<span>
															<MdOutlineModeEditOutline
																size={20}
																style={{ cursor: 'pointer' }}
																onClick={() => {
																	handleEditNote(note)
																}}
															/>
														</span>
														<span>
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
											</Card.Footer>
										</Card>
								</div>
							)
							})}
						</div>
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
					))}
				
				

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
