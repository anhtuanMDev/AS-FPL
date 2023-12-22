import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from 'react-router-dom';
import List from './components/News/List';
import TopicList from './components/Topics/List'
import UserInfor from './components/Users/Infor';
import Add from './components/News/Add';
import TopicAdd from './components/Topics/Add';
import Edit from './components/News/Edit';
import TopicEdit from './components/Topics/Edit';
import UserEdit from './components/Users/Edit';
import Login from './components/Users/Login';
import Register from './components/Users/Register';
import ResetPassword from './components/Users/ResetPassword';

function App() {


  const getUserFromLocalStorage = () => {
    const _user = localStorage.getItem('user')
    if (_user) return JSON.parse(_user)
    return null
  }

  const setUserToLocalStorage = (_user) => {
    setUser(_user);  // Set the user in the state first
    localStorage.setItem('user', JSON.stringify(_user));
  }

  const [user, setUser] = useState(getUserFromLocalStorage())

  const ProtectedLayout = () => {
    if (!user) {
      return <Navigate to="/" />;
    }
    return (<Outlet />);
  }

  const UnprotectedLayout = () => {
    if (user) {
      return <Navigate to="/news/list" />;
    }
    return (<Outlet />);
  }
  // if (!user) {
  //   return <Login user={user} setUser={setUser} />
  // }
   
  return (
    <Router>
      <Routes>
        <Route element={<UnprotectedLayout />} >
          <Route path="/" element={<Login setUser={setUserToLocalStorage} />} />
          <Route path="/register" element={<Register setUser={setUserToLocalStorage} />} />
        </Route>

        <Route element={<ProtectedLayout />} >
          <Route path="/news/list" element={<List user={user} setUser={setUserToLocalStorage} />} />
          <Route path="/news/add" element={<Add user={user} setUser={setUserToLocalStorage}/>} />
          <Route path="/new/edit/:NewID" element={<Edit user={user} setUser={setUserToLocalStorage}/>}/>

          <Route path='/topics/list' element={<TopicList user={user} setUser={setUserToLocalStorage}/>} />
          <Route path='/topics/add' element={<TopicAdd user={user} setUser={setUserToLocalStorage}/>} />
          <Route path='/topics/edit/:TopicID' element={<TopicEdit user={user} setUser={setUserToLocalStorage}/>} />

          <Route path='/user/infor' element={<UserInfor user={user} setUser={setUserToLocalStorage}/>} />
          <Route path='/user/edit' element={<UserEdit user={user} setUser={setUserToLocalStorage}/>} />
          
        </Route>

        <Route path="/user/resetPassword/:Email?:token" element={<ResetPassword user={user} />}/>
        <Route path="/user/resetPassword" element={<ResetPassword user={user} />}/>

      </Routes>
    </Router>);
}

export default App;
