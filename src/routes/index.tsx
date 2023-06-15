import Layout from '../pages/_layout'
import IndexPage from '../pages/index'

export const routes = [
    {
        path : '/',
        elements : <Layout />,
        children : [
            { path : '/', element : <IndexPage /> , index : true}
        ]
    }
]

export const Pages = [
    {route : '/'},
]