import './App.css';
import {Todolist} from "./Todolist";
import {useState} from "react";

export type TaskType = {
	id: number
	title: string
	isDone: boolean
}

export type FilterValueType = "all" | "active" | "completed"

function App() {
	// let tasks1: Array<TaskType> = [
	// 	{ id: 1, title: 'HTML&CSS', isDone: true },
	// 	{ id: 2, title: 'JS', isDone: true },
	// 	{ id: 3, title: 'ReactJS', isDone: false },
	// 	{ id: 4, title: 'Redux', isDone: false },
	// 	{ id: 5, title: 'Typescript', isDone: false },
	// 	{ id: 6, title: 'RTK query', isDone: false },
	// ]

	const tasks2: Array<TaskType> = [
		// { id: 1, title: 'Hello world', isDone: true },
		// { id: 2, title: 'I am Happy', isDone: false },
		// { id: 3, title: 'Yo', isDone: false },
	]

	const [tasks, setTasks] = useState<Array<TaskType>>([
		{ id: 1, title: 'HTML&CSS', isDone: true },
		{ id: 2, title: 'JS', isDone: true },
		{ id: 3, title: 'ReactJS', isDone: false },
		{ id: 4, title: 'Redux', isDone: false },
		{ id: 5, title: 'Typescript', isDone: false },
		{ id: 6, title: 'RTK query', isDone: false },
	])

	const [filter, setFilter] = useState<FilterValueType>("all");

	const removeTask = (taskId: number) => {
		const filteredTasks = tasks.filter(task => {
			return task.id !== taskId
		})
		setTasks(filteredTasks)
	}

	const changeFilter = (filter: FilterValueType) => {
		setFilter(filter)
	}

	let tasksForTodolist = tasks
	if (filter === "active") {
		tasksForTodolist = tasks.filter(task => !task.isDone)
	}
	if (filter === "completed") {
		tasksForTodolist = tasks.filter(task => task.isDone)
	}


	return (
		<div className="App">
			<Todolist title="What to learn"
					  tasks={tasksForTodolist}
					  removeTask={removeTask}
					  changeFilter={changeFilter}/>
		</div>
	);
}

export default App;
