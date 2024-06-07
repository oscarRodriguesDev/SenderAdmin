'use client'
import { Container } from "@/components/Container";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { useState, useEffect } from "react";
import { userLogged } from "@/services/auth";
import HomeDashboard from "./dashboards/aplication/page";


export default function Home() {

  const [logado, setLogado] = useState(false);

  async function checkUserLogged() {
    const logged = await userLogged();
    setLogado(logged);
  }

  useEffect(() => {
    checkUserLogged();  
  }, []);


  return (
    <> 
    {!logado ? (
        <Container>
          <div className="w-full max-w-[1800px] bg-black absolute top-0 mb-56 h-auto">
            <Navbar />
          </div>
          <Hero />
        </Container>
      ) : (
        <HomeDashboard />
      )}
    </>
  );
}

