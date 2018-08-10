import React, { Component } from "react";
import * as _ from "lodash";
import TodoList from "./containers/TodoList";
import TodoDetail from "./containers/TodoDetail";

class App extends Component {
	constructor(props) {
		super(props);
		const workLists = localStorage.getItem("workLists")
			? [...JSON.parse(localStorage.getItem("workLists"))]
			: [];
		const editor = { taskName: false, taskDetail: false };
		this.state = {
			createInput: false,
			filter: localStorage.getItem("filter")
				? localStorage.getItem("filter")
				: "All",
			workLists,
			workDetail: {
				opened: false,
				workID: "",
				editor
			}
		};
	}

	componentDidUpdate() {
		localStorage.setItem("workLists", JSON.stringify(this.state.workLists));
		localStorage.setItem("filter", this.state.filter);
	}

	keyEnterHandler = e => {
		if (e.charCode === 13 && e.target.value !== "") {
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

	toggleStatusHandler = key => {
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
		if (!window.confirm("Are you sure ?")) return;
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

	backToListHandler = () => {
		let workDetail = this.state.workDetail;
		workDetail.opened = !workDetail.opened;
		this.setState({ workDetail });
	};

	openDetailHandler = workID => {
		let workDetail = this.state.workDetail;
		workDetail.opened = true;
		workDetail.workID = workID;
		this.setState({ workDetail });
	};

	toggleNameEditorHandler = () => {
		let workDetail = this.state.workDetail;
		workDetail.editor.taskName = !workDetail.editor.taskName;
		this.setState({ workDetail });
	};

	editTaskNameHandler = (workID, taskName) => {
		let workLists = this.state.workLists;
		workLists[workID].taskName = taskName;
		this.setState({ workLists });
	};

	toggleDetailEditorHandler = () => {
		let workDetail = this.state.workDetail;
		workDetail.editor.taskDetail = !workDetail.editor.taskDetail;
		this.setState({ workDetail });
	};

	editTaskDetailHandler = (workID, detail) => {
		let workLists = this.state.workLists;
		workLists[workID].detail = detail;
		this.setState({ workLists });
	};

	render() {
		return (
			<div className="App">
				{this.state.workDetail.opened ? (
					<TodoDetail
						editorStatus={this.state.workDetail.editor}
						backToListHandler={this.backToListHandler}
						toggleNameEditorHandler={this.toggleNameEditorHandler}
						toggleDetailEditorHandler={this.toggleDetailEditorHandler}
						editTaskNameHandler={this.editTaskNameHandler}
						editTaskDetailHandler={this.editTaskDetailHandler}
						workLists={{
							workID: this.state.workDetail.workID,
							...this.state.workLists[this.state.workDetail.workID]
						}}
					/>
				) : (
					<TodoList
						{...this.state}
						toggleFilterHandler={this.toggleFilterHandler}
						keyEnterHandler={this.keyEnterHandler}
						focusOutHandler={this.focusOutHandler}
						toggleCreateInputHandler={this.toggleCreateInputHandler}
						clearCompletedHandler={this.clearCompletedHandler}
						toggleStatusHandler={this.toggleStatusHandler}
						openDetailHandler={this.openDetailHandler}
					/>
				)}
			</div>
		);
	}
}

export default App;
