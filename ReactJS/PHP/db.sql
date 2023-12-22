CREATE DATABASE IF not EXISTS FPL_Admin;

USE FPL_Admin;

CREATE TABLE IF NOT EXISTS Topic (
    TopicID VARCHAR(5) NOT NULL,
    Name VARCHAR(255) NOT NULL,
    Description VARCHAR(255) NOT NULL,
    PRIMARY KEY (TopicID)
) Engine=InnoDB DEFAULT CHARSET=utf8;

CREATE Table if not exists Branch(
    BranchID VARCHAR(5) NOT NULL,
    Name VARCHAR(255) NOT NULL,
    Address VARCHAR(255) NOT NULL,
    PRIMARY KEY (BranchID)
)Engine=InnoDB DEFAULT CHARSET=utf8;

CREATE Table if not exists User(
    UserID VARCHAR(255) NOT NULL,
    Name VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL,
    Password VARCHAR(255) NOT NULL,
    BranchID VARCHAR(5) NOT NULL,
    Phone VARCHAR(11),
    Avatar VARCHAR(255),
    Role VARCHAR(20) NOT NULL,
    PRIMARY KEY (UserID),
    FOREIGN KEY (BranchID) REFERENCES Branch(BranchID)
)Engine=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE if NOT EXISTS password_reset(
    id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    email varchar(255) NOT NULL,
    token varchar(255) NOT NULL,
    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    available TINYINT(1) NOT NULL DEFAULT 1
)Engine=InnoDB DEFAULT CHARSET=utf8;

CREATE Table if not exists New(
    NewID VARCHAR(255) NOT NULL,
    Title VARCHAR(255) NOT NULL,
    Content VARCHAR(255) NOT NULL,
    Date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    UpdateAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP() on UPDATE CURRENT_TIMESTAMP(),
    UpdateBy VARCHAR(255),
    AuthorID VARCHAR(255) NOT NULL,
    Banner VARCHAR(255),
    TopicID VARCHAR(5) NOT NULL,
    PRIMARY KEY (NewID),
    FOREIGN KEY (TopicID) REFERENCES Topic(TopicID),
    FOREIGN KEY (AuthorID) REFERENCES User(UserID)
)Engine=InnoDB DEFAULT CHARSET=utf8;

CREATE table if not exists ScoreBoard(
    ScoreID VARCHAR(255) NOT NULL,
    Name VARCHAR(20) NOT NULL,
    Score INT NOT NULL,
    PRIMARY KEY (ScoreID)
)Engine=InnoDB DEFAULT CHARSET=utf8;

CREATE table if not exists Subject(
    SubjectID VARCHAR(25) NOT NULL,
    Name VARCHAR(20) NOT NULL,
    Code VARCHAR(10) NOT NULL,
    DATE DATE NOT null,
    TeacherID VARCHAR(255) NOT NULL,
    ScoreID VARCHAR(255) NOT NULL,
    PRIMARY KEY (SubjectID),
    FOREIGN KEY (TeacherID) REFERENCES User(UserID),
    FOREIGN KEY (ScoreID) REFERENCES ScoreBoard(ScoreID)
)

CREATE table if not exists Schedule(
    ScheduleID VARCHAR(25) NOT NULL,
    SubjectID VARCHAR(25) NOT NULL,
    Date DATE NOT NULL,
    Shift VARCHAR(10) NOT NULL,
    Room VARCHAR(10) NOT NULL,
    TeacherID VARCHAR(255) NOT NULL,
    StudentID VARCHAR(255) NOT NULL,
    PRIMARY KEY (ScheduleID),
    FOREIGN KEY (SubjectID) REFERENCES Subject(SubjectID),
    FOREIGN KEY (TeacherID) REFERENCES User(UserID),
    FOREIGN KEY (StudentID) REFERENCES User(UserID)
)Engine=InnoDB DEFAULT CHARSET=utf8;

CREATE table IF not exists Semester(
    SemesterID VARCHAR(255) NOT NULL,
    Semester VARCHAR(20) NOT NULL,
    Date DATE NOT NULL,
    SubjectID VARCHAR(25) NOT NULL,
    PRIMARY KEY (SemesterID),
    FOREIGN KEY (SubjectID) REFERENCES Subject(SubjectID)
)Engine=InnoDB DEFAULT CHARSET=utf8;

CREATE table if not exists TitleBoard(
    TitleID VARCHAR(5) NOT NULL,
    StudentID VARCHAR(255) NOT NULL,
    SemesterID VARCHAR(255) NOT NULL,
    PRIMARY KEY (TitleID),
    FOREIGN KEY (StudentID) REFERENCES User(UserID),
    FOREIGN KEY (SemesterID) REFERENCES Semester(SemesterID)
)Engine=InnoDB DEFAULT CHARSET=utf8;-- Active: 1699077353088@@127.0.0.1@3306@fpl_admin


--Thêm dữ liệu vào mảng Branch
Insert Into `branch` (`BranchID`, `Name`, `Address`) 
VALUES ('HCM','Hồ chí Minh','Số 1, Dĩ An, Thành Phố Hồ Chí Minh'),
('HN','Hà Nội','Số 1, Đại Cồ Việt, Hai Bà Trưng, Hà Nội'),
('DN','Đà Nẵng', 'Địa chỉ Đà Nẵng'),
('CT','Cần Thơ','Địa Chỉ Cần Thơ'),
('TN','Tây Nguyên','Địa chỉ Tây Nguyên')
;

--Thêm dữ liệu vào bảng Topic
INSERT INTO `topic`(`TopicID`, `Name`, `Description`)
VALUES ('ACT','Sự kiện','Nói về sự kiện'),
('ALT','Thông báo','Nói về thông báo'),
('FEE','Học phí','Nói về học phí sinh viên'),
('STU','Học vấn','Nói về chuyện học tập');

--Thêm dữ liệu vào mảng USER
INSERT INTO `user`(`UserID`, `Name`, `Email`, `Password`, `BranchID`, `Phone`, `Avatar`, `Role`)
VALUES ('PS25411','Nguyễn Văn A','vana@gmail.com', '123','HCM','0123456789','avatar1.jpg','student'),
('PS25412','Nguyễn Văn B','vanb@gmail.com', '123','HCM','0123456789','avatar2.jpg','student'),
('PS25413','Nguyễn Văn C','vanc@gmail.com', '123','HN','0123456789','avatar3.jpg','student'),
('PS25414','Nguyễn Văn D','vand@gmail.com,, '123'','HN','0123456789','avatar4.jpg','student'),
('PS25415','Nguyễn Văn E','vane@gmail.com', '123','DN','0123456789','avatar5.jpg','student'),
('PS25416','Nguyễn Văn F','vanf@gmail.com', '123','DN','0123456789','avatar6.jpg','student'),
('PS25417','Nguyễn Văn G','vang@gmail.com', '123','CT','0123456789','avatar7.jpg','student'),
('PS25418','Nguyễn Văn H','vanh@gmail.com', '123','CT','0123456789','avatar8.jpg','student'),
('PS25419','Nguyễn Văn I','vani@gmail.com', '123','TN','0123456789','avatar9.jpg','student'),
('PS25420','Nguyễn Văn J','vanj@gmail.com', '123','TN','0123456789','avatar10.jpg','student'),
('PS25421','Nguyễn Văn K','vank@gmail.com', '123','HCM','0123456789','avatar11.jpg','student'),
('PS25422','Nguyễn Văn L','vanl@gmail.com', '123','HCM','0123456789','avatar12.jpg','student'),
('PS25423','Nguyễn Văn M','vanm@gmail.com', '123','HN','0123456789','avatar13.jpg','teacher'),
('PS25424','Nguyễn Văn N','vann@gmail.com', '123','HN','0123456789','avatar14.jpg','teacher'),
('PS25425','Nguyễn Văn O','vano@gmail.com', '123','DN','0123456789','avatar15.jpg','teacher'),
('PS25426','Nguyễn Văn P','vanp@gmail.com', '123','DN','0123456789','avatar16.jpg','teacher'),
('PS25427','Nguyễn Văn Q','vanq@gmail.com', '123','CT','0123456789','avatar17.jpg','teacher'),
('PS25428','Nguyễn Văn R','vanr@gmail.com', '123','CT','0123456789','avatar18.jpg','teacher'),
('PS25429','Nguyễn Văn S','vans@gmail.com', '123','TN','0123456789','avatar19.jpg','teacher'),
('PS25430','Nguyễn Văn T','vant@gmail.com', '123','TN','0123456789','avatar20.jpg','teacher'),
('PS25431','Nguyễn Văn U','vanu@gmail.com', '123','HCM','0123456789','avatar21.jpg','teacher'),
('PS25432','Nguyễn Văn V','vanv@gmail.com', '123','HCM','0123456789','avatar22.jpg','teacher'),
('PS25433','Nguyễn Văn W','vanw@gmail.com', '123','HN','0123456789','avatar23.jpg','teacher'),
('PS25434','Nguyễn Văn X','vanx@gmail.com', '123','HN','0123456789','avatar24.jpg','teacher'),
('PS25435','Nguyễn Văn Y','vany@gmail.com', '123','DN','0123456789','avatar25.jpg','teacher'),
('PS25436','Nguyễn Văn Z','vanz@gmail.com', '123','DN','0123456789','avatar26.jpg','teacher');

--Thêm dữ liệu vào bảng New

Insert INTO `new` (`NewID`, `Title`, `Content`, `Date`, `Banner`, `TopicID`, `AuthorID`)
VALUES ('piacn','Tiêu đề tin 1','Nội dung tin 1', '23-10-23 00:00:00', 'Banner 1', 'cdf57', 'PS25414'),
('pcbrj','Tiêu đề tin 2','Nội dung tin 2','20-5-23 00:00:00','Banner 2', 'cdf58', 'PS25415'),
('pcbrk','Tiêu đề tin 3','Nội dung tin 3','11-5-23 00:00:00','Banner 3', 'cdf59', 'PS25416'),
('pcbrl','Tiêu đề tin 4','Nội dung tin 4','11-5-23 00:00:00','Banner 4', 'cdf60', 'PS25417'),
('pcbrm','Tiêu đề tin 5','Nội dung tin 5','11-5-23 00:00:00','Banner 5', 'cdf61', 'PS25418'),
('pcbrn','Tiêu đề tin 6','Nội dung tin 6','11-5-23 00:00:00','Banner 6', 'cdf62', 'PS25419'),
('pcbro','Tiêu đề tin 7','Nội dung tin 7','11-5-23 00:00:00','Banner 7', 'cdf63', 'PS25420'),
('pcbrp','Tiêu đề tin 8','Nội dung tin 8','11-5-23 00:00:00','Banner 8', 'cdf56', 'PS25421'),
('pcbrq','Tiêu đề tin 9','Nội dung tin 9','11-5-23 00:00:00','Banner 9', 'cdf57', 'PS25422'),
('pcbrr','Tiêu đề tin 10','Nội dung tin 10','11-5-23 00:00:00','Banner 10', 'cdf58', 'PS25423'),
('pcbrs','Tiêu đề tin 11','Nội dung tin 11','11-5-23 00:00:00','Banner 11', 'cdf59', 'PS25424'),
('pcbrt','Tiêu đề tin 12','Nội dung tin 12','11-5-23 00:00:00','Banner 12', 'cdf60', 'PS25425'),
('pcbru','Tiêu đề tin 13','Nội dung tin 13','11-5-23 00:00:00','Banner 13', 'cdf61', 'PS25426'),
('pcbrv','Tiêu đề tin 14','Nội dung tin 14','11-5-23 00:00:00','Banner 14', 'cdf62', 'PS25427'),
('pcbrw','Tiêu đề tin 15','Nội dung tin 15','11-5-23 00:00:00','Banner 15', 'cdf63', 'PS25428'),
('pcbrx','Tiêu đề tin 16','Nội dung tin 16','11-5-23 00:00:00','Banner 16', 'cdf56', 'PS25429'),
('pcbry','Tiêu đề tin 17','Nội dung tin 17','11-5-23 00:00:00','Banner 17', 'cdf57', 'PS25430'),
('pcbrz','Tiêu đề tin 18','Nội dung tin 18','11-5-23 00:00:00','Banner 18', 'cdf58', 'PS25431'),
('pcbr1','Tiêu đề tin 19','Nội dung tin 19','11-5-23 00:00:00','Banner 19', 'cdf59', 'PS25432'),
('pcbr2','Tiêu đề tin 20','Nội dung tin 20','11-5-23 00:00:00','Banner 20', 'cdf60', 'PS25433');


--Thêm dữ liệu vào bảng 