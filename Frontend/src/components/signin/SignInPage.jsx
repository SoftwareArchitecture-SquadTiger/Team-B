import React from 'react';

function SignInPage() {
  return (
    <div className="flex justify-center items-center h-screen relative bg-gray-50">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: `url('https://cdn.gohenry.com/blog/articles/1671722330179@jpeg-optimizer-shutterstock_454418929.jpg')`, // Replace with a valid image URL
          backgroundColor: '#f0f0f0', // Fallback color
          backgroundBlendMode: 'overlay', // Optional for blending
        }}
      ></div>

      {/* Sign-In Form */}
      <div className="bg-white shadow-md rounded-lg p-8 z-10 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 text-center">
          Sign in to your account
        </h2>
        <p className="text-gray-600 text-sm text-center mb-6">
          Welcome back! Please enter your details.
        </p>

        <form className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500"
              required
            />
          </div>

          <div className="text-right">
            <button
              onClick={() => alert('Forgot Password clicked')}
              className="text-sm text-pink-500 hover:underline bg-transparent border-none cursor-pointer"
            >
              Forgot your password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-pink-500 text-white font-semibold rounded-md hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
          >
            Create account
          </button>
        </form>

        <p className="text-sm text-gray-600 text-center mt-4">
          Don’t have an account?{' '}
          <button
            onClick={() => alert('Sign Up clicked')}
            className="text-pink-500 font-medium hover:underline bg-transparent border-none cursor-pointer"
          >
            Sign up.
          </button>
        </p>
      </div>
    </div>
  );
}

export default SignInPage;
