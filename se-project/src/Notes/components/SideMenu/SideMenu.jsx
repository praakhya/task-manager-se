import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { MdFavoriteBorder } from 'react-icons/md'
import { BsTrash3 } from 'react-icons/bs'
import { GrNotes } from 'react-icons/gr'
import './SideMenu.css'
const SideMenu = () => {
	const menuOptions = [
		{
			key: 'all-notes',
			label: 'All Notes',
			path: '/notes',
			icon: GrNotes
		},
		{
			key: 'fav-notes',
			label: 'Favourite Notes',
			path: '/notes/fav',
			icon: MdFavoriteBorder
		}
		// {
		// 	key: 'deleted-notes',
		// 	label: 'Deleted Notes',
		// 	path: '/notes/deleted',
		// 	icon: BsTrash3
		// }
	]

	return (
		<ul>
			{menuOptions.map((menuItem) => {
				let Icon = menuItem.icon
				return (
					<li className={'side-menu-item'} key={menuItem.key}>
						<NavLink to={menuItem.path} style={{ textDecoration: 'none', color: '#1a1a1a', fontSize: 18 }}>
							<Icon />
							<span style={{ marginLeft: 6 }}>{menuItem.label}</span>
						</NavLink>
					</li>
				)
			})}
		</ul>
	)
}

export default SideMenu
