import React, { useState } from "react";
import forge from "node-forge";
import { compactDecrypt, importPKCS8 } from "jose";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    userType: "Admin",
  });

  const [error, setError] = useState("");

  const rsaPublicKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAu/tB9+zU3RxhdeiLXgZF
pql7GpOLzDcbXneQubo5B02iuRIuO2m0bmCYzG2sdqu5bOOG4jieegDr6X75nC26
Sb/wVwH5xP1/EJayL6va1se/Zh+aiYWhWRW82j6meLvxodZoIcV2TGhQoZEHBVQ/
Ta4i1dJr/rtdoha2f8H/YUF+wToTMCaNcqDEbNYQnhj55fLZ0+y+a9o8MQHXP4VB
FcSqyKTKAO+r3vlnxyXezhZtP1jt9Mp5Lg60qHjEpxfnridchQSJUxSBMw87BOC3
hBcrQjEA12pRnkGQCO4tZXyrC0kaRS2edBLj+B4qnmO1u3rzEvMSsJY0jL13ftdS
TQIDAQAB
-----END PUBLIC KEY-----`;

  const jwePrivateKey = `-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCf1qUU4bcCvh04
y6E5fnv9/mMcoSfixxlMazFKli2573MaGTCccUi0cHCuHTArWKcn9tgecW4aXqur
uqgOoGaf+IujW+8A8b3OmsCY+o1GrggpTKtuXEedlZrmsfg+taAXl7vXcG0nIa1f
vzTMSsq4picaR6ZvD0Pa6KgP+WnfIitBauL0wXNQdqtZgrz2bk8ps7yTT/zDVNg1
y4d2L+GHHylRQDb6oVUTGmRd1+V9Z3/FC2GeZ3UDDxbDwru2ngm6VtGcf6mTV3S5
VhQyTAhcR3MK6XaKR7BfT/7nTWIkxwLhWddKqDf8CCR3LTQJIWNnno5CE83imo7D
r0f/SRn7AgMBAAECggEAAvoH3AIyGtJ4j9i2+W+iFoJYzS0xJXeIwJQUeGugkWBk
t901OwyfCoE3j/6KKZx+jG976eE56DLQJqQUwiT5lEwYKaQqKM3Xt5PJN3AfFmxi
SYacgLMmQEiLeHVjBqPyRc41GNeGqN5nMKvKa22PJe4uNz6TWmkh3d9MVfPSpW2h
b71cy/xegnmFGkdvBOhZhu4PIJDqKRJo/HKc/LygjEu5T/QwoU4ztEY3HBzFv9YX
45BebJsjK2ayCXAq0uH2THJk0W57YaQ82Nodq9rzp0pLAyF+Vdvcesd+BDhToI4B
rBK7Q6wVYLulAc1vqcgXoyKzDSJ6cp5fV6trkdZ6ZQKBgQDREFQVxeIYhY8mQKIH
MEfl2JuyV02cZntGu+wpJ7GaZPVarHCWZkdTFFiSTVK2UCsZatZBC8VCPMdiUcq1
58XbbkyKMxW0alkAE7QnvwCzI/xPxGJuttAJ9GvBWDaGoPRms8pEgtjAO2/BbUoY
dIdAG5Tig+lHp1vU/74Ztly/bQKBgQDDuSd4Dm5nuZgCJoEAX5wYS2me68VlgR8x
cLpBmjBmnLSIwn1+E5mqOD7bHrP80FmCAaOQKkUdypu5CBtqX2g9u5Y7SGuR7CQ2
isrR7EtUv+h950y6JQTYhLJc3z8pW2ryKKbjw6W3jgpwydIFMkfT9rQolDW6izKR
fAwwOS6WBwKBgQC9V9d/vK+P2+6RC3pznkOPpIUmmTEeVCaUIoC5qUyN85/PFlwF
qu4wDT5Giqc9nQ/bvkn7sUhfPCKsJj28UAR/Pr8tbyTaOHMQwcepM7DTjeTm7Yrk
kMeMLIUnH9iKR93x4iVvtT3PpEUL3wp7aZZQ9mn6WNP/ZFCkcVbffK01ZQKBgFLf
AdQ2oA6xKai3buWelfQ/chBFGgaZfoCrj2GZjKbV8Sb62rHYULcfK5YR0PnZqhx+
3yd6jltH31mgEiOfE/8Xf0vIpStbBhZF/AyYdWkD/MfaeMVUSVH4FaF3MUIsoAK6
rbdArtkifk81VQS4PmuESNHptzouGBI7qNl+TLhfAoGBAKnWWxDUYl/BHopfuDsE
CVsXWCUSHeKgEq4Jso7m+FuswlA7m31klonRZgbh7ljEAZlYUwQPE/yyQZOmk7II
pydtxoTgEHLoLTTd0nNFkzquo5yRRGjCLQDuJf1yT7fdNEQCCtKFB43/mz310xdB
lG2hDizs8GVYsj0HrwSmEssc
-----END PRIVATE KEY-----
`;

  const setCookie = (name, value, days) => {
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = `${name}=${value || ""}${expires}; path=/`;
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const encryptPassword = (password) => {
    const publicKey = forge.pki.publicKeyFromPem(rsaPublicKey);
    const encrypted = publicKey.encrypt(password, "RSA-OAEP", {
      md: forge.md.sha256.create(),
    });
    return forge.util.encode64(encrypted);
  };

  const decryptJWE = async (jwe) => {
    try {
      const privateKey = await importPKCS8(jwePrivateKey, "RSA-OAEP");
      const { plaintext } = await compactDecrypt(jwe, privateKey);
      const decodedText = new TextDecoder().decode(plaintext);
      return decodedText;
    } catch (error) {
      console.error("Error decrypting JWE:", error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Please enter both email and password");
      return;
    }

    try {
      const encryptedPassword = encryptPassword(formData.password);

      const dataToSend = {
        email: formData.email,
        password: encryptedPassword,
        userType: formData.userType,
      };

      const response = await fetch("http://10.247.197.101:5001/admin-server/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const data = await response.json();

      if (data.status === "error") {
        throw new Error(data.error || "Invalid credentials");
      }

      console.log("Login successful:", data.status);

      const decryptedData = await decryptJWE(data.JWE);
      const parsedData = JSON.parse(decryptedData);

      console.log("JWS:", parsedData.jws);

      // Set JWS token in cookies
      setCookie("authToken", parsedData.jws, 7);

      alert("Login successful!");
    } catch (error) {
      setError(error.message);
      console.error("Error:", error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white shadow rounded grid gap-4"
    >
      <h2 className="text-xl font-bold text-gray-700 text-center">Login</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700" htmlFor="email">
          Email Address
        </label>
        <input
          id="email"
          type="text"
          value={formData.email}
          onChange={handleInputChange}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter your email"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={formData.password}
          onChange={handleInputChange}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter your password"
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="flex justify-center">
        <button
          type="submit"
          className="px-4 py-1 bg-pink-500 text-white rounded shadow hover:bg-pink-600 text-sm"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
