import UserLogin from './pages/userLogin'
import UserDetails from './pages/userDetails'
import HomePage from './pages/HomePage'
import Post from './pages/Post'
import PostFeed from './pages/PostFeed'
import Alert from './components/Alert'
import Navbar from './components/Navbar'
import Logout from './pages/Logout'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import GetUser from './pages/GetUser'
import { useState } from 'react'

import OwnPost from './pages/OwnPost'
import ImageUpload from './pages/ImageUpload'
import AdminDashboard from './pages/AdminDashboard'





function App() {

  const [mode, setMode] = useState('light')
  const [checkBtn, setCheckBtn] = useState('Enable Dark Mode')


  const toggleMode = () => {
    if (mode === 'light') {
      setMode('dark')
      setCheckBtn('Enable Light Mode')
      document.body.style.backgroundColor = "black"
     
      showAlert('success', "Dark mode has been enabled")
    } else {
      setMode('light')
      setCheckBtn('Enable Dark Mode')
      document.body.style.backgroundColor = "white"
   

      showAlert('success', "Light mode has been enabled")
    }
  }


  const [alert, setAlert] = useState(null)

  const showAlert = (type, message) => {

    setAlert({
      type: type,
      msg: message
    })
    setTimeout(() => {
      setAlert(null)

    }, 3000);
  }


  return (
    <div className="App">
     
        <BrowserRouter>
          <Navbar mode={mode} toggleMode={toggleMode} checkBtn={checkBtn} />
          <Alert alert={alert} />

          <Routes>
            <Route exact path='/' element={<HomePage />} />
            <Route exact path='/UserDetails' element={<UserDetails showAlert={showAlert}/>} />
            <Route exact path='/UserLogin' element={<UserLogin showAlert={showAlert}/>} />
            <Route exact path='/Post' element={<Post showAlert={showAlert}/>} />
            <Route exact path='/PostFeed' element={<PostFeed mode={mode}  showAlert={showAlert}/>} />
            <Route exact path='/Profile' element={<GetUser mode={mode}/>} />
            <Route exact path='/Logout' element={<Logout />} />
            <Route exact path='/OwnPost' element={<OwnPost mode={mode} showAlert={showAlert}/>} />
            <Route exact path='/ImageUpload' element={<ImageUpload mode={mode} showAlert={showAlert}/>} />
            <Route exact path='/admin' element={<AdminDashboard mode={mode}/>} />


            



          </Routes>
        </BrowserRouter>
    </div>


  );
}

export default App;
