import styled from "styled-components";

export const TodoBtn = styled.button`
	margin: 2px;
	outline: none;
	padding: 0.75em;
	border: 1px solid pink;
	border-radius: 5px;
	background: none;
	cursor: pointer;
	&:hover {
		border-color: green;
	}
	&:active {
		background: #ccc;
	}
`;

export const InputTodo = styled.input`
	padding: 0.75em;
	border-radius: 5px;
	outline: none;
`;
