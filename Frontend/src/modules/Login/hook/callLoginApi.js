export const callLoginApi = async (dataToSend) => {
    const response = await fetch("http://192.168.0.107:5001/admin-server/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataToSend),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Login failed");
    }
  
    return response.json();
  };
  