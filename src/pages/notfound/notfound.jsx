
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  const [countdown, setCountdown] = useState(10);

  // contador
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);


    if (countdown === 0) {
      window.location.href = "/";
    }

    return () => clearInterval(timer);
  }, [countdown]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-slate-600 to-blue-500 text-white">
      {/* Encabezado 404 */}
      <h1 className="text-6xl md:text-9xl font-extrabold animate-bounce pt-10">404</h1>
      <h2 className="mt-4 text-xl md:text-3xl font-medium text-center">
        Oops! Me parece que te equivocaste chimuel@
      </h2>

      {/* Contador con animación */}
      <div className="mt-6 flex flex-col items-center">
        <p className="text-lg md:text-xl">Redireccionando</p>
        <div className="mt-2 relative">
          <div className="w-20 h-20 bg-red-500 rounded-full animate-pulse"></div>
          <span className="absolute inset-0 flex items-center justify-center text-3xl font-bold">
            {countdown}
          </span>
        </div>
      </div>

 
      <div className="mt-8">
        <Link
          to="/"
          className="px-6 py-3 bg-blue-400 hover:bg-blue-500 text-black font-semibold rounded-lg shadow-lg transition-all duration-300"
        >
          Go Back Home
        </Link>
      </div>

      <div className="mt-12 flex items-center justify-center">
        <div className="relative w-40 h-40">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-pink-400 to-purple-600 rounded-full blur-2xl opacity-50 animate-spin-slow"></div>
          <div className="absolute inset-0 flex items-center justify-center text-6xl">
            🚀
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
