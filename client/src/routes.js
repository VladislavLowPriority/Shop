import Admin from './pages/Admin'
import Auth from './pages/Auth'
import Basket from './pages/Basket'
import Device from './pages/DevicePage'
import Shop from './pages/Shop'
import {
	ADMIN_ROUTE,
	BASKET_ROUTE,
	DEVICE_ROUTE,
	LOGIN_ROUTE,
	REGISTRATION_ROUTE,
	SHOP_ROUTE,
} from './utils/consts'

export const authRoutes = [
	{
		path: ADMIN_ROUTE,
		Component: Admin,
	},
	{
		path: BASKET_ROUTE,
		Component: Basket,
	},
]

export const publicRoutes = [
	{
		path: '/',
		Component: Shop,
	},
	{
		path: SHOP_ROUTE,
		Component: Shop,
	},
	{
		path: DEVICE_ROUTE + '/:id',
		Component: Device,
	},
	{
		path: LOGIN_ROUTE,
		Component: Auth,
	},
	{
		path: REGISTRATION_ROUTE,
		Component: Auth,
	},
]
