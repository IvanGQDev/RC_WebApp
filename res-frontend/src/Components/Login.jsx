import React from 'react';

const Login = ({ setIsLoggedIn }) => {
  const [user, setUser] = React.useState({ username: "", password: "" });
  const [error, setError] = React.useState("");
  const validUser = { username: "admin", password: "admin123" };

  const handleLogin = (e) => {
    e.preventDefault();
    if (user.username === validUser.username && user.password === validUser.password) {
      localStorage.setItem("token", "valid-token");
      setIsLoggedIn(true);
      setError("");
    } else {
      setError("Usuario o contraseña inválidos");
    }
  };

  return (
    // Imagen de fondo
    <div 
      className="flex flex-col justify-center min-h-screen"
      style={{
        backgroundImage: "url('/loginBackground.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Login Contenedor*/}
      <div className='flex flex-col ml-14'>
        <form
        onSubmit={handleLogin}
        className="flex flex-col justify-center bg-neutral-900/80 rounded-2xl shadow-md 
             w-11/12 sm:w-96 text-white h-[450px] p-8 sm:p-12 space-y-6"
      > 
        {/* Titulo */}
        <div className="mb-4">
          <h2 className="text-center text-4xl">Bienvenido a</h2>
          <h2 className="text-center text-4xl text-blue-400">Conflikta</h2>
        </div>

        {/* Inputs para username y password */}
        <input
          type="text"
          placeholder="Usuario"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          className="p-1 bg-transparent border-b-2 border-neutral-500 focus:outline-none text-white
                    hover:border-blue-500 focus:border-blue-500"
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          className="p-1 bg-transparent border-b-2 border-neutral-500 focus:outline-none text-white
                    hover:border-blue-500 focus:border-blue-500"
        />

        {error && <p className="text-red-500 text-center">{error}</p>}
        
        {/* Boton de enviar */}
        <button
          type="submit"
          className="bg-blue-500 text-white py-1.5 px-4 rounded-2xl hover:bg-blue-600 " 
        >
          Iniciar sesión
        </button>
      </form>

      </div>
    </div>
  );
};

export default Login;
