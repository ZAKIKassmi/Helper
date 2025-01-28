
# User Login and Signup Template Using Next.js 14 (App Router) and Lucia Auth

Full-stack web application for managing blood center operations, including donor scheduling, facility management, and
certification tracking. The system provides social privileges to donors based on their donation frequency and commitment using credits.
Additionally, it facilitates monetary donations to support the construction of new blood centers. Integrated user authentication and
notification systems to remind donors of upcoming appointments.




## Dependencies

Run the following command to install all the necessary dependencies:

```bash
  npm install
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

