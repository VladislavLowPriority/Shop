import { jwtDecode } from 'jwt-decode'
import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { NavLink, useNavigate } from 'react-router-dom'
import { Context } from '..'
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/consts'
import './style/NavBar.css'
const NavBar = observer(() => {
	const { user } = useContext(Context)
	const navigate = useNavigate()
	const [isAdmin, setIsAdmin] = useState(false)

	const logOut = () => {
		user.setUser({})
		user.setIsAuth(false)
		localStorage.removeItem('token')
		navigate(LOGIN_ROUTE)
	}
	useEffect(() => {
		if (user.isAuth) {
			const token = localStorage.getItem('token')
			if (token) {
				const decodedToken = jwtDecode(token)
				setIsAdmin(decodedToken.role === 'Admin')
			}
		}
	}, [user.isAuth])
	return (
		<Navbar bg='light' variant='dark'>
			<Container>
				<NavLink
					className='market_link'
					style={{ color: 'gray' }}
					to={SHOP_ROUTE}
				>
					M i l i t a r y - MARKET
				</NavLink>
				{user.isAuth ? (
					<Nav style={{ color: 'gray' }}>
						{isAdmin && (
							<Button
								variant='outline-light'
								style={{ color: 'black' }}
								onClick={() => navigate(ADMIN_ROUTE)}
							>
								Админ панель
							</Button>
						)}
						<Button
							className='nav-in-Out'
							variant={'outline-info'}
							onClick={logOut}
						>
							Выйти
						</Button>
					</Nav>
				) : (
					<Nav className='' style={{ color: 'gray' }}>
						<Button
							className='nav-in-Out'
							variant='outline-info'
							onClick={() => navigate(LOGIN_ROUTE)}
						>
							Войти
						</Button>
					</Nav>
				)}
			</Container>
		</Navbar>
	)
})

export default NavBar
