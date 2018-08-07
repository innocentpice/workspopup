import React from "react";
import styled from "styled-components";

const TodoBlock = ({ taskName, taskStatus, toggleStatusHandler }) => {
	const Block = styled.div`
		& > h1 > span {
			text-decoration: ${taskStatus === "Completed" && "line-through"};
		}
		& > h1 > small {
			color: #ccc;
		}
	`;
	return (
		<Block onClick={toggleStatusHandler}>
			<h1>
				<input
					type="checkbox"
					defaultChecked={taskStatus === "Completed" ? "true" : ""}
				/>
				<span>{taskName}</span>
			</h1>
		</Block>
	);
};

export default TodoBlock;
