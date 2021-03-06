import { Meteor } from 'meteor/meteor'
import React from 'react'
import { useLocation, Link } from 'react-router-dom'

import { C } from '/imports/startup/client/clientConstants.js'

// ---

export const Footer = () => {
	const handleLogout = e => {
		e.preventDefault()

		Meteor.logout()
	}

	// everwhere except when we're on the start page (which is the deck overview)
	const showDeckOverviewButton = useLocation().pathname !== '/'

	return (
		<>
			<hr style={C.styles.hr} />

			<div style={{ display: 'flex', justifyContent: 'center', paddingBottom: '1.5rem' }}>
				<button style={C.styles.regularButton} onClick={handleLogout}>
					{/* lock icon */}
					&#128274; Log out
				</button>
				{/* if not home, show a link back to it */}
				{showDeckOverviewButton && (
					<Link to='/'>
						{/* home icon */}
						<button style={C.styles.regularButton}>&#127968; Deck overview</button>
					</Link>
				)}
			</div>
		</>
	)
}
