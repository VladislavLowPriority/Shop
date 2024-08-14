import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Card, Row } from 'react-bootstrap'
import { Context } from '../index'
import './style/BrandBar.css'
const BrandBar = observer(() => {
	const { device } = useContext(Context)
	return (
		<Row>
			<div className='d-flex row_brand-list'>
				{device.brands.map(brand => (
					<Card
						style={{ cursor: 'pointer' }}
						key={brand.id}
						className={`p-2 brand-card ${
							brand.id === device.selectedBrand.id ? 'active' : ''
						}`}
						onClick={() => device.setSelectedBrand(brand)}
					>
						{brand.name}
					</Card>
				))}
			</div>
		</Row>
	)
})

export default BrandBar
