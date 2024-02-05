import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import "./Login.css";
import { loginUser } from "../services/UserService";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    loginUser(username, password)
      .then((response) => response.json())
      .then((json) => console.log(json));
  };

  return (
    <div className="container">
      <div className="image-container">
        <img src="src/assets/crm.jpg" alt="Login Image" />
      </div>
      <div className="form-container">
        <div className="login-container">
          <h2>LogIn</h2>
          <form>
            <label htmlFor="username">
              <FontAwesomeIcon icon={faUser} /> UserName:
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <label htmlFor="password">
              <FontAwesomeIcon icon={faLock} /> PassWord:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="button" onClick={handleLogin}>
              LOGIN
            </button>
            <p>
              Pas de compte ?{" "}
              <a href="/inscription" className="create-account-link">
                S'inscrire
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
