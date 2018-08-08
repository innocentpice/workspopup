import React from "react";
import TodoBlock from "../components/TodoBlock";
import { TodoBtn, InputTodo } from "../components/styledComponents";

const TodoList = props => {
	const {
		openDetailHandler,
		keyEnterHandler,
		focusOutHandler,
		toggleCreateInputHandler,
		toggleFilterHandler,
		clearCompletedHandler,
		toggleStatusHandler
	} = props;
	return (
		<div>
			{props.createInput ? (
				<InputTodo
					type="text"
					placeholder="ระบุสิ่งที่ต้องทำ"
					innerRef={input => {
						if (input) input.focus();
					}}
					onKeyPress={keyEnterHandler}
					onBlur={focusOutHandler}
				/>
			) : (
				<div>
					<TodoBtn onClick={toggleCreateInputHandler}>Add Todo</TodoBtn>
					<TodoBtn onClick={toggleFilterHandler}>
						Filter: {props.filter}
					</TodoBtn>
					<TodoBtn onClick={clearCompletedHandler}>Clear</TodoBtn>
				</div>
			)}
			{props.workLists.map((item, key) => {
				if (props.filter !== "All" && item.taskStatus === props.filter) {
					return (
						<TodoBlock
							key={key}
							{...item}
							toggleStatusHandler={() => toggleStatusHandler(key)}
							openDetailHandler={() => openDetailHandler(key)}
						/>
					);
				}
				if (props.filter === "All") {
					return (
						<TodoBlock
							key={key}
							{...item}
							toggleStatusHandler={() => toggleStatusHandler(key)}
							openDetailHandler={() => openDetailHandler(key)}
						/>
					);
				}
				return null;
			})}
		</div>
	);
};

export default TodoList;
