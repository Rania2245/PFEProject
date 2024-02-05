import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import "./Login.css";
import { loginUser } from "../services/UserService";
import { useForm, SubmitHandler } from "react-hook-form";
interface IFormInput {
  username: string;
  password: string;
}
function Login() {
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
    loginUser(data.username, data.password)
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="username">
              <FontAwesomeIcon icon={faUser} /> UserName:
            </label>
            <input type="text" id="username" {...register("username")} />

            <label htmlFor="password">
              <FontAwesomeIcon icon={faLock} /> PassWord:
            </label>
            <input type="password" id="password" {...register("password")} />

            <button type="submit">LOGIN</button>
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
