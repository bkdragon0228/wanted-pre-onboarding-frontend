import { ChangeEvent, useCallback, useEffect, useState } from "react";
import Axios from "../util/httpRequest";

interface CTodo {
    todo : string;
}

interface Todo {
    id : number;
    todo : string;
    isCompleted : boolean;
    userId : number;
}

type Todos = Todo[]

export default function useTodos () {
    const accessToken = localStorage.getItem('accessToken')

    const [todo, setTodo] = useState<string>('')
    const [todos, setTodos] = useState<Todos>([])

    const handleTodo = (e : ChangeEvent<HTMLInputElement & HTMLSelectElement>) =>{
        setTodo(e.target.value)
    }

    const createTodo = useCallback(async() => {
        if(!accessToken) return

        try {
            const response = await Axios.use<CTodo, Todo>({
                method : 'post',
                url : '/todos',
                headers : {
                    "Content-Type" : 'application/json',
                    Authorization : `Bearer ${accessToken}`
                },
                data : {
                    todo,
                }
            })

            setTodos((prev) => [...prev, response.data])
            setTodo('')
        } catch (error) {
            console.log(error)
        }
    }, [accessToken, todo])

    const fetchTodoData = useCallback(async () => {
        if(!accessToken) return
        try {
            const resopnse = await Axios.use<{}, Todos>({
                method : 'get',
                url : '/todos',
                headers : {
                    Authorization : `Bearer ${accessToken}`
                }
            })
            setTodos(resopnse.data)
        } catch (error) {
            console.log(error)
        }
    }, [accessToken, setTodos])

   useEffect(() => {
    fetchTodoData()
   }, [])

    return {
        todos,
        todo,
        handleTodo,
        createTodo,
        refetchTodo : fetchTodoData
    }

}