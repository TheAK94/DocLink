<a href="https://weekendofcode.computercodingclub.in/"> <img src="https://i.postimg.cc/njCM24kx/woc.jpg" height=30px> </a>

# DocLink

**DocLink** is a comprehensive healthcare platform designed to simplify the way patients book appointments and connect with doctors. The main motive of DocLink is to streamline appointment scheduling and booking through an intuitive interface, while also offering additional features such as separate logins for doctors and users, and an AI-powered chatbot for quick assistance—all built with a responsive design that works seamlessly across devices.

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Overview](#project-overview)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Customization](#customization)
- [Contributing](#contributing)
- [License](#license)
- [Contributors](#contributors)

## Features

- **Appointment Scheduling & Booking:**  
  The primary goal of DocLink is to facilitate easy appointment scheduling and booking. Patients can view available time slots, book appointments, and manage their appointment history efficiently.

- **Separate Login for Doctors and Users:**  
  DocLink provides distinct authentication interfaces for doctors and patients, ensuring tailored experiences and enhanced security.

- **AI-Powered Chatbot:**  
  An integrated chatbot powered by advanced natural language processing assists users with health-related questions, offers appointment booking guidance, and provides quick support 24/7.

- **Responsive Design:**  
  Every page—whether it's the login form, appointment management, or the AI chatbot interface—is designed to be fully responsive, ensuring a smooth user experience on desktops, tablets, and smartphones.


## Technology-Stack:
  1) HTML, JavaScript
  2) BootStrap CSS
  3) NodeJS, ExpressJS
  4) MongoDB

## Project Overview

**DocLink** transforms the appointment booking experience by combining robust scheduling features with smart technology. Key aspects include:

- **Streamlined Appointment Management:**  
  Patients can easily search for doctors, view available slots, and book appointments online. Doctors can manage their schedules and mark appointments as completed.

- **Tailored Access:**  
  Separate login flows ensure that both patients and doctors access features relevant to their needs.

- **Smart Assistance:**  
  The AI-powered chatbot not only provides immediate responses to health queries but also guides users through the booking process, making healthcare more accessible.

- **Modern, Responsive UI:**  
  The platform’s design adapts to various screen sizes, ensuring usability across all devices.

## Getting Started

### Prerequisites

- **Node.js and npm:** Make sure you have Node.js (v14 or above recommended) and npm installed on your machine.
- **Git:** Ensure you have Git installed for repository management.

### Installation

1. **Fork the Repository:**  
   Visit the [DocLink GitHub repository](https://github.com/yourusername/DocLink) and click the **Fork** button at the top-right to create your own copy.

2. **Clone Your Fork:**  
   Clone the forked repository to your local machine:

   ```bash
   git clone https://github.com/yourusername/DocLink.git
   ```

3. **Change Directory:**  
   Navigate into the project directory:

   ```bash
   cd DocLink
   ```

4. **Initialize npm (if necessary):**  
   If the `package.json` file is missing, initialize npm:

   ```bash
   npm init
   ```

5. **Install Dependencies:**  
   Install the required dependencies as specified in `package.json`:

   ```bash
   npm i
   ```

6. **env File:**  
   Create a `.env` file in the root directory to store your API keys and environment variables. For example:

   ```bash
   SENDGRID_API_KEY=your_api_key_here
   GEMINI_API_KEY=your_api_key_here
   MONGO_URI=your_mongodb_uri
   ```

5. **Start the Application:**  
   Use nodemon to run the application during development. If nodemon isn’t installed globally, install it with:

   ```bash
   npm install -g nodemon
   ```

   Then start the app with:
   ```bash
   nodemon app
   ```

## Project Structure

```
|-- DocLink
    |-- .env
    |-- .gitignore
    |-- app.js
    |-- package-lock.json
    |-- package.json
    |-- README.md
    |-- rough
    |-- .vscode
    |   |-- settings.json
    |-- controllers
    |   |-- configDB.js
    |   |-- doctorController.js
    |   |-- userController.js
    |-- extra useless files
    |   |-- login.ejs
    |   |-- signup.ejs
    |-- middlewares
    |   |-- checkAuth.js
    |   |-- checkAuthDoctor.js
    |-- models
    |   |-- doctorModel.js
    |   |-- userModel.js
    |-- public
    |   |-- assets
    |   |   |-- appointment-banner.svg
    |   |   |-- beach_sea.jpeg
    |   |   |-- blank-profile-pic.webp
    |   |   |-- chat-bot-icon.webp
    |   |   |-- chatbot-img.png
    |   |   |-- doc-illus.jpeg
    |   |   |-- specialists.png
    |   |-- scripts
    |   |   |-- bookAppointments.js
    |   |   |-- dash-doc-script.js
    |   |   |-- dash-user.js
    |   |   |-- home.js
    |   |-- styles
    |       |-- bookAppointments.css
    |       |-- dash-doc-style.css
    |       |-- dash-user-style.css
    |       |-- doc_profile.css
    |       |-- healthbot.css
    |       |-- home.css
    |       |-- specialities.css
    |       |-- user_profile.css
    |-- routes
    |   |-- doctorRoute.js
    |   |-- userRouter.js
    |-- services
    |   |-- datasets.js
    |   |-- healthBot.js
    |   |-- sendMail.js
    |-- views
        |-- bookAppointments.ejs
        |-- home.ejs
        |-- specialities_page.html
        |-- userDashboard.ejs
        |-- userProfile.ejs
        |-- doctor
        |   |-- doctorDashboard.ejs
        |   |-- doctorDashboardrough.ejs
        |   |-- doctorLogin.ejs
        |   |-- doctorProfile.ejs
        |   |-- doctorSignup.ejs
        |-- partials
            |-- healthBot.ejs
            |-- navbar-doc.ejs
            |-- navbar-user.ejs
            |-- pushMessage.ejs
```


## Customization

DocLink is designed to be flexible and customizable:

- **Styling:** Customize the CSS and Bootstrap classes to align with your branding.
- **Functionality:** Enhance or extend features by editing the JavaScript files.
- **Responsive Design:** The responsive layout ensures optimal performance on mobile, tablet, and desktop devices.

## Contributing

Contributions are welcome! Please fork this repository, make your changes, and submit a pull request with your enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

![MIT License](https://img.shields.io/badge/License-MIT-green.svg)

## Contributors


<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
| [<img src="https://github.com/TheAK94.png" width="100px;"/><br /><sub><b>Atharva</b></sub>](https://github.com/TheAK94) | [<img src="https://github.com/ankit-3131.png" width="100px;"/><br /><sub><b>Ankit</b></sub>](https://github.com/ankit-3131) | [<img src="https://github.com/Sachit0CS.png" width="100px;"/><br /><sub><b>Sachit</b></sub>](https://github.com/Sachit0CS) |
| :---: | :---: | :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->


### Made at:

<a href="https://weekendofcode.computercodingclub.in/"> <img src="https://i.postimg.cc/Z9fC676j/devjam.jpg" height=30px> </a>