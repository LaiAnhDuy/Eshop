import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";
import React, { useState } from "react";
import { RxAvatar } from "react-icons/rx";
import axios from "axios";
import { server } from "../../server";
import {toast} from "react-toastify"
import {useNavigate} from "react-router-dom"

const SignUpPage = () => {
  const [avatar, setAvatar] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()


  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const newForm = new FormData();

    newForm.append("file", avatar);
    newForm.append("name", name);
    newForm.append("email", email);
    newForm.append("password", password);

    axios
      .post(`${server}/user/create-user`, newForm, config)
      .then((res) => {
        if(res.data.success === true) {
          navigate("/")
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message)
      });
  };
  return (
    <div className="min-h-screen flex flex-col justify-center bg-gray-100 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-md ">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Register as a new user
        </h2>
      </div>
      <div className="mt-8 mx-auto w-full max-w-md">
        <div className="bg-white py-8 px-10 shadow rounded-lg">
          <Form size="large">
            <Form.Item
              name="fullName"
              rules={[
                {
                  required: true,
                  message: "Please input your Full Name!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Item>

            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your Email!",
                },
              ]}
            >
              <Input
                prefix={<MailOutlined className="site-form-item-icon" />}
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Item>

            <div>
              <label
                htmlFor="avatar"
                className="block text-sm font-medium text-gray-700"
              ></label>
              <div className="mt-2 flex items-center">
                <span className="inline-block h-8 w-8 rounded-full overflow-hidden">
                  {avatar ? (
                    <img
                      src={URL.createObjectURL(avatar)}
                      alt="avatar"
                      className="h-full w-full object-cover rounded-full"
                    />
                  ) : (
                    <RxAvatar className="h-8 w-8" />
                  )}
                </span>
                <label
                  htmlFor="file-input"
                  className="ml-5 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-100"
                >
                  <span>Upload a file</span>
                  <input
                    type="file"
                    name="avatar"
                    id="file-input"
                    accept=".jpg,.jpeg,.png"
                    onChange={handleFileInputChange}
                    className="sr-only"
                  />
                </label>
              </div>
            </div>

            <button
              className="text-white bg-blue-600 mt-5 p-2 rounded-lg w-full hover:bg-blue-500"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </Form>
          <p className="mt-5">
            Already have an account?{" "}
            <a
              className="text-blue-600 px-2 font-medium hover:text-blue-400"
              href="Login"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
