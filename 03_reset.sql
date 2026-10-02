-- ========================================================
-- Database Reset Script
-- Clears all data while preserving the schema and tables
-- ========================================================

USE library;

SET FOREIGN_KEY_CHECKS = 0;

TRUNCATE TABLE loans;
TRUNCATE TABLE books;
TRUNCATE TABLE members;
TRUNCATE TABLE authors;
TRUNCATE TABLE categories;

SET FOREIGN_KEY_CHECKS = 1;