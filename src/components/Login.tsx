import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';

// Styled components
const LoginForm = styled.div`
	width: 100%;
	max-width: 320px;
	margin: 50px auto;
	padding: 20px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	border-radius: 8px;
	background-color: #fff;
`;

const Title = styled.h2`
	text-align: center;
	margin-bottom: 20px;
`;

const Input = styled.input`
	width: 100%;
	padding: 10px;
	margin-bottom: 10px;
	border: 1px solid #ccc;
	border-radius: 4px;
`;

const Button = styled.button`
	width: 100%;
	padding: 10px;
	background-color: #007bff;
	color: white;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	font-size: 16px;

	&:hover {
		background-color: #0056b3;
	}
`;
interface Props {
	setToken: (token: string) => void;
}

const Login: React.FC<Props> = ({ setToken }) => {
	const [username, setUsername] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const navigate = useNavigate();
	const handleLogin = async () => {
		const response = await fetch(
			`${process.env.REACT_APP_BASE_API}/auth/login`,
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ username, password }),
			}
		);
		console.log(response);
		if (response.status === 401) {
			alert('Invalid credentials');
		} else {
			const data = await response.json();
			if ('token' in data && data.token) {
				setToken(data.token);
				navigate('/products');
			}
		}
	};

	return (
		<LoginForm>
			<Title>Login</Title>
			<Input
				type='text'
				value={username}
				onChange={(e) => setUsername(e.target.value)}
				placeholder='Username'
			/>
			<Input
				type='password'
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				placeholder='Password'
			/>
			<Button onClick={handleLogin}>Log In</Button>
		</LoginForm>
	);
};

export default Login;
