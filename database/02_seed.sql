-- ========================================================
-- Library Database Seeding Data
-- Database: library
-- Compatibility: MySQL / MariaDB
-- ========================================================

USE `library`;

SET FOREIGN_KEY_CHECKS = 0;

-- Optional: ensure tables are clean before seeding
TRUNCATE TABLE `loans`;
TRUNCATE TABLE `books`;
TRUNCATE TABLE `members`;
TRUNCATE TABLE `categories`;
TRUNCATE TABLE `authors`;

SET FOREIGN_KEY_CHECKS = 1;

START TRANSACTION;

-- --------------------------------------------------------
-- Seeding data for table `authors`
-- --------------------------------------------------------
INSERT INTO `authors` (`id`, `first_name`, `last_name`, `nationality`) VALUES
(1, 'George', 'Orwell', 'British'),
(2, 'Robert', 'Martin', 'American'),
(3, 'J.K.', 'Rowling', 'British'),
(4, 'Yuval Noah', 'Harari', 'Israeli');

-- --------------------------------------------------------
-- Seeding data for table `categories`
-- --------------------------------------------------------
INSERT INTO `categories` (`id`, `name`, `description`) VALUES
(1, 'Science Fiction', 'Books about futuristic science and technology'),
(2, 'Programming', 'Books about software development and programming'),
(3, 'History', 'Books about historical events and civilizations'),
(4, 'Fantasy', 'Books about magic and imaginary worlds');

-- --------------------------------------------------------
-- Seeding data for table `members`
-- --------------------------------------------------------
INSERT INTO `members` (`id`, `first_name`, `last_name`, `email`, `registration_date`) VALUES
(1, 'Ahmed', 'Ben Ali', 'ahmed@example.com', '2026-01-15'),
(2, 'Sara', 'Trabelsi', 'sara@example.com', '2026-02-10'),
(3, 'Youssef', 'Mansour', 'youssef@example.com', '2026-03-05');

-- --------------------------------------------------------
-- Seeding data for table `books`
-- --------------------------------------------------------
INSERT INTO `books` (`id`, `title`, `isbn`, `publication_year`, `available`, `category_id`, `author_id`) VALUES
(1, '1984', '9780451524935', 1949, 1, 3, 1),
(2, 'Clean Code', '9780132350884', 2008, 1, 2, 2),
(3, 'Harry Potter and the Philosopher\'s Stone', '9780747532699', 1997, 1, 4, 3),
(4, 'Sapiens', '9780062316097', 2011, 1, 3, 4);

-- --------------------------------------------------------
-- Seeding data for table `loans`
-- --------------------------------------------------------
INSERT INTO `loans` (`id`, `member_id`, `book_id`, `loan_date`, `return_date`) VALUES
(1, 1, 1, '2026-09-01', '2026-09-10'),
(2, 2, 2, '2026-09-05', NULL),
(3, 3, 3, '2026-09-10', '2026-09-18');

COMMIT;