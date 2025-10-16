# Resume-builder
Resume builder for a hackathon

#Instructions for running the project:

Make sure you have node js installed from https://nodejs.org/en/download
run ```npm install``` in the folder directory to install necessary packages

# Google ai studio api
if you face any problem with the api key written in the .env, generate your own api from google ai studio and replace the current one with that in .env file. 

# download mysql
download it from https://dev.mysql.com/downloads/mysql/8.0.html to make the database work

# Mysql db setup instructions:
1. Make sure mysql is installed and the server is running on your computer
2. login as root with mysql -u root -p and enter password
3. create db with ```CREATE DATABASE resuBuild;```
4. create user with ```CREATE USER resubuild@localhost IDENTIFIED BY 'resubuild@17';``` (resubuild@17 is the password kept in .env)
5. grant priveleges to user with  ```GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, REFERENCES, ALTER ON resuBuild.* TO`resubuild@localhost;```
6. log out and login as the new user with ```exit``` and ```mysql -u resubuild -p``` and enter the password you put.
7. ```USE resuBuild;```
8. ```CREATE TABLE accounts (id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(20) NOT NULL UNIQUE, email VARCHAR(30) NOT NULL UNIQUE, password VARCHAR(97) NOT NULL);```
9. ```CREATE TABLE resumes (resumeID INT AUTO_INCREMENT PRIMARY KEY, resudata MEDIUMTEXT, name VARCHAR(30), FOREIGN KEY (uid) REFERENCES accounts(id));```

run the project with ```node index.js``` when you're in the folders directory
website runs at https://localhost:3000
When you run the website, you may be stopped with prompts saying the website is unsafe or dangerous but go to advanced options and visit the website anyway
The warnings are given as the SSL files are self signed and not signed by an official CA.

# SSL files
ssl files are already uploaded in this repo
If you want you can generate and self sign key.key and cert.pem files yourself using openssl
```openssl req -x509 -newkey rsa:4096 -keyout key.key -out cert.pem -sha256 -days 30 -nodes```
feel free to change the options


It's possible that I missed something here.
In case something doesn't work, contact me so I can explain the full setup procedure.

Note for competent devs: We messed up time management so the codes pretty dirty and messy and the website could've been way better. Don't judge us for this lol.
Reuse this code at your own risk.
