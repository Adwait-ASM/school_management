-- School Management System Database Initialization
-- Run this script to set up the database and table

-- Create database (if it doesn't exist)
CREATE DATABASE IF NOT EXISTS school_management;

-- Use the database
USE school_management;

-- Create schools table
CREATE TABLE IF NOT EXISTS schools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  contact BIGINT NOT NULL,
  image TEXT,
  email_id TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample data (optional)
INSERT INTO schools (name, address, city, state, contact, email_id) VALUES
('Springfield Elementary School', '123 Main Street, Springfield District', 'Springfield', 'Illinois', 5551234567, 'info@springfield-elementary.edu'),
('Riverside High School', '456 River Road, Downtown Area', 'Riverside', 'California', 5552345678, 'contact@riverside-high.edu'),
('Greenwood Academy', '789 Oak Avenue, Greenwood Neighborhood', 'Greenwood', 'Texas', 5553456789, 'admin@greenwood-academy.edu');

-- Show the created table structure
DESCRIBE schools;

-- Show sample data
SELECT * FROM schools;
