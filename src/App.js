import React, { Component } from "react";
import styled from "styled-components";
import * as _ from "lodash";

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
					checked={taskStatus === "Completed" ? "true" : ""}
				/>
				<span>{taskName}</span>
			</h1>
		</Block>
	);
};

const TodoBtn = styled.button`
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

const InputTodos = styled.input`
	padding: 0.75em;
	border-radius: 5px;
	outline: none;
`;

class App extends Component {
	constructor(props) {
		super(props);
		const workLists = localStorage.getItem("workLists")
			? [...JSON.parse(localStorage.getItem("workLists"))]
			: [];
		this.state = {
			createInput: false,
			filter: "All",
			workLists
		};
	}

	componentDidUpdate() {
		localStorage.setItem("workLists", JSON.stringify(this.state.workLists));
	}

	keyEnterHandler = e => {
		if (e.charCode === 13) {
			this.setState({
				createInput: false,
				workLists: [
					...this.state.workLists,
					{ taskName: e.target.value, taskStatus: "InProcess" }
				]
			});
			e.target.value = "";
		}
	};

	focusOutHandler = e => {
		this.setState({
			createInput: false
		});
		e.target.value = "";
	};

	toggleStatusHandler = ({ key }) => {
		const value = this.state.workLists[key].taskStatus;
		let workLists = this.state.workLists;
		workLists[key].taskStatus =
			value === "InProcess" ? "Completed" : "InProcess";
		this.setState({ workLists });
	};

	toggleCreateInputHandler = () => {
		this.setState({ createInput: !this.state.createInput });
	};

	clearCompletedHandler = () => {
		let workLists = this.state.workLists.map(item => {
			return item.taskStatus === "InProcess" ? { ...item } : null;
		});
		workLists = _.remove(workLists, item => {
			return item != null;
		});
		this.setState({ workLists });
	};

	toggleFilterHandler = () => {
		const switcher = ["All", "InProcess", "Completed"];
		let switchKey = 0;
		switcher.map((value, key) => {
			if (this.state.filter === value) switchKey = key + 1;
			if (switchKey >= switcher.length) switchKey = 0;
			return false;
		});
		this.setState({ filter: switcher[switchKey] });
	};

	render() {
		return (
			<div className="App">
				{this.state.createInput ? (
					<InputTodos
						type="text"
						placeholder="ระบุสิ่งที่ต้องทำ"
						innerRef={input => {
							if (input) input.focus();
						}}
						onKeyPress={this.keyEnterHandler}
						onBlur={this.focusOutHandler}
					/>
				) : (
					<div>
						<TodoBtn onClick={this.toggleCreateInputHandler}>Add Todo</TodoBtn>
						<TodoBtn onClick={this.toggleFilterHandler}>
							Filter: {this.state.filter}
						</TodoBtn>
						<TodoBtn onClick={this.clearCompletedHandler}>Clear</TodoBtn>
					</div>
				)}
				{this.state.workLists.map((item, key) => {
					if (
						this.state.filter !== "All" &&
						item.taskStatus === this.state.filter
					) {
						return (
							<TodoBlock
								key={key}
								{...item}
								toggleStatusHandler={this.toggleStatusHandler.bind(this, {
									key
								})}
							/>
						);
					}
					if (this.state.filter === "All") {
						return (
							<TodoBlock
								key={key}
								{...item}
								toggleStatusHandler={this.toggleStatusHandler.bind(this, {
									key
								})}
							/>
						);
					}
					return null;
				})}
			</div>
		);
	}
}

export default App;
