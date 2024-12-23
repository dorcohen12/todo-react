const Router = ReactRouterDOM.HashRouter
const { Route, Routes } = ReactRouterDOM


import { AppHeader } from './cmps/AppHeader.jsx'
import { AppFooter } from './cmps/AppFooter.jsx'

import { HomePage } from './pages/HomePage.jsx'
import { AboutUs } from './pages/AboutUs.jsx'
import { TodoIndex } from './pages/TodoIndex.jsx'
import { TodoEdit } from './pages/TodoEdit.jsx'
import { TodoDetails } from './pages/TodoDetails.jsx'
import { store } from './store/store.js'
import { UserDetails } from './pages/UserDetails.jsx'
const { Provider } = ReactRedux

export function App() {
    
    return (
        <Provider store={store}>
            <Router>
                <section className="app">
                    <AppHeader />
                    <main className='main-layout'>
                        <Routes>
                            <Route element={<HomePage />} path="/" />
                            <Route element={<AboutUs />} path="/about" />
                            <Route element={<TodoIndex />} path="/todo" />
                            <Route element={<TodoEdit />} path="/todo/edit" />
                            <Route element={<TodoEdit />} path="/todo/edit/:todoId" />
                            <Route element={<TodoDetails />} path="/todo/:todoId" />
                            <Route element={<UserDetails />} path="/userdetails" />
                        </Routes>
                    </main>
                    <AppFooter />
                </section>
            </Router>
        </Provider>


    )
}


