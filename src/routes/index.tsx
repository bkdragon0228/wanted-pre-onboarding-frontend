import Layout from '../pages/_layout'
import IndexPage from '../pages/index'
import SignupPage from '../pages/signup/index'
import SigninPage from '../pages/signin'
import TodoPage from '../pages/todo'

export const routes = [
    {
        path : '/',
        elements : <Layout />,
        children : [
            { path : '/', element : <IndexPage /> , index : true },
            { path : '/signup', element : <SignupPage />, index : true },
            { path : '/signin', element : <SigninPage />, index : true },
            { path : '/todo', element : <TodoPage />, indext : true }
        ]
    }
]

export const Pages = [
    { route : '/' },
    { route : '/signup' },
    { route : '/signin' },
    { route : '/todo' },
]