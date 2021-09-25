import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import { CardCollection } from '/imports/api/collections/cardCollection.js'
import { C } from '/imports/startup/client/clientConstants.js'

// ------------

export const DeckRow = ({ deck }) => {
	const cardCount = CardCollection.find({
		deckId: deck._id,
		dueDate: { $lte: new Date() },
	}).count()
	const hasCardsToLearn = !!cardCount

	return (
		<div style={{ display: 'flex', margin: '1.5rem 0' }}>
			<div style={{ display: 'flex', flex: 1, alignItems: 'center', marginRight: '1rem' }}>
				<span style={hasCardsToLearn ? deckHighlighted : deckNotHighlighted}>
					{deck.title} ({cardCount})
				</span>
			</div>
			<div>
				{/* tools icon*/}
				<Link to={`/edit-deck/${deck._id}`}>
					<button style={C.styles.roundButton}>&#128736;</button>
				</Link>
				{/* rocket icon*/}
				<Link to={`/deck/${deck._id}`}>
					<button style={C.styles.roundButton}>&#128640;</button>
				</Link>
			</div>
		</div>
	)
}

const deckHighlighted = {
	fontWeight: 200,
}
const deckNotHighlighted = {
	fontWeight: 100,
	color: 'grey',
}