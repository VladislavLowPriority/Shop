import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { fetchOneDevice } from '../http/deviceAPI'
import './style/deviceStyle.css'
export const starRatings = [
	require('../assets/star0.svg').default,
	require('../assets/star1.svg').default,
	require('../assets/star2.svg').default,
	require('../assets/star3.svg').default,
	require('../assets/star4.svg').default,
	require('../assets/star5.svg').default,
]

const DevicePage = () => {
	const [device, setDevice] = useState({ info: [] })
	const { id } = useParams()
	useEffect(() => {
		fetchOneDevice(id).then(data => setDevice(data))
	}, [])
	const rating = Math.round(device.rating)
	return (
		<Container className='mt-3'>
			<Row>
				<Col md={4}>
					<Image
						width={300}
						height={300}
						src={
							(process.env.REACT_APP_API_URL || 'http://localhost:7500/') +
							device.img
						}
					/>
				</Col>
				<Col md={4}>
					<Row>
						<h2>{device.name}</h2>
						<div className='d-flex align-items-center justify-content-center device-rating_star'>
							Рейтинг товара: {device.rating}
						</div>
					</Row>
				</Col>
				<Col md={4}>
					<Card
						className='d-flex flex-column align-items-center justify-content-around'
						style={{
							width: 300,
							height: 300,
							fontSize: 32,
							border: '5px solid lightgray',
						}}
					>
						<h3>От: {device.price} Рублей</h3>
						<Button variant={'outline-dark'}>Добавить в корзину</Button>
					</Card>
				</Col>
			</Row>
			<Row className='d-flex flex-column m-3'>
				<h3 className='pt-4 pb-3'>Описание:</h3>
				{device.info.map((info, index) => (
					<Row
						key={info.id}
						style={{
							background: index % 2 === 0 ? 'lightgray' : 'transparent',
							padding: 10,
						}}
					>
						{info.title}: {info.description}
					</Row>
				))}
			</Row>
		</Container>
	)
}

export default DevicePage
