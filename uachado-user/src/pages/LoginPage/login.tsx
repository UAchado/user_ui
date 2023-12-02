import React, { useContext, useState } from "react";
//import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/LoginContext/AuthContext";

const LoginComponent: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();
  const { logout, login } = useContext(AuthContext); // Use useContext within the component

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const hardcodedUsername = "user1";
    const hardcodedPassword = "pass1";

    const hardcodedUsername2 = "user2";
    const hardcodedPassword2 = "pass2";

    if (username === hardcodedUsername && password === hardcodedPassword) {
      // Successful login
      console.log("User successful");
      login(username, "user");
      setShowError(false);
      navigate("/");
    } else if (
      username === hardcodedUsername2 &&
      password === hardcodedPassword2
    ) {
      // Successful login
      console.log("Admin successful");
      login(username, "admin");
      setShowError(false);
      navigate("/");
    } else {
      // Failed login
      console.error("Login failed");
      logout();
      localStorage.removeItem("username");
      setShowError(true);
    }

    // const BaseUrl = import.meta.env.VITE_INVENTORY_URL;

    // // Create a FormData object
    // const formData = new FormData();
    // formData.append("username", username);
    // formData.append("password", password);

    // try {
    //   const response = await axios.post(BaseUrl + "login/", formData, {
    //     headers: {
    //       "Content-Type": "multipart/form-data", // Set the content type to 'multipart/form-data'
    //     },
    //   });

    //   if (response.status === 200) {
    //     // Successful login, you can handle the response here
    //     console.log("Login successful:", response.data);
    //   } else {
    //     // Handle login error here
    //     console.error("Login failed:", response.statusText);
    //   }
    // } catch (error) {
    //   // Handle any network or other errors here
    //   console.error("Error:", error);
    // }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8">
      {showError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded text-center mb-4">
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline">Invalid username or password.</span>
          <button
            className="px-4 py-3 justify-center items-center"
            onClick={() => setShowError(false)}
          >
            <i className="fa fa-times"></i> {/* Close icon */}
          </button>
        </div>
      )}
      <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto">
        <div className="mb-4">
          <input
            className="input bg-secondary text-black placeholder-black shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Username"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <input
            className="input bg-secondary text-black placeholder-black shadow appearance-none border rounded w-full py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            className="btn btn-warning font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full sm:w-auto"
            type="submit"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginComponent;
