import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'
import { deleteBrand, fetchBrands } from '../../http/deviceAPI'

const DeleteBrand = ({ show, onHide }) => {
	const [brands, setBrands] = useState([])
	const [selectedBrand, setSelectedBrand] = useState('')
	const [search, setSearch] = useState('')

	useEffect(() => {
		fetchBrands().then(data => setBrands(data))
	}, [])

	const handleDelete = () => {
		deleteBrand(selectedBrand).then(data => {
			setSelectedBrand('')
			fetchBrands().then(data => setBrands(data))
		})
	}
	const filteredBrands = brands.filter(brand =>
		brand.name.toLowerCase().includes(search.toLowerCase())
	)

	return (
		<Modal show={show} onHide={onHide} centered>
			<Modal.Header closeButton>
				<Modal.Title id='contained-modal-title-vcenter'>
					Удалить бренд
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Group className='mb-3'>
						<Form.Label>Выберите бренд</Form.Label>
						<Form.Control
							as='select'
							value={selectedBrand}
							onChange={e => setSelectedBrand(e.target.value)}
						>
							<option value=''>Выберите бренд</option>
							{filteredBrands.map(brand => (
								<option key={brand.id} value={brand.id}>
									{brand.name}
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
					disabled={!selectedBrand}
				>
					Удалить
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default DeleteBrand
