-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 28, 2021 at 07:32 PM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 7.3.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mini_project_submission`
--

-- --------------------------------------------------------

--
-- Table structure for table `project`
--

CREATE TABLE `project` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `technology` text DEFAULT NULL,
  `staff_id` int(11) DEFAULT NULL,
  `team_lead_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `project`
--

INSERT INTO `project` (`id`, `name`, `status`, `description`, `technology`, `staff_id`, `team_lead_id`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'School Management', 'Pending for Approval', 'About the school management', 'IOT', 2, 3, '2021-02-27 18:27:01', '2021-02-27 18:27:01', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `project_user`
--

CREATE TABLE `team_user` (
  `id` int(11) NOT NULL,
  `team_lead_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `team_user`
--

INSERT INTO `team_user` (`id`, `team_lead_id`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 3, 3, '2021-02-27 19:15:34', '2021-02-27 19:15:34', NULL);

INSERT INTO `team_user` (`id`, `team_lead_id`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES
(2, 3, 4, '2021-02-27 19:15:34', '2021-02-27 19:15:34', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) CHARACTER SET latin1 DEFAULT NULL,
  `email` varchar(50) CHARACTER SET latin1 DEFAULT NULL,
  `password` varchar(150) DEFAULT NULL,
  `role` tinyint(1) DEFAULT NULL,
  `session_id` varchar(50) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `first_name`, `last_name`, `email`, `password`, `role`, `session_id`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Admin', 'HOD', 'admin@gmail.com', '5f4dcc3b5aa765d61d8327deb882cf99', 1, '1614447851562', '2021-02-27 17:44:11', '2021-02-27 17:44:11', NULL),
(2, 'Staff', 'Ravi', 'staff@gmail.com', '5f4dcc3b5aa765d61d8327deb882cf99', 2, '1614447899417', '2021-02-27 17:44:59', '2021-02-27 17:44:59', NULL),
(3, 'Anand', 'Varma', 'anand@gmail.com', '5f4dcc3b5aa765d61d8327deb882cf99', 3, '1614447899417', '2021-02-27 17:44:59', '2021-02-27 17:44:59', NULL),
(4, 'Sonam', 'Ravi', 'sonam@gmail.com', '5f4dcc3b5aa765d61d8327deb882cf99', 4, '1614447899417', '2021-02-27 17:44:59', '2021-02-27 17:44:59', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `project`
--
ALTER TABLE `project`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `team_user`
--
ALTER TABLE `team_user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email_2` (`email`),
  ADD KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `project`
--
ALTER TABLE `project`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `team_user`
--
ALTER TABLE `team_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
