import React from "react";
import FormField from "./FormField";
import ForgotPasswordButton from "./ForgotPasswordButton";
import SubmitButton from "./SubmitButton";
import SignupPrompt from "./SignupPrompt";
import BackgroundImage from "./BackgroundImage";

const SignInPage = () => {
  return (
    <div className="flex justify-center items-center h-screen relative bg-gray-50">
      {/* Background Image */}
      <BackgroundImage imageUrl="https://cdn.gohenry.com/blog/articles/1671722330179@jpeg-optimizer-shutterstock_454418929.jpg" />

      {/* Sign-In Form */}
      <div className="bg-white shadow-md rounded-lg p-8 z-10 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 text-center">
          Sign in to your account
        </h2>
        <p className="text-gray-600 text-sm text-center mb-6">
          Welcome back! Please enter your details.
        </p>

        <form className="space-y-4">
          <FormField
            id="email"
            label="Email Address"
            type="email"
            placeholder="Enter your email"
            required
          />
          <FormField
            id="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
            required
          />
          <ForgotPasswordButton
            onClick={() => alert("Forgot Password clicked")}
          />
          <SubmitButton text="Create account" />
        </form>

        <SignupPrompt onClick={() => alert("Sign Up clicked")} />
      </div>
    </div>
  );
};

export default SignInPage;
