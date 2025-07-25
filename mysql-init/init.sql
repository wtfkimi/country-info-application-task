CREATE USER IF NOT EXISTS 'country_user'@'%' IDENTIFIED WITH mysql_native_password BY 'country_password';
GRANT ALL PRIVILEGES ON *.* TO 'country_user'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;
CREATE DATABASE IF NOT EXISTS country_info_app;