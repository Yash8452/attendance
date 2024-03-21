"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function AuthPage() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const router = useRouter();

  const [isLoginForm, setIsLoginForm] = useState(true); // Initially, render login form
  const [isLoading, setIsLoding] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignIn = async (formData: { email: string; password: string; }) => {
    setIsLoding(true);
    try {
      const response = await fetch(`/api/users/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Failed to log in");
      }

      // Assuming the server returns JSON response, you can parse it here
      const data = await response.json();
      console.log(data)
      console.log("Login response:", data);
      router.push("/");

      setIsLoding(false);
    } catch (error: any) {
      console.error(error.response.data);
      setError(error.response.data.error);
      setIsLoding(false);
    }
  };
  const handleSignUp = async (formData: { name: string; email: string; password: string; }) => {
    setIsLoding(true);
    try {
      const response = await fetch(`/api/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Specify the content type of the request body
        },
        body: JSON.stringify(formData), // Convert formData to JSON string
      });
      console.log(response);

      if (!response.ok) {
        throw new Error("Failed to register");
      }

      // Assuming the server returns JSON response, you can parse it here
      const data = await response.json();
      console.log("Registration response:", data);
      setIsLoding(false);
    } catch (error: any) {
      console.error(error.response.data);
      setError(error.response.data.error);
      setIsLoding(false);
    }
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (isLoginForm) {
      handleSignIn(formData);
    } else {
      handleSignUp(formData);
    }
  };
  return (
    <div className="flex h-[100vh] bg-zinc-900 justify-center items-center">
      <div className="w-[350px] shadow-black border-none bg-black text-white shadow-lg rounded-xl">
        <div>
          <h1 className=" text-xl">
            {isLoginForm ? "SignIn" : "SignUp"}
          </h1>
          <div>
            Deploy your new project in one-click.
          </div>
        </div>
        <div>
          <form>
            <div className="grid w-full items-center gap-4">
              {!isLoginForm && (
                <>
                  <div className="flex flex-col space-y-1.5">
                    <label htmlFor="name">Name</label>
                    <input
                      className="bg-zinc-900"
                      type="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      id="name"
                      placeholder="Enter your name..."
                    />
                  </div>
                </>
              )}
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="email">Email</label>
                <input
                  className="bg-zinc-900"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  id="email"
                  placeholder="Enter your email..."
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="password">Password</label>
                <input
                  className="bg-zinc-900"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  id="password"
                  placeholder="Enter your password..."
                />
              </div>
            </div>
          </form>
        </div>
        <div className="flex flex-col  justify-between space-y-4">
          <div className="flex items-center">
            <p className="ml-2 text-gray-700 text-sm">
              {isLoginForm
                ? "Don't have an account?"
                : "Already have an account?"}
              <button onClick={() => setIsLoginForm(!isLoginForm)}>
                <span className="underline font-bold pl-1 text-red-600">
                  {isLoginForm ? "Sign Up" : "Login"}
                </span>
              </button>
            </p>
          </div>
          <button onClick={handleSubmit}>
            {isLoading ? "Loading..." : isLoginForm ? "Login" : "Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
}
