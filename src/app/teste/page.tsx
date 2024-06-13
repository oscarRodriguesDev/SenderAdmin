import React, { useState, useEffect } from "react";

export default function Teste() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/atestados');
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {data ? (
        <div>
          <h1>Deu certo</h1>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      ) : (
        <div>
          <h1>Carregando...</h1>
        </div>
      )}
    </>
  );
}
