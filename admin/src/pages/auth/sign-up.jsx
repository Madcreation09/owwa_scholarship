import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Alert,
} from "@material-tailwind/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function SignUp() {
  
  const [openAlertFailed, setOpenAlertFailed] = useState(false)

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
    password: '',
    confirmPassword: '',
    user_type: 1
  });

  
  const [errors, setErrors] = useState({});

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });  // Clear error message when user starts typing
  };

  const handleSubmit = async () => {
    let valid = true;
    let newErrors = {};

    if (!formData.name) {
      newErrors.name = "Name is required";
      valid = false;
    }
    if (!formData.email) {
      newErrors.email = "Email is required";
      valid = false;
    }
    if (!formData.address) {
      newErrors.address = "Address is required";
      valid = false;
    }
    if (!formData.phone) {
      newErrors.phone = "Phone Number is required";
      valid = false;
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
      valid = false;
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      valid = false;
    }

    setErrors(newErrors);

    if (!valid) {
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        navigate('/auth/sign-in', { state: { openAlert: true }});
      } else {
        console.log('Failed to register user', response);
        setOpenAlertFailed(true)
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <section className="m-8 flex">
            <div className="w-2/5 h-full hidden lg:block">
        <img
          src="/img/pattern.png"
          className="h-full w-full object-cover rounded-3xl"
        />
      </div>
      <div className="w-full lg:w-3/5 flex flex-col items-center justify-center">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">Register</Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Enter your email and password to register.</Typography>
        </div>
        <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
          <div className="mb-1 flex flex-col gap-6">
            <Alert open={openAlertFailed} color="red">Something went wrong!...</Alert>

            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Your Name
            </Typography>
            <div>
              <Input
                size="lg"
                placeholder="Name"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
              />
              {errors.name && <Typography variant="small" color="red" className="-mb-3 font-medium">{errors.name}</Typography>}
            </div>

            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Your Email
            </Typography>

            <div>
              <Input
                size="lg"
                placeholder="name@mail.com"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
              />
              {errors.email && <Typography variant="small" color="red" className="-mb-3 font-medium">{errors.email}</Typography>}
            </div>

            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Address
            </Typography>
            
            <div>
              <Input
                size="lg"
                placeholder="Password"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                value={formData.address}
                onChange={(e) => handleChange('address', e.target.value)}
              />
              {errors.address && <Typography variant="small" color="red" className="-mb-3 font-medium">{errors.address}</Typography>}
            </div>

            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Phone Number
            </Typography>
            
            <div>
              <Input
                size="lg"
                placeholder="Password"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
              />
              {errors.phone && <Typography variant="small" color="red" className="-mb-3 font-medium">{errors.phone}</Typography>}
            </div>

            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Your Password
            </Typography>
            
            <div>
              <Input
                size="lg"
                placeholder="Password"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                value={formData.password}
                onChange={(e) => handleChange('password', e.target.value)}
              />
              {errors.password && <Typography variant="small" color="red" className="-mb-3 font-medium">{errors.password}</Typography>}
            </div>

            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Confirm Password
            </Typography>

            <div>
              <Input
                size="lg"
                placeholder="Confirm Password"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                  value={formData.confirmPassword}
                  onChange={(e) => handleChange('confirmPassword', e.target.value)}
              />
              {errors.confirmPassword && <Typography variant="small" color="red" className="-mb-3 font-medium">{errors.confirmPassword}</Typography>}
            </div>
          </div>
          
          <Button className="mt-6" fullWidth onClick={handleSubmit}>
            Register Now
          </Button>

          <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
            Already have an account?
            <Link to="/auth/sign-in" className="text-gray-900 ml-1">Sign in</Link>
          </Typography>
        </form>

      </div>
    </section>
  );
}

export default SignUp;
