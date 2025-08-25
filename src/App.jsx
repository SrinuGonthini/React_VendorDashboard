import { Routes,Route } from 'react-router-dom'
import './App.css'
import Login from './components/Login'
import Register from './components/Register'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import AddRestaurant from './components/AddRestaurant'
import About from './pages/About'
import WelcomePage from './pages/WelcomePage'
import { useEffect, useState } from 'react'
import PublicRoute from './Routes/publicRoute'
import PrivateRoute from './Routes/privateRoute'
import MainLayout from './Routes/MainLayout'
import OneRestaurant from './pages/OneResturants'
import ViewRestaurants from './pages/ViewRestaurants'
import AddItems from './components/AddItems'
import ViewItems from './pages/ViewItems'
import OneItem from './pages/OneItem'
import Missing from './pages/Missing'


function App() {

  const [isLogin,setIsLogin] = useState(false);

  useEffect(()=>{
    const token = localStorage.getItem('accessToken')
    setIsLogin(!!token)
  },[])

  return (
    <div className='App'>
      <Navbar isLogin={isLogin} setIsLogin={setIsLogin} />
      <Routes>
        <Route element={<PublicRoute/>}>
          <Route path='/' element={<WelcomePage/>}/>
          <Route path='/login' element={<Login setIsLogin={setIsLogin}/>}/>
          <Route path='/register' element={<Register/>}/>
        </Route>
        <Route element={<PrivateRoute><MainLayout/></PrivateRoute>}>
        <Route path='/home' element={<Home/>}/>
        <Route path='/restaurant/add' element={<AddRestaurant/>}/>
        <Route path='/restaurant/edit/:id' element={<AddRestaurant/>}/>
        <Route path='/restaurant/:id' element = {<OneRestaurant/>}/>
        <Route path='/restaurant/vendor/:id' element = {<ViewRestaurants/>}/>
        <Route path='/products/:id' element = {<AddItems/>} />
        <Route path='/products/edit/:id' element = {<AddItems/>} />
        <Route path='/products/all/:id' element = {<ViewItems/>} />
        <Route path='/products/product/:id' element={<OneItem/>} />
        <Route path='/about' element={<About/>}/>
        </Route>
        <Route path='*' element={<Missing/>}/>
      </Routes>
    </div>
  )
}

export default App
