import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createTodo, deleteTodo, fetchTodo } from '../features/TodoFeature';
import { logout } from '../features/AuthFeature';

const Todo = () => {

    const [myTodo, setMyTodo] = useState("");
    const dispatch = useDispatch(); 
    const {loading,todos} = useSelector(state => state.todos)

    const addTodo = () => {
        dispatch(createTodo({todo:myTodo}))
        setMyTodo("")
    }

    useEffect(() => {
        dispatch(fetchTodo())
    },[])

  return (
    <div>
          {loading && 
         <div className="progress">
         <div className="indeterminate"></div>
     </div>
     }
      <input 
      type="text" 
      placeholder='write a todo here'
      value={myTodo}
      onChange={(e) => {setMyTodo(e.target.value)}}
      />
      <button className='btn'
      onClick={addTodo}
      >Add Todo</button>
      <ul className="collection">
        {todos.map((item)=>{
            return <li className="collection-item"
             key={item._id}
             onClick={() => {dispatch(deleteTodo(item._id))}}
             >{item.todo}</li>
        })}
      
    </ul>
    <button 
      className='btn'
      onClick={() => dispatch(logout())}
      >Logout</button>
    </div>
  )
}

export default Todo
