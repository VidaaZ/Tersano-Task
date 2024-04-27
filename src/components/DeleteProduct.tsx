import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

// Styled components
const ProductContainer = styled.div`
	margin: 20px;
	padding: 10px;
`;

const ProductItem = styled.div`
	background: #f9f9f9;
	margin: 10px 0;
	padding: 10px;
	border-radius: 8px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const ProductInfo = styled.span`
	font-size: 16px;
`;

const DeleteButton = styled.button`
	padding: 8px 16px;
	background-color: #ff4d4f;
	color: white;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	&:hover {
		background-color: #ff7875;
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
		const response = await fetch(`${process.env.REACT_APP_BASE_API}/products`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
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
		<ProductContainer>
			<h2>Products</h2>
			{products.map((product) => (
				<ProductItem key={product._id}>
					<ProductInfo>
						{product.name} - ${product.price} - {product.description}
					</ProductInfo>
					<DeleteButton onClick={() => handleDeleteProduct(product._id)}>
						Delete
					</DeleteButton>
				</ProductItem>
			))}
		</ProductContainer>
	);
};

export default ProductList;
