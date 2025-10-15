# Resume-builder
Resume builder for a tech event

replace the environment variables with your own:
1. password for mysql database
2. googli ai studio api key
3. user token for session in express js

Generate and self sign key.key and cert.pem files for ssl encryption using openssl

Note for competent devs: We messed up time management so the codes pretty dirty and messy and the website could've been way better. Don't judge us for this lol.
Reuse this code at your own risk.

Mysql db setup instructions:
1. Make sure mysql is installed and the server is running on your computer
2. login as root with mysql -u root -p and enter password
3. create db with ```CREATE DATABASE database_name;```
4. create user with ```CREATE USER resubuild@localhost IDENTIFIED BY 'password';```(this is the password which has to kept in .env)
5. grant priveleges to user with  ```GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, REFERENCES, ALTER ON resuBuild.* TO`resubuild@localhost```
6. log out and login as the new user
7. ```USE resuBuild;```
8. ```CREATE TABLE accounts (id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(20) NOT NULL UNIQUE, email VARCHAR(30) NOT NULL UNIQUE, password VARCHAR(97) NOT NULL);```
9. ```CREATE TABLE resumes (resumeID INT AUTO_INCREMENT PRIMARY KEY, resudata MEDIUMTEXT, name VARCHAR(30), FOREIGN KEY (uid) REFERENCES accounts(id));```

It's possible that I missed something here.
In case something doesn't work, contact me so I can explain the full setup procedure.
