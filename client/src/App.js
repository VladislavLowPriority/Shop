import 'bootstrap/dist/css/bootstrap.min.css'
import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './components/AppRouter'
import NavBar from './components/NavBar'
import { check } from './http/userAPI'
import { Context } from './index'
import './style/AppSpinner.scss'
const App = observer(() => {
	const { user } = useContext(Context)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		check()
			.then(data => {
				user.setUser(true)
				user.setIsAuth(true)
			})
			.catch(() => {
				user.setUser({})
				user.setIsAuth(false)
			})
			.finally(() => setLoading(false))
	}, [])

	if (loading) {
		return (
			<div className='spinner'>
				<div className='blob top'></div>
				<div className='blob bottom'></div>
				<div className='blob left'></div>

				<div className='blob move-blob'></div>
			</div>
		)
		/*return <Spinner className='App-spinner_load' animation={'grow'} />*/
	}
	return (
		<BrowserRouter>
			<NavBar />
			<AppRouter />
		</BrowserRouter>
	)
})

export default App
