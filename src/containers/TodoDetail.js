import React from "react";
import { TodoBtn, InputTodo } from "../components/styledComponents";

const TodoDetail = ({
	workLists,
	editorStatus,
	backToListHandler,
	editWorkDetailHandler,
	toggleEditorHandler
}) => {
	return (
		<div>
			<TodoBtn onClick={backToListHandler}>Back to List</TodoBtn>
			<h1>
				{editorStatus ? (
					<InputTodo
						defaultValue={workLists.taskName}
						onBlur={toggleEditorHandler}
						innerRef={input => {
							if (input) input.focus();
						}}
						onKeyPress={e => {
							if (e.charCode === 13 && e.target.value !== "") {
								editWorkDetailHandler(workLists.workID, e.target.value);
								toggleEditorHandler();
							}
						}}
					/>
				) : (
					<span onDoubleClick={toggleEditorHandler}>
						{workLists.taskName} :
						<small> {workLists.taskStatus}</small>
					</span>
				)}
			</h1>
		</div>
	);
};

export default TodoDetail;
