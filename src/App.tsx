import React, { useState } from 'react';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Link,
	Navigate,
} from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';
import styled from 'styled-components';

// Styled component for the navigation bar
const NavBar = styled.nav`
	background: #f8f9fa;
	padding: 10px 20px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

// Styled component for individual links
const StyledLink = styled(Link)`
	color: #007bff;
	text-decoration: none;
	margin-right: 10px;

	&:hover {
		text-decoration: underline;
	}

	&:last-child {
		margin-right: 0;
	}
`;
function App() {
	const [token, setToken] = useState<string | null>(null);

	// Function to save token in local storage for persistent login
	const saveToken = (userToken: string) => {
		localStorage.setItem('token', userToken);
		setToken(userToken);
	};

	return (
		<Router>
			<div>
				<nav>
					<NavBar>
						<StyledLink to='/'>Home</StyledLink>&nbsp;
						<StyledLink to='/login'>Login</StyledLink>&nbsp;
						<StyledLink to='/signup'>Signup</StyledLink>&nbsp;
						<StyledLink to='/products'>Products</StyledLink>&nbsp;
						<StyledLink to='/add-product'>Add Product</StyledLink>
					</NavBar>
				</nav>
				<Routes>
					<Route
						path='/'
						element={
							token ? (
								<ProductList token={token} />
							) : (
								<Navigate replace to='/login' />
							)
						}
					/>
					<Route path='/login' element={<Login setToken={saveToken} />} />
					<Route path='/signup' element={<Signup />} />
					<Route
						path='/products'
						element={
							token ? (
								<ProductList token={token} />
							) : (
								<Navigate replace to='/login' />
							)
						}
					/>
					<Route
						path='/add-product'
						element={
							token ? (
								<AddProduct token={token} />
							) : (
								<Navigate replace to='/login' />
							)
						}
					/>
				</Routes>
			</div>
		</Router>
	);
}

export default App;
