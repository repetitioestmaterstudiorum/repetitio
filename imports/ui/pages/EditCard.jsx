import { Meteor } from 'meteor/meteor'
import React, { useEffect, useContext } from 'react'
import Swal from 'sweetalert2/src/sweetalert2.js'
import { useHistory } from 'react-router-dom'

import { C } from '/imports/startup/client/clientConstants.js'
import { Loader } from '/imports/ui/components/Loader.jsx'
import { Context } from '/imports/ui/DataState.jsx'

// ------------

export const EditCard = ({ match }) => {
	const { cardInEditMode, setCardIdInEditMode } = useContext(Context)

	const {
		params: { cardId },
	} = match

	const history = useHistory()

	useEffect(() => {
		setCardIdInEditMode(cardId)
	}, [cardId])

	const handleDeleteCardClick = () => {
		Swal.fire({
			title: `Want to delete this card?`,
			html: `front: ${card.front} <br /><br />
			back: ${card.back}`,
			icon: 'warning',
			confirmButtonText: 'Yeees',
			cancelButtonText: 'No!',
			showCancelButton: true,
		}).then(result => {
			const cardName = `front: ${card.front}, back: ${card.back}`
			if (result.isConfirmed) {
				Meteor.call('deleteCard', card._id, err => {
					if (err) {
						console.error(`Error deleting card ${card._id}`, err)
						Swal.fire('Error!', `The card "${cardName}" could not be deleted`, 'error')
					} else {
						searchAgain()
						Swal.fire('Done!', `The card "${cardName}" has been deleted`, 'success')
					}
				})
			}
		})
	}

	return cardInEditMode?._id ? (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				flexWrap: 'wrap',
				flexDirection: 'column',
				textAlign: 'center',
			}}
		>
			<div>
				<h2>Card:</h2>
				<form style={C.styles.uiForm}>
					<textarea
						type='front'
						defaultValue={cardInEditMode.front}
						onChange={e =>
							Meteor.call(
								'updateCard',
								e.target.value,
								cardInEditMode.back,
								cardId,
								err => {
									if (err) console.error('err :>> ', err)
								}
							)
						}
						style={{ width: '95vw', maxWidth: '400px' }}
					/>
					<textarea
						type='back'
						defaultValue={cardInEditMode.back}
						onChange={e =>
							Meteor.call(
								'updateCard',
								cardInEditMode.front,
								e.target.value,
								cardId,
								err => {
									if (err) console.error('err :>> ', err)
								}
							)
						}
					/>
				</form>
				<button style={C.styles.regularButton} onClick={() => history.goBack()}>
					&#8678; Back
				</button>
			</div>
			<div>
				<hr style={C.styles.hr} />
				<p>Card settings: </p>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						flexWrap: 'wrap',
						flexDirection: 'row',
					}}
				>
					<button style={C.styles.regularButton} onClick={handleDeleteCardClick}>
						{/* bomb icon*/}
						&#128163; Delete
					</button>
				</div>
			</div>
		</div>
	) : (
		<Loader />
	)
}
