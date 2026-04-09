// pages/Login.tsx
const Login = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-80">
        <h2 className="text-xl mb-4">Login</h2>

        <input className="w-full mb-2 p-2 border" placeholder="Email" />
        <input className="w-full mb-4 p-2 border" placeholder="Password" />

        <button className="w-full bg-black text-white py-2">
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;