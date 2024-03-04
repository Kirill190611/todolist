import './App.css';
import {Todolist} from "./Todolist";
import {useState} from "react";

export type TaskType = {
	id: number
	title: string
	isDone: boolean
}

export type FilterType = "all" | "active" | "completed"

function App() {
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

	const [filter, setFilter] = useState<FilterType>("all");

	const removeTask = (taskId: number) => {
		const updatedState = tasks.filter(task => task.id !== taskId)
		setTasks(updatedState);
	}

	const changeTodoListFilter = (filter: FilterType) => {
		setFilter(filter);
	}

	const changeFilter = (allTask: Array<TaskType>, currentFilter: FilterType): Array<TaskType> => {
		switch (currentFilter) {
			case "active":
				return allTask.filter(t => t.isDone === false)
			case "completed":
				return allTask.filter(t => t.isDone === true)

			default:
				return allTask;
		}
	}

	const filteredTasks = changeFilter(tasks, filter);

	return (
		<div className="App">
			<Todolist title="What to learn"
					  tasks={filteredTasks}
					  removeTask={removeTask}
					  changeTodoListFilter={changeTodoListFilter}/>
		</div>
	);
}

export default App;
