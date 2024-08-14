import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import ListGroup from 'react-bootstrap/ListGroup'
import { Context } from '../index'
import './style/TypeBar.css'
const TypeBar = observer(() => {
	const { device } = useContext(Context)
	return (
		<div>
			<ListGroup className='list-device'>
				{device.types.map(type => (
					<ListGroup.Item
						style={{ cursor: 'pointer' }}
						active={type.id === device.selectedType.id}
						onClick={() => device.setSelectedType(type)}
						key={type.id}
					>
						{type.name}
					</ListGroup.Item>
				))}
			</ListGroup>
		</div>
	)
})
export default TypeBar
