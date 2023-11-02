import PropType from 'prop-types';
const LoginForm = ({ handleLogin }) => {
  const onSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    handleLogin(formJson);
  };

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={onSubmit}>
        <div>
          Username:
          <input type="text" name="username" />
        </div>
        <div>
          Password:
          <input type="password" name="password" />
        </div>
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

LoginForm.displayName = 'LoginForm';
LoginForm.propTypes = { handleLogin: PropType.func.isRequired };

export default LoginForm;
