const https = require("https");
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const argon2 = require("argon2")
const session = require("express-session");
require('dotenv').config();
const { GoogleGenAI } = require("@google/genai");
const ai = new GoogleGenAI({apiKey: process.env.GOOGLE_AI_API_KEY});
const mysql = require('mysql2');
const con = mysql.createConnection ({
    host: "localhost",
    user: "resubuild",
    password: process.env.PW,
    database: "resuBuild"
});
con.connect((err) => {
    if (err) throw err;
    console.log("Connected to db");
})
const app = express();
app.set("view engine", "ejs");
app.set("views", __dirname);
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded());
app.use(express.json());
app.use(session({
    name: "login_session",
    secret: process.env.UTOKEN,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000 * 14,
        httpOnly: true,
        secure: true
    }
}));
const sslconfig = {
    key: fs.readFileSync(path.join(__dirname, "key.key")),
    cert: fs.readFileSync(path.join(__dirname, "cert.pem"))
}
app.get("/", (req, res) => {
    if (req.session.uid){
        res.redirect("/dashboard");
    }
    else{
        res.render("index");
    }
});
app.get("/signup", (req, res) => {
    if (req.session.uid){
        res.redirect("/dashboard");
    }
    else{
        res.render("signup");
    }
});
app.get("/signin", (req, res) => {
    if (req.session.uid){
        res.redirect("/dashboard");
    }
    else{
        res.render("signin");
    }
});
app.get("/dashboard", (req, res) => {
    if (req.session.uid){
        res.render("dashboard");
    }
    else{
        res.redirect("/");
    }
})

app.post("/signup", (req, res) => {
    async function prodHash() {
        const h = await argon2.hash(req.body.password)
        const query = `INSERT INTO accounts (username, email, password) VALUES ("${req.body.username}", "${req.body.email}", "${h}")`;
        con.query(query, (err, result) => {
            if (err){
                if (err.code === "ER_DUP_ENTRY"){
                    res.render("signup", {error: "You're already signed up!"});
                }
            }
            else{
                console.log("record added");
                req.session.uid = result["insertId"];
                res.redirect("/dashboard");
            }
        });
    }
    prodHash()
});
app.post("/signin", (req, res) => {
    const query = "SELECT id, email, password  FROM accounts";
    con.query(query, (err, result) => {
        if (err){
            res.render("signin", {error: err});
        }
        else{
            let bool;
            async function passCheck(){
                bool = await argon2.verify(result[0].password, req.body.password);
            }
            passCheck().then(() => {
                if (req.body.email === result[0].email && bool){
                    req.session.uid = result[0].id;
                    res.redirect("/dashboard");
                }
            })
        }
    });
});
app.post("/logout", (req, res) => {
    req.session.destroy((err) => {
        console.log(err)
    });
    res.clearCookie("connect.sid");
    res.redirect("/");
});
app.post("/createResume", (req, res) => {
    if (req.session.uid){
        console.log(req.body);
        async function main() {
            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents:
                `Generate elaborated content for a resume from the following JSON data. Name in the resume should be exactly ${req.body.name}. extraDetailsOrRequests has more information about the person. The data is:\n` + req.body,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: "OBJECT",
                        properties: {
                            name: {type: "STRING"},
                            profession: {type: "STRING"},
                            experienceLevel: {type: "STRING"},
                            summary: {type: "STRING"},
                            projectsOrSkills: {
                                type: "ARRAY",
                                items: {type: "STRING"}
                            },
                            industry: {type: "STRING"},
                            experience: {type: "STRING"}
                        },
                        propertyOrdering: ["name", "profession", "experienceLevel", "summary", "projectsOrSkills", "industry", "experience"]
                        },
                },
            });
            console.log(response.text);
            res.render("createResume", {data: JSON.parse(response.text)});
        }
        main();
    }
})
app.post("/genResume", (req, res) => {
    if (req.session.uid){
        const query = "INSERT INTO resumes (uid, resudata, name) VALUES (?, ?, ?)";
        con.query(query, [req.session.uid, JSON.stringify(req.body.resuData), req.body.name], (err, result) => {
            if(err){
                console.log(err);
            }
            else{
                res.json({code: "success"});
            }
        });
    }
});
app.post("/viewResu", (req, res) => {
    if (req.session.uid){
        const query = `SELECT name FROM resumes WHERE uid = ${req.session.uid}`;
        con.query(query, (err, result) => {
            if (err){
                console.log(err);
            }
            else{
                res.json(result);
            }
        });
    }
});
app.post("/openResu", (req, res) => {
    if (req.session.uid){
        const query = `SELECT resudata FROM resumes WHERE uid = ${req.session.uid} AND name = "${req.body.nameOfRes}"`;
        con.query(query, (err, result) => {
            if (err){
                console.log(err);
            }
            else{
                console.log(result[0]);
                res.render("openResume", {data: result[0].resudata, nameOfRes: req.body.nameOfRes})
            }
        });
    }
})

const server = https.createServer(sslconfig, app);
server.on('error', (error) => {
  console.error('Error:', error);
});
server.listen(3000, "localhost", () => {
    console.log("Server running at https://localhost:3000")
})
