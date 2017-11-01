-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 30, 2017 at 02:27 PM
-- Server version: 10.1.25-MariaDB
-- PHP Version: 7.1.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `school`
--

-- --------------------------------------------------------

--
-- Table structure for table `administratior`
--

CREATE TABLE `administratior` (
  `id` int(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `role_id` int(11) NOT NULL,
  `phone` int(25) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `administratior`
--

INSERT INTO `administratior` (`id`, `name`, `role_id`, `phone`, `email`, `password`) VALUES
(1, 'Chani', 5, 548450396, 'click0548450396@gmail.com', '12345678'),
(2, 'Hadar', 6, 548452232, 'chani2580@gmail.com', '1234'),
(3, 'Tzvika', 6, 28506642, 'galgal2000@gmail.com', '1234');

-- --------------------------------------------------------

--
-- Table structure for table `course`
--

CREATE TABLE `course` (
  `id` int(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` varchar(400) NOT NULL,
  `image` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `course`
--

INSERT INTO `course` (`id`, `name`, `description`, `image`) VALUES
(4, 'illusetrator', 'illustrator is the culmination of the Graphic Ds into a single projectfor.', 'ilustrator.jpg'),
(5, 'Photoshop', 'This course is the culmination of the Graphic Ds into a single projectfor.', 'photoshop.jpg'),
(6, 'Javascript', 'Learn the same technologies that enable Netflix and Airbnb to create powerful interactive web apps in the 8-week Build Front-End Apps program.', 'javascript.jpg'),
(7, 'HTML5', 'HTML5 is one of the hot web technologies and is widely gaining acceptance across mobile and web.', 'html5.png');

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `id` int(11) NOT NULL,
  `role` varchar(50) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`id`, `role`) VALUES
(5, 'owner'),
(6, 'manager'),
(7, 'sales');

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `id` int(20) NOT NULL,
  `name` varchar(50) NOT NULL,
  `phone` int(15) NOT NULL,
  `email` varchar(200) NOT NULL,
  `image` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`id`, `name`, `phone`, `email`, `image`) VALUES
(3, 'Shevi', 548456656, 'shevi@gmail.com', 'shevi.jpg'),
(4, 'Beni', 585454544, 'beni@gmail.com', 'beni.jpg'),
(5, 'Ayala', 25802232, 'ayala@gmail.com', 'ayala.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `student-course`
--

CREATE TABLE `student-course` (
  `s_id` int(11) NOT NULL,
  `c_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `student-course`
--

INSERT INTO `student-course` (`s_id`, `c_id`) VALUES
(5, 4),
(5, 5);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `administratior`
--
ALTER TABLE `administratior`
  ADD PRIMARY KEY (`id`),
  ADD KEY `role` (`role_id`);

--
-- Indexes for table `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id` (`id`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id` (`id`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id` (`id`);

--
-- Indexes for table `student-course`
--
ALTER TABLE `student-course`
  ADD PRIMARY KEY (`s_id`,`c_id`),
  ADD KEY `s_id` (`s_id`),
  ADD KEY `c_id` (`c_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `administratior`
--
ALTER TABLE `administratior`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `course`
--
ALTER TABLE `course`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `student`
--
ALTER TABLE `student`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `administratior`
--
ALTER TABLE `administratior`
  ADD CONSTRAINT `Role_key` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`);

--
-- Constraints for table `student-course`
--
ALTER TABLE `student-course`
  ADD CONSTRAINT `Course_FK` FOREIGN KEY (`c_id`) REFERENCES `course` (`id`),
  ADD CONSTRAINT `Student_FK` FOREIGN KEY (`s_id`) REFERENCES `student` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
