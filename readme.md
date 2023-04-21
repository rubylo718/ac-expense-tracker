# Expense-tracker 
![](/public/photo/expensetrackerphoto.png)

## Introduction
Expense-tracker 是一個簡單的網頁記帳本。使用者可以註冊、登入，並記錄自己的日常開銷。除了檢視開銷總金額，亦可檢視不同類型的開銷統計。

這是一個 MVC 架構的全端開發作品。使用 Node.js 與 Express 框架，與 MongoDB 資料庫連線，打造 RESTful 路由系統。使用 Bootstrap 框架與 Handlebars 樣版引擎開發畫面。原先此專案部署於 Heroku 上，後續亦嘗試將此專案 Docker 容器化與並部署於 AWS-EC2。

歡迎閱讀[專案介紹文章](https://rubylo718.github.io/2022/07/20/AC-3-expenseTracker/)，以及我在 [Docker 與 AWS 的探索過程](https://rubylo718.github.io/2022/11/29/DockerAWS/) 😄 

## Features

- User can register an account and login with name and password.
- User can only see her/his own expense records.
- User can see the total amount of all the expenses.
- User can add, edit, delete the record.
- User can filter the expense records and see the total amount of the filtered records of a certain category.

## Getting Started
This project is Live on Heroku: https://peaceful-brook-83746.herokuapp.com/users/login

## Use Expense-tracker Locally
### Clone Repo
```
$ git clone https://github.com/rubylo718/ac-expense-tracker.git 
```
### Install Dependencies
```
$ cd ac-expense-tracker
$ npm install
```
### Add `.env` file
```
PORT=3000
MONDODB_URI=<Your MongoDB URI>
SESSION_SECRET=<Your Session Secret>
```

### Import Seed Data
With nodemon:
```
npm run seed 
```
Without nodemon:
```
node models/seeds/categorySeeder.js && node models/seeds/recordSeeder.js
```

### Run the App
With nodemon:
```
npm run dev // with nodemon
```

Without nodemon:
```
node app.js
```
## Built with

- Runtime Environment: Node.js @16.14.2
- Framework: Express @4.18.1
- Database: Mongoose @6.4.0
- View Engine: Express-handlebars @4.0.2
- Environment Variables Management: dotenv @16.0.1

## Author

Ruby Lo

## Main Updates
- 2023.04.21 - Bugs fixed.
- 2022.11.29 - Add Dockerfile for Docker packaging. Correct typo.
- 2022.06.26 - First Release (as a key assignment of ALPHA Camp Term 3 week 2).
