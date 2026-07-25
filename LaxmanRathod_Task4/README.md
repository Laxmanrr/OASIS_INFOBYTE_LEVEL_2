# LaxmanRathod_Task6 - Login / Registration Form

## Oasis Infobyte Internship - Task 6

A login/registration form UI with tab switching and validation, built with
HTML, CSS, and JavaScript. Uses `localStorage` to simulate user persistence
(no real backend).

## Features
- Tab toggle between Login and Register views
- Register: name, email, password, confirm password
- Login: email + password
- Show/Hide password toggle on all password fields
- Validation:
  - Empty field checks
  - Email format validation (regex)
  - Minimum password length (6 characters)
  - Password/confirm password match check
  - Duplicate email check on registration
- Registered users are stored in `localStorage`, and login checks credentials
  against that stored data — simulates a real signup/login flow without a backend
- Centered card UI with shadow for a clean, professional look

## Tech Used
- HTML5
- CSS3 (card layout, tab styling)
- JavaScript (form handling, validation, localStorage)

## How to Run
1. Download/clone this folder.
2. Open `index.html` in any web browser.
3. Register a new account, then try logging in with the same email/password.

## Files
- `index.html` - login and register form structure with tabs
- `style.css` - styling for the auth card, tabs, and forms
- `script.js` - tab switching, password toggle, validation, and localStorage logic

## Note
This project stores data in the browser's `localStorage` for demo purposes only.
It is not secure (passwords are stored in plain text) and should not be used as-is
for a real production login system.

## Author
Laxman Rathod
