import { useState } from 'react';

const LoginForm = ({ handleLogin, username, handleUsernameChange }) => {
  const [password, setPassword] = useState('');

  const onSubmit = (event) => {
    event.preventDefault();
    handleLogin({ username, password });
    handleUsernameChange('');
    setPassword('');
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="username"
            onChange={(event) => handleUsernameChange(event.target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit"> login </button>
      </form>
    </div>
  );
};

export default LoginForm;
