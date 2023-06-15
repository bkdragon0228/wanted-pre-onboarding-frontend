import Layout from '../pages/_layout'
import IndexPage from '../pages/index'
import SignupPage from '../pages/signup/index'

export const routes = [
    {
        path : '/',
        elements : <Layout />,
        children : [
            { path : '/', element : <IndexPage /> , index : true },
            { path : '/signup', element : <SignupPage />, index : true },
        ]
    }
]

export const Pages = [
    { route : '/' },
    { route : '/signup' }
]