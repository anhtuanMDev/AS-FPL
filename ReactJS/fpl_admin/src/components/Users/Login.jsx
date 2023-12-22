import React, { useState, useEffect } from 'react'
import '../../css/sb-admin-2.min.css'
import swal from "sweetalert";
import AxiosInstance from '../helpers/AxiosInstance'

const Login = (prop) => {

  const { setUser } = prop;

  const [Email, setEmail] = useState('')
  const [Password, setPassword] = useState('')

  const handleLogin = async () => {
    try {

      if (Email === '' || Password === '')
        throw new Error("Email hoặc Password không được để trống")
      const body = { Email, Password }
      const res = await AxiosInstance().post('/login.php', body)
      setUser(res.user)
      swal({
        title: "Đăng nhập thành công !",
        text: `Xin chào ${res.user[0].Name} !`,
        icon: "success",
        button: "Ok !",
      });
    } catch (error) {
      swal({
        title: "Đăng nhập thât bại !",
        text: `${error}`,
        icon: "error",
        button: "Ok !",
      });
    }
  }

  const handleFPass = async () => {
    try {
      if (Email === '')
        throw new Error("Email không được để trống")
        swal({
          title: "Đang gửi yêu cầu!",
          text: `Xin hãy đợi 1 chút !`,
          icon: "info",
        });
      const res = await AxiosInstance().post('/forgot-password.php', { Email: Email })
      console.log(res)
      swal({
        title: "Đã gửi yêu cầu !",
        text: `Vui lòng kiểm tra email ${Email} !`,
        icon: "success",
        button: "Ok !",
      });
    } catch (error) {
      swal({
        title: "Gửi yêu cầu thât bại !",
        text: `${error}`,
        icon: "error",
        button: "Ok !",
      });
    }
  }


  return (
    <div className="bg-gradient-primary min-vh-100">

      <div className=" container-fluid row justify-content-center">

        <div className="col-xl-10 col-lg-12 col-md-9">

          <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">

              <div className="row">
                <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                <div className="col-lg-6">
                  <div className="p-5">
                    <div className="text-center">
                      <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                    </div>


                    <form className="user">
                      <div className="form-group">
                        <input type="email" className="form-control form-control-user"
                          value={Email} onChange={(event) => setEmail(event.target.value)}
                          id="exampleInputEmail" aria-describedby="emailHelp"
                          placeholder="Enter Your Email Address..." />
                      </div>

                      <div className="form-group">
                        <input type="password" className="form-control form-control-user"
                          value={Password} onChange={(event) => setPassword(event.target.value)}
                          id="exampleInputPassword" placeholder="Password" />
                      </div>

                      <a className="btn btn-primary btn-user btn-block mt-5" onClick={handleLogin}>
                        Login
                      </a>
                      <a href="index.html" className="btn btn-google btn-user btn-block">
                        <i className="fab fa-google fa-fw"></i> Login with Google
                      </a>
                      <a href="index.html" className="btn btn-facebook btn-user btn-block">
                        <i className="fab fa-facebook-f fa-fw"></i> Login with Facebook
                      </a>
                    </form>

                    <div className="text-center">
                      <a className="small" style={{cursor:'pointer'}} onClick={handleFPass}>Forgot Password?</a>
                    </div>
                    <div className="text-center">
                      <a className="small" href="/register">Create an Account!</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

export default Login