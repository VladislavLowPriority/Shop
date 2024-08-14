import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'
import { deleteDevice, fetchDevices } from '../../http/deviceAPI'

const DeleteDevice = ({ show, onHide }) => {
	const [devices, setDevices] = useState({})
	const [selectedDevice, setSelectedDevice] = useState('')
	const [search, setSearch] = useState('')

	useEffect(() => {
		fetchDevices()
			.then(data => {
				if (typeof data === 'object' && !Array.isArray(data)) {
					setDevices(data)
				} else {
					console.error('Received data is not in expected format:', data)
				}
			})
			.catch(error => {
				console.error('Error fetching devices:', error)
			})
	}, [])

	const handleDelete = () => {
		deleteDevice(selectedDevice).then(data => {
			setSelectedDevice('')
			fetchDevices().then(data => {
				if (typeof data === 'object' && !Array.isArray(data)) {
					setDevices(data)
				} else {
					console.error('Received data is not in expected format:', data)
				}
			})
		})
	}

	// Фильтрация и отображение устройств
	const filteredDevices = Object.values(devices).filter(
		device =>
			device.name && device.name.toLowerCase().includes(search.toLowerCase())
	)

	return (
		<Modal show={show} onHide={onHide} centered>
			<Modal.Header closeButton>
				<Modal.Title id='contained-modal-title-vcenter'>
					Удалить товар
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Group className='mb-3'>
						<Form.Label>Выберите товар</Form.Label>
						<Form.Control
							as='select'
							value={selectedDevice}
							onChange={e => setSelectedDevice(e.target.value)}
						>
							<option value=''>Выберите товар</option>
							{Object.values(devices).map(device => (
								<option key={device.id} value={device.id}>
									{device.name}
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
					disabled={!selectedDevice}
				>
					Удалить
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default DeleteDevice
