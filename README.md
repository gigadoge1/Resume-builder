# Resume-builder
Resume builder for a hackathon

Make sure you have node js installed
run ```npm install``` in the folder directory to install necessary packages

replace the environment variables with your own:
1. password for mysql (password that your mysql user uses)
2. google ai studio api key
3. user token for session in express js (you could type a random combination of letters for this to test it)

the variables should be name like the following:
1. PW (password for mysql user which you’ll use)
2. GOOGLE_AI_API_KEY (get it from google ai studio’s api)
3. UTOKEN (user token for express js session just type in random stuff)

Generate and self sign key.key and cert.pem files for ssl encryption using openssl
```openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -sha256 -days 30 -nodes```
feel free to change the options

Note for competent devs: We messed up time management so the codes pretty dirty and messy and the website could've been way better. Don't judge us for this lol.
Reuse this code at your own risk.

Mysql db setup instructions:
1. Make sure mysql is installed and the server is running on your computer
2. login as root with mysql -u root -p and enter password
3. create db with ```CREATE DATABASE database_name;```
4. create user with ```CREATE USER resubuild@localhost IDENTIFIED BY 'password';```(this is the password which has to kept in .env)
5. grant priveleges to user with  ```GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, REFERENCES, ALTER ON resuBuild.* TO`resubuild@localhost;```
6. log out and login as the new user with ```exit``` and ```mysql -u resubuild -p``` and enter the password you put.
7. ```USE resuBuild;```
8. ```CREATE TABLE accounts (id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(20) NOT NULL UNIQUE, email VARCHAR(30) NOT NULL UNIQUE, password VARCHAR(97) NOT NULL);```
9. ```CREATE TABLE resumes (resumeID INT AUTO_INCREMENT PRIMARY KEY, resudata MEDIUMTEXT, name VARCHAR(30), FOREIGN KEY (uid) REFERENCES accounts(id));```

run the project with node index.js when you're in the folders directory

It's possible that I missed something here.
In case something doesn't work, contact me so I can explain the full setup procedure.
