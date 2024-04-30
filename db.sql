CREATE TABLE users(user_id INT AUTO_INCREMENT, email VARCHAR(100), fullname VARCHAR(100), phone VARCHAR(20), password VARCHAR(255), PRIMARY KEY (email));

CREATE TABLE expense_category(category_id BIGINT, expense_name VARCHAR(255), PRIMARY KEY (category_id));

CREATE TABLE income(income_id INT, date DATE, amount BIGINT, income_name VARCHAR(255), PRIMARY KEY(income_name), loggedin_user INT, FOREIGN KEY (loggedin_user) REFERENCES users(user_id));

CREATE TABLE expenses(expense_id INT, date DATE, expense_name VARCHAR(255),  expense_amount BIGINT,  income_source VARCHAR(255), PRIMARY KEY (expense_name), FOREIGN KEY(income_source) REFERENCES income(income_name));

CREATE TABLE investment(investment_id INT AUTO_INCREMENT, date DATE, investment_name VARCHAR(255), amount BIGINT,  PRIMARY KEY (investment_id), income_name_id INT, FOREIGN KEY(income_name_id) REFERENCES income(income_id));