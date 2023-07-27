import React,  { useState, useEffect } from 'react'

function Page() {

    const [todoList, setTodoList] = useState([
        { done: true, text: 'Learn JavaScript' },
        { done: false, text: 'Learn React' },
        { done: false, text: 'Have a life!' },
    ])


    function completion(list){
        const completedToDo = []
        const notCompletedToDo = []
        const result = [completedToDo, notCompletedToDo]
        for(var i = 0; i < list.length; i ++){
            if(list[i].done === true){
                result[0].push(list[i]) // completedToDo
            } else {
                result[1].push(list[i]) // notCompletedToDo
            }
        }
        return result
    }

    const [activeFilter, setActiveFilter] = useState("All")

    function deleting(i){
        const newToDo = []
        var ind = 0
        var length = todoList.length
        while(ind < length){
            if(i !== ind){
                newToDo.push(todoList[ind])
            }
            ind ++
        }
        setTodoList(newToDo)
    }

    const initialToDoValues = {done: false, text : ""}
    
    const [ToDo, setToDo] = useState(initialToDoValues)

    // butona tıkladıktan sonra input bölgesini eski haline getirmek için
    useEffect(() => {
        setToDo(initialToDoValues)
    },[todoList])

    const onChangeInput = (eve) => {
        setToDo({text: eve.target.value}) // "...form" olmazsa ilk girilen inputu eklemiyor!
    }

    const onSubmit = (event) => {
        event.preventDefault()      // varsayılan formun içeriği bir yere götürüp sayfayı yenileme işlemini engeller
        
        if(ToDo.text === "" ){
            return false
        }

        setTodoList([...todoList, ToDo])
        //setForm(initialFormValues)
    }

    const handleToggle = (index) => {
        const newToDo = []
        var ind = 0
        var length = todoList.length
        while(ind < length){
            if(index === ind){
                newToDo.push({done: ! todoList[ind].done, text: todoList[ind].text})
            } else {
                newToDo.push(todoList[ind])
            }
            ind ++
        }
        setTodoList(newToDo)

        // const updatedTodoList = todoList.map((todo, i) =>
        //   index === i ? { ...todo, done: !todo.done } : todo
        // );
        // setTodoList(updatedTodoList);
      };

      const handleAllToggle = () => {
        const newToDo = []
        var ind = 0
        var length = todoList.length
        while(ind < length){
            newToDo.push({done: true, text: todoList[ind].text})
            ind ++
        }
        setTodoList(newToDo)
      };
    
  return (
    <div>
      <section class="todoapp">
	    <header class="header">
		    <h1>ToDo's</h1>
		        <form onSubmit={onSubmit}>
			        <input class="new-todo" placeholder="What needs to be done?" autoFocus 
                    value = {ToDo.text} onChange={onChangeInput}/>
		        </form>
	    </header>
	
	<section class="main">
		<input class="toggle-all" type="checkbox" onChange={() => handleAllToggle()} checked={completion(todoList)[1].length === 0} />
		<label for="toggle-all" mv-action="set(done, !toggle-all)">
			Mark all as complete
		</label>

        
		<ul class="todo-list">
            {todoList.map((ToDo, i) =>( 
            <li key={i} class={ToDo.done ? "completed" : ""} 
                hidden={(ToDo.done && activeFilter === 'Active') ||
                        (!ToDo.done && activeFilter === 'Completed')
            }>
                <div class="view">
					{/* <input class="toggle" type="checkbox" onChange={() => {todoList[i].setToDo( {done:! (ToDo.done), text : ToDo.text})}} value={todoList[i].done}/> */}
                    <input
                    className="toggle"
                    type="checkbox"
                    onChange={() => handleToggle(i)} // Update the checkbox handler
                    checked={todoList[i].done} // Set the checked attribute based on the 'done' property
                    />

					<label>{ToDo.text}</label>
					<button class="destroy" onClick={() => deleting(i)}></button>
				</div>
            </li>))}

		</ul>
	</section>

	<footer class="footer">
		<span class="todo-count">
			<strong>{completion(todoList)[1].length} </strong>
			 tems left
		</span>

		<ul class="filters">
			<li>
				<a href="#/" class = "selected" onClick={() => setActiveFilter("All")}>All</a>
			</li>
			<li>
				<a href="#/" onClick={() => setActiveFilter("Active")}>Active</a>
			</li>
			<li>
				<a href="#/" onClick={() => setActiveFilter("Completed")}>Completed</a>
			</li>
		</ul>

		<button class="clear-completed" onClick={() => setTodoList(completion(todoList)[1])}>
			Clear completed
		</button>
	</footer>
</section>

<footer class="info">
	<p>Click to edit a todo</p>
	<p>Created by <a href="https://d12n.me/">Dmitry Sharabin</a></p>
	<p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
</footer>
    </div>
  )
}

export default Page
