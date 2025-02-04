import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Register from './pages/Register';
import Login from './pages/Login';

import './App.css';
import { Layout } from './components/Layout';
import { routeList } from './helpers/routeList';
import { UserProvider } from './context/AuthProvider';
import PrivateRoute from './routes/PrivateRoute'; // Importar el componente PrivateRoute

const App: React.FC = () => {
	return (
		<Router>
			<UserProvider>
				<Routes>
					{/* Rutas públicas */}
					<Route path='/' element={<LandingPage />} />
					<Route path='/register' element={<Register />} />
					<Route path='/login' element={<Login />} />

					{/* Rutas privadas */}
					<Route element={<Layout />}>
						{routeList.map((route) => (
							<Route
								key={route.path}
								path={route.path}
								element={
									<PrivateRoute>
										<route.element />
									</PrivateRoute>
								}
							/>
						))}
					</Route>
				</Routes>
			</UserProvider>
		</Router>
	);
};

export default App;
