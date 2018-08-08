import React from "react";
import styled from "styled-components";

const TodoBlock = ({
	taskName,
	taskStatus,
	toggleStatusHandler,
	openDetailHandler
}) => {
	const Block = styled.div`
		cursor: zoom-in;
		& > h1 > span {
			text-decoration: ${taskStatus === "Completed" && "line-through"};
		}
		& > h1 > small {
			color: #ccc;
		}
		&:hover {
			background: #eee;
		}
	`;

	return (
		<Block onDoubleClick={openDetailHandler}>
			<h1>
				<input
					style={{ cursor: "pointer" }}
					type="checkbox"
					defaultChecked={taskStatus === "Completed" ? "true" : ""}
					onClick={toggleStatusHandler}
				/>
				<span>{taskName}</span>
			</h1>
		</Block>
	);
};

export default TodoBlock;
