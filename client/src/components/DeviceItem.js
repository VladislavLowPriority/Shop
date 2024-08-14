import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Card, Col, Image } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { DEVICE_ROUTE } from '../utils/consts'

import { Context } from '../index'
import './style/Device.css'
export const starRatings = [
	require('../assets/star0.svg').default,
	require('../assets/star1.svg').default,
	require('../assets/star2.svg').default,
	require('../assets/star3.svg').default,
	require('../assets/star4.svg').default,
	require('../assets/star5.svg').default,
]
const DeviceItem = observer(({ device }) => {
	const { device: deviceContext } = useContext(Context)
	const navigate = useNavigate()

	const brand = deviceContext.brands.find(b => b.id === device.brandId)
	const rating = Math.round(device.rating)
	return (
		<Col md={3} onClick={() => navigate(DEVICE_ROUTE + '/' + device.id)}>
			<Card
				className='card-device'
				style={{ width: 150, cursor: 'pointer' }}
				border={'light'}
			>
				<Image
					width={150}
					height={150}
					src={
						(process.env.REACT_APP_API_URL || 'http://localhost:7500/') +
						device.img
					}
				/>
				<div className='text-black-50 mt-1 d-flex justify-content-between align-items-center'>
					<div>{brand ? brand.name : 'Unknown Brand'}</div>
					<div className='d-flex align-items-center gap-1'>
						<div>{device.rating}</div>

						<Image
							className='mt-1.5'
							width={18}
							height={18}
							src={starRatings[rating]}
							alt={`Rating: ${rating}`}
						/>
					</div>
				</div>
				<div>{device.name}</div>
			</Card>
		</Col>
	)
})
export default DeviceItem
