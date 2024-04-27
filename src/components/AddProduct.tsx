import React, { useState } from 'react';
import styled from 'styled-components';

// Styled components
const FormContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	max-width: 500px;
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

const StyledTextArea = styled.textarea`
	padding: 10px;
	margin-bottom: 15px;
	border-radius: 4px;
	border: 1px solid #ccc;
	height: 100px;
	resize: none; /* Prevents resizing the textarea */
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

const Title = styled.h2`
	text-align: center;
	color: #333;
`;
interface Props {
	token: string;
}

const AddProduct: React.FC<Props> = ({ token }) => {
	const [name, setName] = useState<string>('');
	const [price, setPrice] = useState<number>(0);
	const [description, setDescription] = useState<string>('');

	const handleAddProduct = async () => {
		await fetch(`${process.env.REACT_APP_BASE_API}/products`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ name, price, description }),
		});
		// Optionally reset form or give feedback
		setName('');
		setPrice(0);
		setDescription('');
		alert('Product added successfully!');
	};

	return (
		<FormContainer>
			<Title>Add Product</Title>
			<StyledInput
				type='text'
				value={name}
				onChange={(e) => setName(e.target.value)}
				placeholder='Name'
			/>
			<StyledInput
				type='number'
				value={price}
				onChange={(e) => setPrice(parseFloat(e.target.value))}
				placeholder='Price'
			/>
			<StyledTextArea
				value={description}
				onChange={(e) => setDescription(e.target.value)}
				placeholder='Description'
			/>
			<StyledButton onClick={handleAddProduct}>Add Product</StyledButton>
		</FormContainer>
	);
};

export default AddProduct;
