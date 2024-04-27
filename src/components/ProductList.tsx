import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

// Styled components
const Container = styled.div`
	margin: 20px;
`;

const ProductListHeader = styled.h2`
	text-align: center;
	color: #333;
`;

const ProductItem = styled.div`
	background: #f9f9f9;
	border: 1px solid #ddd;
	padding: 10px;
	margin-top: 10px;
	border-radius: 5px;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const ProductDetails = styled.span`
	font-size: 16px;
`;

const DeleteButton = styled.button`
	padding: 8px 12px;
	background-color: #ff4d4f;
	color: white;
	border: none;
	border-radius: 5px;
	cursor: pointer;
	&:hover {
		background-color: #e03e3e;
	}
`;
interface Product {
	_id: string;
	name: string;
	price: number;
	description: string;
}

interface Props {
	token: string;
}

const ProductList: React.FC<Props> = ({ token }) => {
	const [products, setProducts] = useState<Product[]>([]);

	useEffect(() => {
		fetchProducts();
	}, [token]);

	const fetchProducts = async () => {
		const response = await fetch(
			`${process.env.REACT_APP_BASE_API}/products/list`,
			{
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		const data = await response.json();
		setProducts(data);
	};

	const handleDeleteProduct = async (id: string) => {
		await fetch(`${process.env.REACT_APP_BASE_API}/products/${id}`, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		// Refresh the list after deleting
		fetchProducts();
	};

	return (
		<Container>
			<ProductListHeader>Products</ProductListHeader>
			{products.map((product) => (
				<ProductItem key={product._id}>
					<ProductDetails>
						{product.name} - ${product.price} - {product.description}
					</ProductDetails>
					<DeleteButton onClick={() => handleDeleteProduct(product._id)}>
						Delete
					</DeleteButton>
				</ProductItem>
			))}
		</Container>
	);
};

export default ProductList;
