-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 14, 2017 at 12:52 AM
-- Server version: 10.1.22-MariaDB
-- PHP Version: 7.1.4

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
  `phone` varchar(25) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(250) NOT NULL,
  `image` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `administratior`
--

INSERT INTO `administratior` (`id`, `name`, `role_id`, `phone`, `email`, `password`, `image`) VALUES
(1, 'Chani', 5, '0548450396', 'chani@gmail.com', '9f8680503b91fb5761db44dc59e427fe', 'C_1513208881.jpg'),
(2, 'Hadar', 7, '0548452232', 'HADARrr@gmail.com', '9f8680503b91fb5761db44dc59e427fe', 'C_1513207852.jpg'),
(5, 'Noa', 6, '025802232', 'noa@noacutie.com', '9f8680503b91fb5761db44dc59e427fe', 'C_1513208896.jpg'),
(13, 'Shlomi', 7, '0548450396', 'ffsdsfd@gmail.com', '9f8680503b91fb5761db44dc59e427fe', 'C_1513207829.jpg'),
(14, 'Shevi2', 6, '0548450396', 'Shevi@gmail.com', '9f8680503b91fb5761db44dc59e427fe', 'C_1513207709.jpg');

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
(4, 'illusetrator', 'בלה בלה בלה', '1513208974.jpg'),
(5, 'Photoshop cs6', 'This course is the culmination of the Graphic Ds into a single projectfor.\nplease work;l;', '1511640693.jpg'),
(6, 'Javascript', 'Learn the same technologies that enable Netflix and Airbnb to create powerful interactive web apps in the 8-week Build Front-End Apps program.', '1513209010.jpg'),
(8, 'HTML5', 'html2dsdas as', '1511889965.png'),
(11, 'Apple', 'Apple pen222n,.n', '1511636465.png');

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
  `phone` varchar(15) NOT NULL,
  `email` varchar(200) NOT NULL,
  `image` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`id`, `name`, `phone`, `email`, `image`) VALUES
(3, 'Shevi Avrahami', '0548456656', 'shevi@gmail.com', 'C_1513208685.jpg'),
(5, 'Noa 23', '0548452232', 'noa@gmail.com', 'C_1513208863.JPG'),
(8, 'Beni 22', '0586565654', 'beni@gmail.com', 'C_1513208789.jpg'),
(31, 'Ayala', '0548452232', 'ayala@gmail.com', 'C_1511890116.jpg'),
(33, 'hadar', '0548452232', 'hadar@gmail.com', 'C_1512725574.JPG');

-- --------------------------------------------------------

--
-- Table structure for table `student_course`
--

CREATE TABLE `student_course` (
  `s_id` int(11) NOT NULL,
  `c_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `student_course`
--

INSERT INTO `student_course` (`s_id`, `c_id`) VALUES
(3, 4),
(3, 6),
(3, 8),
(5, 5),
(5, 6),
(8, 4),
(8, 5),
(8, 6),
(31, 6),
(31, 8),
(31, 11),
(33, 6),
(33, 8);

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
-- Indexes for table `student_course`
--
ALTER TABLE `student_course`
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
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
--
-- AUTO_INCREMENT for table `course`
--
ALTER TABLE `course`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `student`
--
ALTER TABLE `student`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `administratior`
--
ALTER TABLE `administratior`
  ADD CONSTRAINT `Role_key` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`);

--
-- Constraints for table `student_course`
--
ALTER TABLE `student_course`
  ADD CONSTRAINT `Course_FK` FOREIGN KEY (`c_id`) REFERENCES `course` (`id`),
  ADD CONSTRAINT `Student_FK` FOREIGN KEY (`s_id`) REFERENCES `student` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
