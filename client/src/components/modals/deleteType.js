import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'
import { deleteType, fetchTypes } from '../../http/deviceAPI'

const DeleteType = ({ show, onHide }) => {
	const [types, setTypes] = useState([])
	const [selectedType, setSelectedType] = useState('')
	const [search, setSearch] = useState('')

	useEffect(() => {
		fetchTypes().then(data => setTypes(data))
	}, [])

	const handleDelete = () => {
		deleteType(selectedType).then(data => {
			setSelectedType('')
			fetchTypes().then(data => setTypes(data))
		})
	}
	const filteredTypes = types.filter(type =>
		type.name.toLowerCase().includes(search.toLowerCase())
	)

	return (
		<Modal show={show} onHide={onHide} centered>
			<Modal.Header closeButton>
				<Modal.Title id='contained-modal-title-vcenter'>
					Удалить тип
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Group className='mb-3'>
						<Form.Label>Выберите тип</Form.Label>
						<Form.Control
							as='select'
							value={selectedType}
							onChange={e => setSelectedType(e.target.value)}
						>
							<option value=''>Выберите тип</option>
							{filteredTypes.map(type => (
								<option key={type.id} value={type.id}>
									{type.name}
								</option>
							))}
						</Form.Control>
					</Form.Group>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant='outline-danger' onClick={onHide}>
					Закрыть
				</Button>
				<Button
					variant='outline-success'
					onClick={handleDelete}
					disabled={!selectedType}
				>
					Удалить
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default DeleteType
