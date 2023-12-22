import React, { useState, useEffect } from 'react'
import AxiosInstance from '../helpers/AxiosInstance'
import swal from "sweetalert";
import '../../css/sb-admin-2.min.css'
import 'bootstrap/dist/css/bootstrap.min.css';

const Register = () => {

  const [UserID, setUserID] = useState('')
  const [Name, setName] = useState('')
  const [Email, setEmail] = useState('')
  const [Password, setPassword] = useState('')
  const [BranchID, setBranchID] = useState('')
  const [Phone, setPhone] = useState('')
  const [Avatar, setAvatar] = useState('')

  const [previewImage, setPreviewImage] = useState(null);
  const [imageInput, setImageInput] = useState('Chose image');

  const [branches, setBranches] = useState([]);

  const [selectedRole, setSelectedRole] = useState('student');

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await AxiosInstance().get('/get-branch.php');
        setBranches(result.branches);
        setBranchID(result.branches[0].BranchID);
        console.log(result.branches);
        console.log(result.branches[0].BranchID);
      } catch (error) {
        console.log("Unable to fetch data:" + error);
      }
    };
    fetchData();
  }, []);


  const handleImage = async (event) => {
    setImageInput(event.target.value);
    // hiển hình lên img
    setPreviewImage(URL.createObjectURL(event.target.files[0]));
    // upload ảnh lấy link
    const formData = new FormData();
    formData.append('image', event.target.files[0]);
    const result = await AxiosInstance('multipart/form-data')
      .post('/upload-file.php', formData);
    setAvatar(result.path);
    console.log(Avatar);
  }



  const handleRegister = async () => {

    if (UserID == '' || Name == '' || Password == '' || Phone == '' || Avatar == '') {
      swal({
        title: "Đăng ký thât bại !",
        text: "Xin vui lòng nhập đầy đủ thông tin !",
        icon: "error",
        button: "Ok !",
      });
      console.log(`userID: ${UserID}`);
      console.log(`name: ${Name}`);
      console.log(`password: ${Password}`);
      console.log(`phone: ${Phone}`);
      console.log(`avatar: ${Avatar}`);
      return;
    }

    const check = await AxiosInstance().post('/check-userID.php', { UserID: UserID });
    if (!check.status) {
      swal({
        title: "Đăng ký thât bại !",
        text: "ID đã tồn tại !",
        icon: "error",
        button: "Ok !",
      });
      return;
    } else {


      swal({
        title: "Xác nhận đăng ký !",
        text: "Hãy bấm Create để tạo tài khoản",
        icon: "info",
        buttons: ["Cancel", "Create !"],
      })
        .then(async (willInsert) => {
          if (willInsert) {

            try {

              const body = {
                UserID: UserID,
                Name: Name,
                Email: Email,
                Password: Password,
                BranchID: BranchID,
                Phone: Phone,
                Avatar: Avatar,
                Role: selectedRole
              }

              console.log(body);

              const result = await AxiosInstance().post('/register.php', body);
              console.log(result);
              console.log(result.status);
              if (result.status) {
                swal("Đăng ký thành công !", "Hãy đăng nhập nào !", "success");

                setTimeout(() => {
                  window.location.href = "/";
                }, 2000)
              } else {
                swal({
                  title: `${result.message}`,
                  text: "Xin vui lòng thử lại !",
                  icon: "error",
                  button: "Ok !",
                });
              }
            } catch (error) {
              console.log("Unable to fetch data:" + error);
              swal("Đăng ký thất bại !", "Xin vui lòng thử lại !", "error");
            }
          } else {
          }
        });

    }
  }


  return (

    <div className="bg-gradient-primary min-vh-100">

      <div className="container">

        <div className="card o-hidden border-0 shadow-lg my-5">
          <div className="card-body p-0">

            <div className="row">
              <div className="col-lg-5 d-none d-lg-block bg-register-image"></div>
              <div className="col-lg-7">
                <div className="p-5">
                  <div className="text-center">
                    <h1 className="h4 text-gray-900 mb-4">Create your Account!</h1>
                  </div>
                  <form className="user">
                    <div className="form-group row">
                      <div className="col-sm-4 mb-3 mb-sm-0">
                        <input type="text" className="form-control form-control-user"
                          value={UserID} onChange={(event) => setUserID(event.target.value)}
                          placeholder="ID" />
                      </div>
                      <div className="col-sm-8">
                        <input type="text" className="form-control form-control-user"
                          value={Name} onChange={(event) => setName(event.target.value)}
                          placeholder="Your Name" />
                      </div>
                    </div>

                    <div className="form-group" >
                      <input type="email" className="form-control form-control-user "
                        value={Email} onChange={(event) => setEmail(event.target.value)}
                        placeholder="Email Address" />
                    </div>

                    <div className="form-group row d-flex align-items-center">
                      <div className="col-sm-8 mb-3 mb-sm-0">
                        <input
                          type="password"
                          className="form-control form-control-user"
                          value={Password}
                          onChange={(event) => setPassword(event.target.value)}
                          placeholder="Password"
                        />
                      </div>
                      <div className="form-group col-sm-4 my-2">
                        <select
                          value={BranchID}
                          onChange={(event) => {
                            console.log(event.target.value);
                            setBranchID(event.target.value);
                          }}
                          className="form-control"
                        >
                          {branches.map((branch, index) => (
                            <option key={index} value={branch.BranchID}>
                              {branch.Name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>


                    <div className="form-group row d-flex align-items-center">
                      <div className="col-sm-2 mb-3 mb-sm-0">
                        <img src={previewImage !== null ? previewImage : require('../assets/avatar.png')}
                          width={40} height={30} />
                      </div>
                      <div className="custom-file form-group col-sm-10">
                        <input type="file" className="custom-file-input"
                          onChange={handleImage}
                        />
                        <label className="custom-file-label" htmlFor="customFile">
                          {imageInput}
                        </label>
                      </div>
                    </div>

                    <div className="form-group row">
                      <div className="form-group col-sm-4 row my-3">
                        <div className="col-sm-6 ">
                          <label htmlFor='teacher'>
                            <input
                              id='teacher'
                              type="radio"
                              value="teacher"
                              className="custom-radio-input"
                              checked={selectedRole === 'teacher'}
                              onChange={handleRoleChange}
                            />
                            Teacher
                          </label>
                        </div>

                        <div className="col-sm-6 ">
                          <label htmlFor='student'>
                            <input
                              id='student'
                              type="radio"
                              value="student"
                              className="custom-radio-input"
                              checked={selectedRole === 'student'}
                              onChange={handleRoleChange}
                            />
                            Student
                          </label>
                        </div>
                      </div>

                      <div className="col-sm-8">
                        <input type="text" className="form-control form-control-user"
                        value={Phone} onChange={(event) => setPhone(event.target.value)}
                          placeholder="Phone number" />
                      </div>
                    </div>
                    <a onClick={() => { handleRegister() }} className="btn btn-primary btn-user btn-block my-5">
                      Register Account
                    </a>

                  </form>

                  <div className="text-center">
                    <a className="small" href="forgot-password.html">Forgot Password?</a>
                  </div>
                  <div className="text-center">
                    <a className="small" href="login.html">Already have an account? Login!</a>
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

export default Register