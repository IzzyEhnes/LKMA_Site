# Lee's Korean Martial Arts Website
California State University, Sacramento Computer Science Senior Project

## Contributors
- Juan Ambriz
- Giovanni Barrientos
- Carter Bryant
- Izzy Ehnes
- Noah Fields
- Steve Sclafani
- Justin Vierstra

<p align="center">
  <img src="https://github.com/IzzyEhnes/LKMA_Site/blob/73b6f0c7e88c4fd427f0388acd6463e2cc6a3b7f/public/img/logo.png">
</p>

##
Lee's Korean Martial Arts wants us to create a website that show what services they offer, their location and current schedule, and what values they have.  Additionally, the website should offer users the ability to sign-up for an account in order to download assignments and upload completed assignments.
##

## Project Timeline
In the first semester (Spring 2022), we focused on building some of the Front-End Pages & Navbar:
- Home Page
- About Page
- FAQ Page
- Programs Page

In the second semester (Fall 2022), we finished the following front-end components:
- Create Contact/Location Page
- Create Calendar Page using Google Calendar API
- Create Gallery Page
- Create Profile Page

Then we moved on to focus on back-end implementation for sign-up, log-in, and profiles
- Build Database to store emails & hashed passwords, in addition to other information
- Work to integrate Database with Front-End Pages
- Functionality for users to upload files

## Pictures
Here is a glance at some of the pages we have created:

Navbar:
![Navbar](https://user-images.githubusercontent.com/72421134/205546397-1ec547df-8ec5-4714-b0e0-7f3bbbf73790.png)
Part of Home Page:
![Part of Home Page](https://user-images.githubusercontent.com/72421134/205546493-69ebb8f0-0cce-492d-a455-09618dba7b03.png)
Part of About Page:
![Part of About Page](https://user-images.githubusercontent.com/72421134/205546895-5195b2a0-857b-44a7-90ba-d20f0d698113.png)
Part of FAQ Page:
![Part of FAQ Page](https://user-images.githubusercontent.com/72421134/205546989-06d760ff-914d-45f0-997a-6472e774f29b.png)
Part of Programs Page:
![Part of Programs Page](https://user-images.githubusercontent.com/72421134/205547040-b033b2a0-4584-4a7b-992e-eab938f3f223.png)
Gallery Page:
![Gallery Page](https://user-images.githubusercontent.com/72421134/205547222-a997f051-2dee-4dec-b3af-e8acc345ab32.png)
Part of Calendar Page:
![Part of Calendar Page](https://user-images.githubusercontent.com/72421134/205547334-2d29a782-8eed-49d8-8b8e-5bff49dcf594.png)
Part of Contact Page:
![Part of Contact Page](https://user-images.githubusercontent.com/72421134/205547369-b64f1e37-2973-4b55-b30a-b11efec45fa2.png)
Sign-Up Page:
![Sign-Up Page](https://user-images.githubusercontent.com/72421134/205547677-21e8914d-d84b-4cc4-8269-aa2d628475da.png)
Log-In Page:
![Log-In Page](https://user-images.githubusercontent.com/72421134/205547724-a4459c71-78c0-4c9d-92f1-40d506e6f223.png)
Profile Page:
![Profile Page](https://user-images.githubusercontent.com/72421134/205547883-f10c716b-ec90-46ae-a19f-4e682a79a31e.png)
Admin Page Functions:
![Admin Page Functions](https://user-images.githubusercontent.com/72421134/205548385-1f185e53-24a6-4dbd-9f30-d5a5add23a61.png)


## Developer Instructions
Install [Node.js](https://nodejs.org/en/)

Clone Repository

Install Yarn by running the following:
```bash
npm install --global yarn
```

Then install necessary packages in local repo:
```bash
npm install
```

Finally, to run the development version, run:
```bash
npm start
# or
yarn start
```

## Testing
Testing in CSC 191 consisted of us going through each feature that required some sort of user interaction as well as individual unit testing. This ensured that the website was as bug free as possible when given to the client to maintain. The features that we visually tested include the following:
- Sign Up Validation
- Login Validation
- Forgot Password Validation
- Gallery Page
- Student Profile Page
- Admin Profile Page

The unit tests that we conducted would test each component individually to make sure the proper response was given. If the correct response was returned the test would pass. The components that we unit tested for include:
- Profile Component
- Admin Component
- Change Email Component
- Sign Up Component
- Login Component
- Reset Password Component.

In order to run tests, follow the developer instructions above, then instead of using 'npm start', run:
```bash
npm run test
```

## Deployment
To deploy the project, the following steps were completed:
### Front-end deployment
1. In a terminal, navigate to the project's root directory
2. Run `yarn install` to install the updated dependencies
3. Run `yarn build` (or alternatively `npm install` or `npm build`). This creates a new directory in the project, called build, with the project's build files
4. Login to client's GoDaddy, and access the cPanel admin page
5. Click the "File Manager" icon in cPanel, select the "public_html" folder, and then "Upload"
6. Upload the contents of the build folder (but not the build folder itself) that was created in step 3
7. Update the .htaccess file to add redirects

### Back-end deployment
1. Add new file, app.js, to public_html folder in cPanel. This contains the server logic.
2. In a cPanel terminal session (or remote SSH session), run `node app.js &` to run a standalone server in the background
