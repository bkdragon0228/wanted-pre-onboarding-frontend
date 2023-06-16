import { ChangeEvent, useCallback, useEffect, useState } from "react";
import Axios from "../util/httpRequest";

interface CTodo {
    todo : string;
}

type UTodo = CTodo & {
    isCompleted : boolean
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

    // const updateTodo = useCallback(async ({
    //     id,
    //     todo,
    //     isCompleted
    // } : Partial <{
    //     id : string;
    //     todo : string;
    //     isCompleted : boolean;
    // }>) => {
    //     if(!accessToken) return

    //     const newData : Partial<UTodo> = {}

    //     newData.todo = todo
    //     newData.isCompleted = isCompleted

    //     try {
    //         const response = await Axios.use<UTodo, Todo>({
    //             method : 'post',
    //             url : `/todos/${id}`,
    //             data : newData,
    //             headers : {
    //                 "Content-Type" : 'application/json',
    //                 Authorization : `Bearer ${accessToken}`
    //             }
    //         })
    //     } catch (error) {
    //         console.log(error)
    //     }

    // }, [accessToken])

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

    const deleteTodo = useCallback(async (id : number) => {
        if(!accessToken) return

        try {
            await Axios.use({
                method : 'delete',
                url : `/todos/${id}`,
                headers : {
                    Authorization : `Bearer ${accessToken}`
                }
            })

            setTodos((prev) => prev.filter((todo) => todo.id !== id))

        } catch (error) {
            console.log(error)
        }
    }, [accessToken])

   useEffect(() => {
    fetchTodoData()
   }, [])

    return {
        todos,
        todo,
        handleTodo,
        createTodo,
        deleteTodo,
        refetchTodo : fetchTodoData
    }

}