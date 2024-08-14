import React, { useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import CreateBrand from '../components/modals/createBrand'
import CreateDevice from '../components/modals/createDevice'
import CreateType from '../components/modals/createType'
import DeleteBrand from '../components/modals/deleteBrand'
import DeleteDevice from '../components/modals/deleteDevice'
import DeleteType from '../components/modals/deleteType'

const Admin = () => {
	const [brandVisible, setBrandVisible] = useState(false)
	const [typeVisible, setTypeVisible] = useState(false)
	const [deviceVisible, setDeviceVisible] = useState(false)
	const [typeDelVisible, setTypeDelVisible] = useState(false)
	const [brandDelVisible, setBrandDelVisible] = useState(false)
	const [deviceDelVisible, setDeviceDelVisible] = useState(false)
	return (
		<Container className='d-flex flex-column'>
			<Button
				variant={'outline-dark'}
				className='mt-4 p-2'
				onClick={() => setTypeVisible(true)}
			>
				Добавить тип
			</Button>
			<Button
				variant={'outline-dark'}
				className='mt-4 p-2'
				onClick={() => setBrandVisible(true)}
			>
				Добавить бренд
			</Button>
			<Button
				variant={'outline-dark'}
				className='mt-4 p-2'
				onClick={() => setDeviceVisible(true)}
			>
				Добавить Товар
			</Button>
			<Button
				variant={'outline-dark'}
				className='mt-4 p-2'
				onClick={() => setTypeDelVisible(true)}
			>
				Удалить тип
			</Button>
			<Button
				variant={'outline-dark'}
				className='mt-4 p-2'
				onClick={() => setBrandDelVisible(true)}
			>
				Удалить бренд
			</Button>
			<Button
				variant={'outline-dark'}
				className='mt-4 p-2'
				onClick={() => setDeviceDelVisible(true)}
			>
				Удалить товар
			</Button>
			<CreateType show={typeVisible} onHide={() => setTypeVisible(false)} />
			<CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)} />
			<CreateDevice
				show={deviceVisible}
				onHide={() => setDeviceVisible(false)}
			/>
			<DeleteType
				show={typeDelVisible}
				onHide={() => setTypeDelVisible(false)}
			/>
			<DeleteBrand
				show={brandDelVisible}
				onHide={() => setBrandDelVisible(false)}
			/>
			<DeleteDevice
				show={deviceDelVisible}
				onHide={() => setDeviceDelVisible(false)}
			/>
		</Container>
	)
}

export default Admin
