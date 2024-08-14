import 'bootstrap/dist/css/bootstrap.min.css'
import { observer } from 'mobx-react-lite'
import React, { useContext, useState } from 'react'
import { Button, Container, Form, Row } from 'react-bootstrap'
import Card from 'react-bootstrap/Card'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { login, registration } from '../http/userAPI'
import { Context } from '../index'
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../utils/consts'
import './style/AuthStyle.css'

const Auth = observer(() => {
	const { user } = useContext(Context)
	const location = useLocation()
	const navigate = useNavigate()
	const isLogin = location.pathname === LOGIN_ROUTE
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const click = async () => {
		try {
			let data
			if (isLogin) {
				data = await login(email, password)
			} else {
				data = await registration(email, password)
			}
			user.setUser(user)
			user.setIsAuth(true)
			navigate(SHOP_ROUTE)
			window.location.reload()
		} catch (e) {
			alert(e.response.data.message)
		}
	}

	return (
		<Container
			className='d-flex justify-content-center align-items-center'
			style={{ height: window.innerHeight - 54 }}
		>
			<Card style={{ width: 600 }} className='p-5'>
				<h2 className='text-center mb-4'>
					{isLogin ? 'Авторизация' : 'Регистрация'}
				</h2>
				<Form className='d-flex flex-column'>
					<Form.Control
						className='mt-2'
						placeholder='Введите ваш email'
						value={email}
						onChange={e => setEmail(e.target.value)}
					/>
					<Form.Control
						type='password'
						className='mt-2'
						placeholder='Введите ваш пароль'
						value={password}
						onChange={e => setPassword(e.target.value)}
					/>

					<Row className='d-flex justify-content-between '>
						<div className='d-flex justify-content-between mt-3 pl-3 pr-3'>
							{isLogin ? (
								<div className='Nav-Button gap-2'>
									Нет аккаунта?
									<NavLink className='nav-link1' to={REGISTRATION_ROUTE}>
										<div className='Nav-link'>Регистрация</div>
									</NavLink>
								</div>
							) : (
								<div className='Nav-Button gap-2'>
									Есть аккаунт?
									<NavLink className='nav-link1' to={LOGIN_ROUTE}>
										<div className='Nav-link'>Войти</div>
									</NavLink>
								</div>
							)}
							<Button variant='outline-success' onClick={click}>
								{isLogin ? 'Войти' : 'Регистрация'}
							</Button>
						</div>
					</Row>
				</Form>
			</Card>
		</Container>
	)
})

export default Auth
