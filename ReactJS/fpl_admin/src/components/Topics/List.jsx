import React, { useState, useEffect } from "react";
import AxiosInstance from "../helpers/AxiosInstance";
import { Navigate, useNavigate, useHref } from 'react-router-dom';
import swal from "sweetalert";

const List = (props) => {

    const { user, setUser } = props;
    const [previewImage, setPreviewImage] = useState(user[0]?.Avatar);
    const navigate = useNavigate();

    if (!user) {
        navigate('/');
    }

    const [topics, setTopics] = useState([]);

    useEffect(() => {
        const getTopics = async () => {
            try {
                const response = await AxiosInstance().get('/get-topics.php');
                setTopics(response.topics);
                console.log(response);
            } catch (error) {
                console.log("Fail to get topic because of: " + error);
            }
        }
        getTopics();
    }, []);

    const handleLogOut = () => {
        setUser(null);
    }
    

    const handleDelete = async (TopicID) => {
        const news = await AxiosInstance().get(`/get-news-topic.php?topic_id=${TopicID}`);
        if (!news) {
            swal({
                title: "Bạn có chắc chắn muốn xóa?",
                text: "Sau khi xóa bạn sẽ không thể khôi phục lại dữ liệu!",
                icon: "warning",
                buttons: ["Hủy", "Xóa"],
                dangerMode: true,
            }).then(async (willDelete) => {
                if (willDelete) {
                    try {
                        console.log(TopicID);
                        const response = await AxiosInstance().post(`/delete-topics.php?TopicID=${TopicID}`);
                        console.log(response);
                        if (response.status) {
                            swal("Xóa thành công!", {
                                icon: "success",
                            });
                            setTopics(topics.filter(item => item.TopicID !== TopicID));
                        } else {
                            swal("Xóa thất bại!", {
                                icon: "error",
                            });

                        }
                    } catch (error) {
                        console.log("Fail to delete topics because of: " + error);

                    }
                }
            });
        } else {
            swal("Xóa thất bại!", {
                text: "Danh mục này đang được sử dụng",
                icon: "error",
            });
        }
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
                                    <a className='collapse-item' href=' /topics/add' >Thêm mới danh mục</a>
                                    <a className='collapse-item' href=' /news/list' >Danh sách tin tức</a>
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
                                <div className=' .container'>
                                    <h1 className='text-center mb-3' style={{ color: "black" }}>Danh sách danh mục</h1>
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Id</th>
                                                <th>Name</th>
                                                <th>Descripyion</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                topics.map(item => {
                                                    return (
                                                        <tr key={item.TopicID}>
                                                            <td>{item.TopicID}</td>
                                                            <td>{item.Name}</td>
                                                            <td>{item.Description}</td>
                                                            <td>
                                                                <a href={`/topics/edit/${item.TopicID}`} className='btn btn-primary'>Edit</a>
                                                                <button onClick={() => handleDelete(item.TopicID)} className="btn btn-danger mx-3">Delete</button>
                                                            </td>
                                                        </tr>
                                                    );
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
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
    );
};
export default List;