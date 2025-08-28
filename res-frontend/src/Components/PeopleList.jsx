import React, { useEffect, useState } from "react";
import { getUsuarios, formatearUsuariosTabla } from "../services/userService";
import { User, UserCircle2, Users, Search, ChevronLeft, ChevronRight, Copy } from "lucide-react";
import PersonDetail from "./PersonDetail";
import IdCell from "./IdCell";

const genderIcon = (genero) => {
  switch ((genero || "").toLowerCase()) {
    case "masculino":
    case "hombre":
    case "m":
      return <User className="w-5 h-5 text-blue-600" />;
    case "femenino":
    case "mujer":
    case "f":
      return <UserCircle2 className="w-5 h-5 text-pink-500" />;
    default:
      return <Users className="w-5 h-5 text-purple-500" />;
  }
};

const statusPill = (status) => {
  const base = "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold";
  const styles = {
    "Aprobado": "bg-green-100 text-green-700",
    "No aprobado": "bg-red-100 text-red-700",
    "Sin procesar": "bg-gray-100 text-gray-600",
  };
  return (
    <span className={`${base} ${styles[status] || "bg-gray-100 text-gray-700"}`}>
      {status}
    </span>
  );
};

const PeopleTable = () => {
 const [data, setData] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usuarios = await getUsuarios();
        setData(formatearUsuariosTabla(usuarios));
      } catch (err) {
        setError("Error cargando usuarios");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredData = data.filter(
    (p) =>
      p.nombres.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold text-gray-600">Cargando...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold text-red-500">{error}</p>
      </div>
    );
  }

  if (selectedPerson) {
    return (
      <div className="w-full h-screen">
        <div className="w-full h-fit bg-gray-100 shadow-md p-6">
          <PersonDetail person={selectedPerson.original} onBack={() => setSelectedPerson(null)} />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col mx-auto p-6">
      <div className="mb-3 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 drop-shadow-md">
            Listado de Personas
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Aquí encontrarás a las personas que realizaron la prueba junto con datos como género, nombre, puntos y estado.
          </p>
        </div>
        <div className="relative w-full md:w-64 md:mt-5">
          <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="w-5 h-5 text-gray-400" />
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Buscar por nombre..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl shadow bg-white">
        <table className="w-full text-sm text-gray-700">
          <thead className="sticky top-0 bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-6 py-3 text-left">Género</th>
              <th className="px-6 py-3 text-left">Nombres</th>
              <th className="px-6 py-3 text-left">Id</th>
              <th className="px-6 py-3 text-right">Puntos</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {currentData.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50 transition-colors duration-150">
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100">
                    {genderIcon(p.genero)}
                  </div>
                </td>
                <td className="px-6 py-4">
                  {p.nombres}
                </td>
                <td className="px-6 py-4 flex items-center gap-2">
                  <IdCell id={p.id} />
                </td>
                <td className="px-6 py-4 text-right font-semibold">{p.puntos}</td>
                <td className="px-6 py-4">{statusPill(p.status)}</td>
                <td className="px-6 py-4 text-center gap-1 flex justify-center">
                  <button
                    onClick={() => setSelectedPerson(p)}
                    className="px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow-md hover:from-blue-600 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200"
                  >
                    Detalles
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div className="flex justify-end items-center gap-2 mt-2 flex-wrap">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="flex items-center px-3 py-2 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50 transition"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {pages.map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-2 rounded-md font-medium text-sm transition
              ${currentPage === page ? "bg-blue-500 text-white shadow-md" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="flex items-center px-3 py-2 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50 transition"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default PeopleTable;
