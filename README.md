
# User Login and Signup Template Using Next.js 14 and Lucia Auth

I have created a template for user login and signup either by their email and passwords or OAuth 2.0 using Lucia Auth for Authentication, Zod for schema declaration and validation, Drizzle ORM, and Postgresql.




## Dependencies

You will need to i the following dependencies:

```bash
  npx create-next-app@latest
  npx shadcn-ui@latest init
  npm i lucia
  npm i @lucia-auth/adapter-drizzle
  npm i postgres
  npm i dotenv
  npm i sonner
  npm i zod
  npm i drizzle-orm
  npm i drizzle-kit
  npm i arctic
  npm i react-hook-form
  npm i @hookform/resolvers
  npm i oslo
  npm i zxcvbn
```
Developer dependencies:

```bash
  npm i @types/nodemailer
  npm i @types/pg
  npm i @types/ zxcvbn
```
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file. 

`DATABASE_URL`

`GITHUB_CLIENT_ID`

`GITHUB_CLIENT_SECRET`

`GOOGLE_CLIENT_ID`

`GOOGLE_CLIENT_SECRET`

`EMAIL` 

`EMAIL_PASSWORD` 

`HOST_NAME`



## Documentation

[Lucia Auth](https://lucia-auth.com/)                     
[Drizzle ORM](https://orm.drizzle.team/)  
[Zod](https://zod.dev/)   
[nodemailer](https://nodemailer.com/)  
[Next.js](https://nextjs.org/)

## FAQ

#### What value should I assign to the "EMAIL" environment variable?

It is your foundation, company, or personal email address that you will use to send email verification codes and password reset links to your users.


#### What value should I assing to the 'EMAIL_PASSWORD' environment variable?

If the email account you plan to use does not have 2-step verification, you should use the email password directly.

If the email account has 2-step verification enabled, you will need to generate an app-specific password:

  - Go to **Manage your Google Account.**
  - Navigate **to Security and then App passwords.**
  - Select **Create an app password.**
  - Follow the prompts to **generate a new app password.**
  - Add the generated app password to your **.env** file.


## Author

- [@ElKassmiZakariae](https://github.com/ZAKIKassmi)

