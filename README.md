<br />
<div align="center">
    <img src="./.github/drivenpass.png" alt="DrivenPass Logo" width="150">
    <h3 align="center">DrivenPass</h3>
    <p> A Back-End Project
</div>

# About

Have you ever thought about saving all your passwords in one place and not worrying about memorizing them all? This application will help you with that. 
With DrivenPass we can save our credential data from websites, cards, wifi and even secure notes.


## Technologies
These are the main tools, frameworks and languages that were used in this project:<br>

<div>
  <img style='margin: 5px;' src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E"/>
  <img style='margin: 5px;' src="https://img.shields.io/badge/typescript-%233178C6.svg?&style=for-the-badge&logo=typescript&logoColor=white" />
  <img style='margin: 5px;' src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white"/>
  <img style='margin: 5px;' src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"/>
  <img style='margin: 5px;' src="https://img.shields.io/badge/postgresql-%23336791.svg?&style=for-the-badge&logo=postgresql&logoColor=white" />
  <img style='margin: 5px;' src="https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white"/>
  <img style='margin: 5px;' src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white"/>
  <img style='margin: 5px;' src="https://img.shields.io/badge/JWT-323330?style=for-the-badge&logo=json-web-tokens&logoColor=pink"/>
  <img style='margin: 5px;' src="https://img.shields.io/badge/joi-%23323330.svg?style=for-the-badge&color=990000"/>
</div>

## How to Run

You can use the api in two ways, cloning this repository or testing with our deploy running on Heroku

To clone the project, run the following command:

```git
git clone https://github.com/bruno-ruotolo/DrivenPass
```

Then, navigate to the project folder and run the following command:

```git
npm i
```

Finally, start the server:

```git
npm start
```

You can now access the API's endpoints locally, user the Prisma Migrations to create your database:

```git
npm prisma migrate dev
```

If you want to use the deployed API access: https://drivenpass-ruotolo.herokuapp.com

# API Reference

Here you can check the endpoints related to the project, as well as their respective characteristics. Have Fun 😄

## Routes
### Authentication Routes

- **Register**
    - POST _/sign-up_
    - Body   
     
```json
{
  "email": "user@myemail.com",
  "password": "mypassword"
}
```

- **Login**
     - POST _/_
    - Body

```json
{
  "email": "user@myemail.com",
  "password": "mypassword"
}
```

### Websites Credentials Routes

- **Create Credential**
    - POST _/credentials_
    - Body


```json
{
    "title":"My Title",
    "url":"https://www.myemail.com",
    "username":"user",
    "password": "mypassword"
}
```

