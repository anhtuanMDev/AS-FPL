import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from "react";
import AxiosInstance from "../helpers/AxiosInstance";
import { useParams } from 'react-router-dom';
import swal from "sweetalert";

const Edit = (props) => {

    const { NewID } = useParams();

    const { user } = props;
    const { setUser } = props;
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [banner, setBanner] = useState('');
    const [topic_id, setTopic_id] = useState('');
    const [user_id, setUser_id] = useState(user[0]?.UserID);

    // danh sách danh mục
    const [topics, setTopics] = useState([]);

    // lấy danh sách danh mục khi load trang
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await AxiosInstance().get('/get-topics.php');
                setTopics(response.topics);
                setTopic_id(response.topics[0].TopicID);
            } catch (error) {
                console.log('Failed to fetch data: ', error);
            }
        }
        fetchData();
    }, []);

    // xử lý hình ảnh
    const [previewImage, setPreviewImage] = useState(null);
    const [imageInput, setImageInput] = useState('');

    // upload ảnh
    const handleImage = async (event) => {
        setImageInput(event.target.value);
        // hiển hình lên img
        setPreviewImage(URL.createObjectURL(event.target.files[0]));
        // upload ảnh lấy link
        const formData = new FormData();
        formData.append('image', event.target.files[0]);
        const result = await AxiosInstance('multipart/form-data')
            .post('/upload-file.php', formData);
        console.log(result);
    }

    // Lấy chi tiết tin tức

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await AxiosInstance().get(`/get-new-details.php?NewID=${NewID}`);
                console.log(response);
                setTitle(response.new.Title);
                setContent(response.new.Content);
                setPreviewImage(response.new.Banner);
                setBanner(response.new.Banner);
                setTopic_id(response.new.TopicID);

            } catch (error) {

            }
        }
        fetchData();
    }, []);

    const handleUpdate = async () => {
        if (title == '' || content == '' || banner == '') {

            swal({
                title: "Cập nhật thất bại !",
                text: "Xin vui lòng nhập đầy đủ thông tin !",
                icon: "error",
                button: "Ok !",


            });
            return;
        }

        console.log(title);
        console.log(content);
        console.log(banner);
        console.log(topic_id);
        console.log(user_id);

        swal({
            title: "Xác nhận cập nhật !",
            text: "Hãy bấm Update để cập nhật tin tức",
            icon: "info",
            buttons: ["Cancel", "Update !"],
        })
            .then(async (will) => {
                if (will) {

                    try {

                        const body = {
                            NewID: NewID,
                            Title: title,
                            Content: content,
                            Banner: banner,
                            TopicID: topic_id,
                            AuthorID: user_id
                        }

                        console.log(body);

                        const result = await AxiosInstance().post(`/update-news.php?NewID=${NewID}`, body);
                        console.log(result);
                        console.log(result.status);
                        if (result.status) {
                            swal({
                                title: "Bạn đã cập nhật tin tức thành công !",
                                text: "Bạn có muốn chuyển trang không? Hãy bấm OK để chuyển trang!",
                                icon: "info",
                                buttons: ["Cancel", "Ok!"],
                            })
                                .then((will) => {
                                    if (will) {
                                        setTimeout(() => {
                                            window.location.href = "/";
                                        }, 2000)
                                    } else {
                                    }
                                });
                        } else {
                            swal({
                                title: "Cập nhật tin tức thất bại !",
                                text: "Xin vui lòng thử lại !",
                                icon: "error",
                                button: "Ok !",
                            });
                        }
                    } catch (error) {
                        console.log("Unable to fetch data:" + error);
                        swal("Cập nhật tin tức không thành công !", "Xin vui lòng thử lại !", "error");
                    }
                } else {
                }
            });
    }

    const handleLogOut = () => {
        setUser(null);
    }


    return (
        <div id="wrapper">

            <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

                <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                    <div className="sidebar-brand-icon rotate-n-15">
                        <i className="fas fa-laugh-wink"></i>
                    </div>
                    <div className="sidebar-brand-text mx-3">FPL Admin <sup>2</sup></div>
                </a>

                <div className="sidebar-divider my-0">

                    <div className="sidebar-divider">

                        <div className="sidebar-heading">
                            Interface
                        </div>

                        <li className="nav-item">
                            <a className="nav-link collapsed" data-toggle="collapse" data-target="#collapseTwo"
                                aria-expanded="true" aria-controls="collapseTwo">
                                <span>Pages</span>
                            </a>
                            <div id="collapseTwo" className="collapse show" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                                <div className="bg-white py-2 collapse-inner rounded">
                                    <h6 className="collapse-header">Navigate to:</h6>
                                    <a className='collapse-item' href=' /news/add' >Thêm mới tin tức</a>
                                    <a className='collapse-item' href=' /topics/list' >Danh sách danh mục</a>
                                    <a className='collapse-item' href=' /user/infor' >Thông tin người dùng</a>
                                    <a className='collapse-item' href=' /' onClick={handleLogOut} >Đăng xuất</a>
                                </div>
                            </div>
                        </li>



                    </div>
                </div>
            </ul>

            <div className="sidebar-divider container-fluid" style={{ padding: 0 }}>



                <div id="content-wrapper" className="d-flex flex-column">

                    <div id="content">

                        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

                            <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                                <i className="fa fa-bars"></i>
                            </button>

                            <form
                                className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                                <div className="input-group">
                                    <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..."
                                        aria-label="Search" aria-describedby="basic-addon2" />
                                    <div className="input-group-append">
                                        <button className="btn btn-primary" type="button">
                                            <i className="fas fa-search fa-sm"></i>
                                        </button>
                                    </div>
                                </div>
                            </form>

                            <ul className="navbar-nav ml-auto">

                                <li className="nav-item dropdown no-arrow d-sm-none">
                                    <a className="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button"
                                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i className="fas fa-search fa-fw"></i>
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
                                        aria-labelledby="searchDropdown">
                                        <form className="form-inline mr-auto w-100 navbar-search">
                                            <div className="input-group">
                                                <input type="text" className="form-control bg-light border-0 small"
                                                    placeholder="Search for..." aria-label="Search"
                                                    aria-describedby="basic-addon2" />
                                                <div className="input-group-append">
                                                    <button className="btn btn-primary" type="button">
                                                        <i className="fas fa-search fa-sm"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </li>




                                <div className="topbar-divider d-none d-sm-block"></div>

                                <li className="nav-item dropdown no-arrow">
                                    <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
                                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <span className="mr-2 d-none d-lg-inline text-gray-600 small">{user[0].Name}</span>
                                        <img className="img-profile rounded-circle"
                                            src={`${previewImage}`} />
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                                        aria-labelledby="userDropdown">
                                        <a className="dropdown-item" href="#">
                                            <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                                            Profile
                                        </a>
                                        <a className="dropdown-item" href="#">
                                            <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                                            Settings
                                        </a>
                                        <a className="dropdown-item" href="#">
                                            <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                                            Activity Log
                                        </a>
                                        <div className="dropdown-divider"></div>
                                        <a className="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">
                                            <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                                            Logout
                                        </a>
                                    </div>
                                </li>

                            </ul>

                        </nav>

                        <div className="container-fluid">
                            <div className="List mx-5 mt-5 " id="page-top">

                                <form className=".conatiner mx-5 my-5 col-md-6 mx-auto">
                                    <h1 className='text-center mb-3'>Sửa tin tức</h1>
                                    <div className="mb-3 mt-3">
                                        <label className="form-label">Title:</label>
                                        <input value={title} onChange={(event) => setTitle(event.target.value)}
                                            type="text" className="form-control" placeholder="Title"
                                            name="title" />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Content:</label>
                                        <textarea value={content} onChange={(event) => setContent(event.target.value)}
                                            className="form-control" placeholder="Content"
                                            name="content" />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Image:</label>
                                        <input value={imageInput} onChange={handleImage}
                                            type="file" className="form-control" placeholder="Image"
                                            name="image" />
                                        <img src={`${previewImage}`} width="200" className="mt-3" />
                                    </div>

                                    <div className="mb-3">

                                        <label className="form-label" htmlFor="topic_id">Topic:</label>
                                        <select id="topic_id" value={topic_id} onChange={(event) => {
                                            setTopic_id(event.target.value);
                                        }}

                                            className="form-control" name="topic_id">
                                            {topics.map((topic, index) => (
                                                topic.TopicID === topic_id ?
                                                    <option selected key={index} value={topic.TopicID}>{topic.Name}</option>
                                                    : <option key={index} value={topic.TopicID}>{topic.Name}</option>
                                            ))}
                                        </select>

                                    </div>
                                    <a href='/' className="btn btn-danger">Cancel</a>
                                    <button type="button" onClick={() => { handleUpdate() }} className="btn btn-primary mx-2">Edit</button>
                                </form>

                            </div>

                        </div>

                    </div>

                    <footer className="sticky-footer bg-white">
                        <div className="container my-auto">
                            <div className="copyright text-center my-auto">
                                <span>Copyright &copy; Your Website 2020</span>
                            </div>
                        </div>
                    </footer>

                </div>

            </div>
        </div>
    )
}

export default Edit