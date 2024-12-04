import { FaShippingFast } from "react-icons/fa";
import { IoShieldCheckmark } from "react-icons/io5";
import { MdHeadsetMic } from "react-icons/md";


export const About = () => {
  return (
    <div className="flex flex-col justify-center items-start mt-10">
      {/* Encabezado */}
      <div className="md:mx-40">
        <div className="text-gray-600 text-sm">
          About Us
        </div>
      </div>

      {/* Historia */}
      <div className="flex justify-center md:justify-between items-center md:mt-10 my-24 md:mb-36">
        <div className="flex flex-col gap-10 items-center md:items-start justify-center max-w-lg mx-8 md:mx-40">
          <h1 className="text-5xl font-bold">Nosotros</h1>
          <p className="text-base text-center md:text-start">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint aperiam minima accusamus dolorem? Quae inventore odio pariatur quod, iste quibusdam corrupti itaque esse sequi a laudantium tempora aperiam consectetur est.
          </p>
          <p className="text-base text-center md:text-start">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex exercitationem quo tempora placeat iure repellendus fugiat nobis aspernatur porro cum architecto consequuntur, fugit dicta laborum, qui maxime commodi magnam necessitatibus!
          </p>
        </div>
        <div className="absolute right-0 top-10 w-[300px] h-[300px] xl:w-[600px] md:h-[600px] hidden xl:flex items-center justify-center"
          style={{
            transform: "translateZ(30px) scale(1.05)",
            perspective: "1000px"
          }}
        >
          <img
            src= "/asset/vendedor/Productor.png"
            alt="Personaje"
            className="w-3/4 h-3/4 "
          />
        </div>
      </div>

      {/* Estadísticas */}
      <div className="flex flex-col items-center justify-center gap-8 mx-auto">
        <div className="mx-8 md:mx-32 grid grid-cols-1 lg:grid-cols-4 gap-8">
          {[{
            icon: (
              <svg
                width="44"
                height="44"
                viewBox="0 0 44 44"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.00003 18.8889V32.8888C8.00003 33.714 8.32781 34.5053 8.91125 35.0887C9.4947 35.6722 10.286 36 11.1111 36H32.8889C33.714 36 34.5054 35.6722 35.0888 35.0887C35.6722 34.5053 36 33.714 36 32.8888V18.8889"
                  stroke="#1B1A1F"
                  strokeWidth="2.2"
                />
              </svg>
            ),
            value: "2000+",
            description: "Productos vendidos",
          },
          {
            icon: (
              <svg
                width="44"
                height="44"
                viewBox="0 0 44 44"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="22" cy="22" r="20" stroke="#1B1A1F" strokeWidth="2.2" />
              </svg>
            ),
            value: "100%",
            description: "Clientes satisfechos",
          },
          {
            icon: (
              <svg
                width="44"
                height="44"
                viewBox="0 0 44 44"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22 2C11.5066 2 3 10.5066 3 22C3 33.4934 11.5066 42 22 42C32.4934 42 41 33.4934 41 22C41 10.5066 32.4934 2 22 2Z"
                  stroke="#1B1A1F"
                  strokeWidth="2.2"
                />
              </svg>
            ),
            value: "50+",
            description: "Ofertas activas",
          },
          {
            icon: (
              <svg
                width="44"
                height="44"
                viewBox="0 0 44 44"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11 11L33 33"
                  stroke="#1B1A1F"
                  strokeWidth="2.2"
                />
                <path
                  d="M11 33L33 11"
                  stroke="#1B1A1F"
                  strokeWidth="2.2"
                />
              </svg>
            ),
            value: "24/7",
            description: "Soporte",
          }].map((stat, index) => (
            <div
              key={index}
              className="flex max-w-xs gap-4 items-center justify-center flex-col bg-white px-4 py-8 rounded-lg border border-gray-300 transition duration-300 hover:invert hover:bg-slate-700 hover:shadow-xl"
            >
              <div className="p-2 rounded-full bg-gray-300">
                <div className="text-4xl invert p-2 rounded-full bg-white">
                  {stat.icon}
                </div>
              </div>
              <div className="font-bold text-3xl">{stat.value}</div>
              <p className="text-base">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Equipo */}
      <div className="flex flex-col items-center justify-center gap-8 my-36 mx-auto">
        <h2 className="text-4xl font-bold">Equipo</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {["Marcelo", "Angel", "Pablo"].map((name, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-4 p-4 border border-gray-300 rounded-lg"
            >
              <img
                src={`/asset/support/${name}.webp`}
                alt={`${name}`}
                className="w-48 h-48 rounded-full object-cover"
              />
              <h3 className="text-xl font-semibold">{name}</h3>
              <p className="text-sm text-slate-500">Call Center</p>
            </div>
          ))}
        </div>
      </div>


      {/* Servicios */}
      <div className="flex flex-col items-center justify-center gap-8 my-28 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[{
            icon: (
              <div className="p-4 bg-slate-400 rounded-full">
                <FaShippingFast className="text-slate-800" size={44} />
              </div>
            ),
            description: "Envios Grátis",
          },
          {
            icon: (
              <div className="p-4 bg-slate-400 rounded-full">
                <MdHeadsetMic className="text-slate-800" size={44} />
              </div>
            ),
            description: "Calidad garantizada",
          },
          {
            icon: (
              <div className="p-4 bg-slate-400 rounded-full">
                <IoShieldCheckmark className="text-slate-800" size={44} />
              </div>
            ),
            description: "Pagos Seguros",
          }].map((service, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-4"
            >
              {service.icon}
              <p className="text-lg text-center">{service.description}</p>
            </div>
          ))}
        </div>
      </div>


    </div>
  );
};

export default About;