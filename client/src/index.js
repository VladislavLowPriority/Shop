import 'bootstrap/dist/css/bootstrap.min.css'
import React, { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import DeviceStore from './store/DeviceStore'
import UserStore from './store/UserStore'
export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
	<React.StrictMode>
		<Context.Provider
			value={{ user: new UserStore(), device: new DeviceStore() }}
		>
			<App />
		</Context.Provider>
	</React.StrictMode>
)
