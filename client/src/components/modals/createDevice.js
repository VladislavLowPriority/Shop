import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'
import Select from 'react-select'
import { createDevice, fetchBrands, fetchTypes } from '../../http/deviceAPI'
import { Context } from '../../index'

const CreateDevice = observer(({ show, onHide }) => {
	const { device } = useContext(Context)
	const [name, setName] = useState('')
	const [price, setPrice] = useState(0)
	const [file, setFile] = useState(null)
	const [info, setInfo] = useState([])

	useEffect(() => {
		fetchTypes().then(data => device.setTypes(data))
		fetchBrands().then(data => device.setBrands(data))
	}, [device])

	const addInfo = () => {
		setInfo([...info, { title: '', description: '', number: Date.now() }])
	}
	const removeInfo = number => {
		setInfo(info.filter(i => i.number !== number))
	}
	const changeInfo = (key, value, number) => {
		setInfo(info.map(i => (i.number === number ? { ...i, [key]: value } : i)))
	}

	const selectFile = e => {
		setFile(e.target.files[0])
	}

	const addDevice = () => {
		const formData = new FormData()
		formData.append('name', name)
		formData.append('price', `${price}`)
		formData.append('img', file)
		formData.append('brandId', device.selectedBrand.id)
		formData.append('typeId', device.selectedType.id)
		formData.append('info', JSON.stringify(info))
		createDevice(formData).then(data => onHide())
	}
	const handleClose = () => {
		setName('')
		setPrice(0)
		setFile(null)
		setInfo([])
		device.setSelectedBrand(null)
		device.setSelectedType(null)
		onHide()
	}

	const typeOptions = device.types.map(type => ({
		value: type.id,
		label: type.name,
	}))
	const brandOptions = device.brands.map(brand => ({
		value: brand.id,
		label: brand.name,
	}))

	const handleTypeChange = selectedOption => {
		const selectedType = device.types.find(
			type => type.id === selectedOption.value
		)
		device.setSelectedType(selectedType)
	}

	const handleBrandChange = selectedOption => {
		const selectedBrand = device.brands.find(
			brand => brand.id === selectedOption.value
		)
		device.setSelectedBrand(selectedBrand)
	}

	return (
		<Modal show={show} onHide={onHide} centered>
			<Modal.Header closeButton>
				<Modal.Title id='contained-modal-title-vcenter'>
					Добавить устройство
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Group className='mt-2 mb-2'>
						<Form.Label>Тип</Form.Label>
						<Select
							value={
								device.selectedType
									? {
											value: device.selectedType.id,
											label: device.selectedType.name,
									  }
									: null
							}
							onChange={handleTypeChange}
							options={typeOptions}
							placeholder='Выберите тип'
						/>
					</Form.Group>
					<Form.Group className='mt-2 mb-2'>
						<Form.Label>Бренд</Form.Label>
						<Select
							value={
								device.selectedBrand
									? {
											value: device.selectedBrand.id,
											label: device.selectedBrand.name,
									  }
									: null
							}
							onChange={handleBrandChange}
							options={brandOptions}
							placeholder='Выберите бренд'
						/>
					</Form.Group>
					<Form.Control
						value={name}
						onChange={e => setName(e.target.value)}
						className='mt-3'
						placeholder='Введите название устройства'
					/>
					<Form.Control
						value={price}
						onChange={e => setPrice(Number(e.target.value))}
						className='mt-3'
						placeholder='Введите стоимость устройства'
						type='number'
					/>
					<Form.Control className='mt-3' type='file' onChange={selectFile} />
					<hr />
					<Button variant={'outline-dark'} onClick={addInfo}>
						Добавить новое свойство
					</Button>
					{info.map(i => (
						<Row className='mt-4' key={i.number}>
							<Col md={4}>
								<Form.Control
									value={i.title}
									onChange={e => changeInfo('title', e.target.value, i.number)}
									placeholder='Введите название свойства'
								/>
							</Col>
							<Col md={4}>
								<Form.Control
									value={i.description}
									onChange={e =>
										changeInfo('description', e.target.value, i.number)
									}
									placeholder='Введите описание свойства'
								/>
							</Col>
							<Col md={4}>
								<Button
									onClick={() => removeInfo(i.number)}
									variant={'outline-danger'}
								>
									Удалить
								</Button>
							</Col>
						</Row>
					))}
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant='outline-danger' onClick={handleClose}>
					Закрыть и очистить
				</Button>
				<Button variant='outline-success' onClick={addDevice}>
					Добавить
				</Button>
			</Modal.Footer>
		</Modal>
	)
})

export default CreateDevice
