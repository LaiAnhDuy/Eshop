import React from "react";
import { Checkbox, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center bg-gray-100 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-md ">
        <h2 className="mt-6 text-center text-4xl font-extrabold text-gray-900">
          Login to your account
        </h2>
      </div>
      <div className="mt-8 mx-auto w-full max-w-md">
        <div className="bg-white py-8 px-10 shadow rounded-lg">
          <Form size='large'>
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your Username!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
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
              />
            </Form.Item>
            <div className="flex justify-between font-medium">
              <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
              </Form.Item>
              <a className="mt-2 text-blue-600" href="sssss">
                Forgot your password?
              </a>
            </div>
            <button className="text-white bg-blue-600 p-2 rounded-lg w-full hover:bg-blue-500">
              Submit
            </button>
          </Form>
          <p className="mt-5">
            Not have any account?{" "}
            <a className="text-blue-600 px-2 font-medium hover:text-blue-400" href="sign-up">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
