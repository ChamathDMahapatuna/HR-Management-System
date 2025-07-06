-- Insert Departments


-- Insert Employees
INSERT INTO employees (first_name, last_name, email, phone, hire_date, salary, department_id, role_id)
VALUES ('Alice', 'Smith', 'alice@example.com', '1234567890', '2024-07-01', 60000, 1, 1);

INSERT INTO departments (name, description) VALUES ('Engineering', 'Engineering Department');
INSERT INTO departments (name, description) VALUES ('HR', 'Human Resources');

-- Insert Roles
INSERT INTO roles (title, description) VALUES ('Developer', 'Writes code');
INSERT INTO roles (title, description) VALUES ('Manager', 'Manages team');