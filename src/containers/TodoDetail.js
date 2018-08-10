import React from "react";
import ReactMarkdown from "react-markdown";
import { TodoBtn, InputTodo } from "../components/styledComponents";
import "./TodoDetail.css";

const TodoDetail = ({
	workLists,
	editorStatus,
	backToListHandler,
	editTaskNameHandler,
	editTaskDetailHandler,
	toggleNameEditorHandler,
	toggleDetailEditorHandler
}) => {
	console.log(workLists, editorStatus);
	return (
		<div>
			<h1>
				{editorStatus.taskName ? (
					<InputTodo
						defaultValue={workLists.taskName}
						onBlur={toggleNameEditorHandler}
						innerRef={input => {
							if (input) input.focus();
						}}
						onKeyPress={e => {
							if (e.charCode === 13 && e.target.value !== "") {
								editTaskNameHandler(workLists.workID, e.target.value);
								toggleNameEditorHandler();
							}
						}}
					/>
				) : (
					<div>
						<TodoBtn onClick={backToListHandler}>{"<- Back"}</TodoBtn>
						<span
							style={{ marginLeft: "1em" }}
							onDoubleClick={toggleNameEditorHandler}
						>
							{workLists.taskName} :<small> {workLists.taskStatus} </small>
							<TodoBtn onClick={toggleDetailEditorHandler}>
								{editorStatus.taskDetail ? "Save" : "Edit"}
							</TodoBtn>
						</span>
					</div>
				)}
				<div style={{ marginTop: "2em" }}>
					{editorStatus.taskDetail ? (
						<textarea
							style={{ width: "100%" }}
							rows={5}
							defaultValue={workLists.detail ? workLists.detail : ""}
							onKeyPress={e => {
								console.log(e.which);
							}}
							onChange={e =>
								editTaskDetailHandler(workLists.workID, e.target.value)
							}
						/>
					) : (
						<ReactMarkdown
							className="markdown-body"
							source={workLists.detail ? workLists.detail : ""}
						/>
					)}
				</div>
			</h1>
		</div>
	);
};

export default TodoDetail;
