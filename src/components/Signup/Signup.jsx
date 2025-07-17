import React, { useState } from 'react';
import './Signup.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import * as Yup from 'yup';  // ✅ Yup import

const Signup = () => {
  let [name, setName] = useState('');
  let [email, setEmail] = useState('');
  let [phone, setPhone] = useState('');
  let [password, setPassword] = useState('');
  let [errors, setErrors] = useState({}); // ✅ for showing validation errors

  const navigate = useNavigate();

  // ✅ Define Yup schema
  const schema = Yup.object().shape({
    name: Yup.string().matches(/^[A-Za-z\s]+$/, 'Name must contain only letters').required('Name is required'),
    email: Yup.string().email('Email is invalid').required('Email is required'),
    phone: Yup.string().matches(/^\+?[0-9]{7,15}$/, 'Enter a valid phone number').required('Phone is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required')
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Validate the form using Yup
    try {
      await schema.validate({ name, email, phone, password }, { abortEarly: false });

      // If validation passes, clear any old errors
      setErrors({});

      let formData = {
        myName: name,
        myEmail: email,
        myPhone: phone,
        myPassword: password
      };

      let response = await fetch("https://686fb14391e85fac42a2226e.mockapi.io/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        Swal.fire({
          title: "Account is created successfully!",
          icon: "success",
          draggable: true,
        });

        // ✅ Clear input fields
        setName('');
        setEmail('');
        setPhone('');
        setPassword('');
        navigate('/login');
      } else {
        toast.error("Failed to create the account");
      }

    } catch (validationError) {
      // ✅ If validation fails, show errors
      const newErrors = {};
      validationError.inner.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
    }
  };

  return (
    <div className='main-container'>
      <div className="container">
        <div className="header">
          <div className="text">Sign Up</div>
          <div className="underline"></div>
        </div>
        <form className='form-container' onSubmit={handleSubmit}>

          <div className="inputs">
            {/* Name */}
            <div className="input">
              <div className="icon">
                <FontAwesomeIcon icon={faUser} />
              </div>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            {errors.name && <div className="error">{errors.name}</div>}

            {/* Email */}
            <div className="input">
              <div className="icon">
                <FontAwesomeIcon icon={faEnvelope} />
              </div>
              <input
                type="email"
                placeholder="Email Id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {errors.email && <div className="error">{errors.email}</div>}

            {/* Phone */}
            <div className="input">
              <div className="icon">
                <FontAwesomeIcon icon={faPhone} />
              </div>
              <input
                type="text"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            {errors.phone && <div className="error">{errors.phone}</div>}

            {/* Password */}
            <div className="input">
              <div className="icon">
                <FontAwesomeIcon icon={faLock} />
              </div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {errors.password && <div className="error">{errors.password}</div>}
          </div>

          <div className='already-account'>
            <p>
              Already have an account? <span onClick={() => navigate('/login')}>Login here!</span>
            </p>
          </div>

          <div className="submit-container">
            <button className="submit" type="submit">Sign Up</button>
          </div>

        </form>

      </div>
    </div>
  );
};

export default Signup;
