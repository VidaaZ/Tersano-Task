import React, { useState } from 'react';
import styled from 'styled-components';

// Styled components
const SignupContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	max-width: 400px;
	margin: 20px auto;
	padding: 20px;
	border: 1px solid #ccc;
	border-radius: 8px;
	box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

const StyledInput = styled.input`
	padding: 10px;
	margin-bottom: 15px;
	border-radius: 4px;
	border: 1px solid #ccc;
`;

const StyledButton = styled.button`
	padding: 10px;
	color: white;
	background-color: #007bff;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	&:hover {
		background-color: #0056b3;
	}
`;

const SignupTitle = styled.h2`
	text-align: center;
	color: #333;
`;
const Signup: React.FC = () => {
	const [username, setUsername] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	const handleSignup = async () => {
		await fetch(`${process.env.REACT_APP_BASE_API}/auth/signup`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username, password }),
		});
	};

	return (
		<SignupContainer>
			<SignupTitle>Signup</SignupTitle>
			<StyledInput
				type='text'
				value={username}
				onChange={(e) => setUsername(e.target.value)}
				placeholder='Username'
			/>
			<StyledInput
				type='password'
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				placeholder='Password'
			/>
			<StyledButton onClick={handleSignup}>Sign Up</StyledButton>
		</SignupContainer>
	);
};

export default Signup;
