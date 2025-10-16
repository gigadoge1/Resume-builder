# Resume-builder
Resume builder for a hackathon

#Instructions for running the project:

# Install node.js:
1. Go to the [Node.js official website](https://nodejs.org/).
2. Download the **LTS version**.
3. Install Node.js using the installer.
4. Verify installation by opening a terminal/command prompt and running:
   ```bash
   node -v
   npm -v

# Clone this github repo:
    git clone https://github.com/gigadoge1/Resume-builder.git

# Google AI studio api
Generate an api key from google ai studio api and put that key after ```GOOGLE_AI_API_KEY=``` in the .env file

# Download MySQL
download it from [mysql's website](https://dev.mysql.com/downloads/mysql/) to make the database work.

# Start the MySQL server
1. For windows:
  ```net start MySQL```
  you can stop it with ```net stop MySQL``` when you're done using mysql.
2. For mac:
  Use System Preferences → MySQL, or run `sudo /usr/local/mysql/support-files/mysql.server start`
3. For Linux:
  Run `sudo systemctl start mysql` (or `sudo service mysql start` on older distros)

# Mysql db setup instructions:
1. Make sure mysql is installed and the server is running on your computer and run the commands as follows:
2. login as root with ```mysql -u root -p```, hit enter and enter password. **Note**: it might look like you're not typing anything but it just doesn't show it to you to hide the password.
3. create db with ```CREATE DATABASE resuBuild;```
4. create user with ```CREATE USER resubuild@localhost IDENTIFIED BY 'resubuild@17';``` (resubuild@17 is the password kept in .env)
5. grant priveleges to user with  ```GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, REFERENCES, ALTER ON resuBuild.* TO`resubuild@localhost;```
6. log out and login as the new user with ```exit``` and ```mysql -u resubuild -p```, hit enter and enter the password resubuild@17.
7. ```USE resuBuild;```
8. ```CREATE TABLE accounts (id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(20) NOT NULL UNIQUE, email VARCHAR(30) NOT NULL UNIQUE, password VARCHAR(97) NOT NULL);```
9. ```CREATE TABLE resumes (resumeID INT AUTO_INCREMENT PRIMARY KEY, resudata MEDIUMTEXT, name VARCHAR(30), FOREIGN KEY (uid) REFERENCES accounts(id));```

Go to the cloned folder directory and run ```npm install``` to install the necesary packages.
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
