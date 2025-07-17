### Documentation 
- create components - Dashboard, Signup and Login
- create layout > RootLayout.jsx
- create Routing in App.jsx
- useNavigate in Signup to navigate to Login component
- npm install sweetalert2
- npm install --save react-toastify
  - in App.jsx 
      - import { ToastContainer} from 'react-toastify';
      - inside return <ToastContainer position="top-center" />

- Form Validation of Phone:
 - ✅ What this does:
 - + is optional (\+?)
 - Allows only digits after +
 - Length must be between 7 to 15 digits
 - Covers most country phone numbers      