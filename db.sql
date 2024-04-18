CREATE TABLE users(email VARCHAR(100), fullname VARCHAR(100), phone VARCHAR(20), password VARCHAR(255), PRIMARY KEY (email));

CREATE TABLE expense_category(category_id BIGINT, expense_name VARCHAR(255), PRIMARY KEY (category_id));

CREATE TABLE income(income_id INT AUTO_INCREMENT, date DATE, amount BIGINT, income_name VARCHAR(255), PRIMARY KEY(income_id), loggedin_user VARCHAR(100), FOREIGN KEY (loggedin_user) REFERENCES users(email));

CREATE TABLE expenses(expense_id INT AUTO_INCREMENT, date DATE, expense_category BIGINT,  amount BIGINT,  income_name_id INT, PRIMARY KEY (expense_id), FOREIGN KEY(income_name_id) REFERENCES income(income_id), FOREIGN KEY (expense_category) REFERENCES expense_category(category_id));

CREATE TABLE investment(investment_id INT AUTO_INCREMENT, date DATE, investment_name VARCHAR(255), amount BIGINT,  PRIMARY KEY (investment_id), income_name_id INT, FOREIGN KEY(income_name_id) REFERENCES income(income_id));