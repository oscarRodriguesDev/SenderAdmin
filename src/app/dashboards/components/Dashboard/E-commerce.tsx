"use client";
import React from "react";
import ChartThree from "../Charts/ChartThree";
import ChartTwo from "../Charts/ChartTwo";
import ChatCard from "../Chat/ChatCard";
import TableOne from "../Tables/TableOne";
import MapOne from "../Maps/MapOne";
import DataStatsOne from "../DataStats/DataStatsOne";
import ChartOne from "../Charts/ChartOne";
import { useState, useEffect } from "react";
import { getAuthStatus } from "@/app/auth/authEmail";
import { AuthProvider } from "@/app/auth/AuthContext";

const ECommerce: React.FC = () => {
  const [logado, setLogado] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const session = await getAuthStatus();
        setLogado(session.loggedIn);
      } catch (error) {
        setLogado(false);
      }
    };
    checkAuthStatus(); 
  }, []);
  return (
    <div>
      {logado ? (
     
        <div>
          <h1 className=" w-full text-center mb-8 text-4xl">Atestados Recebidos</h1>
          {/*  <DataStatsOne /> */}
          {/*   <div className=" w-full mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-9 2xl:gap-7.5"> */}
          {/* <ChartOne />
            <ChartTwo />
            <ChartThree />
            <MapOne /> */}
          <TableOne />
          <div className="col-span-12 xl:col-span-8"></div>
          {/*  <ChatCard /> */}
          {/*  </div> */}
        </div>
     
      ) : (
        <div>
          <h1>No user Logged</h1>
        </div>
      )}
    </div>
  );
};

export default ECommerce;
