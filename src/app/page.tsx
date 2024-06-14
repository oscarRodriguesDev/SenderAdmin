"use client";
import { Container } from "@/components/Container";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { useState, useEffect } from "react";
import { getAuthStatus } from "./auth/authEmail";
import HomeDashboard from "./dashboards/aplication/page";
import { AuthProvider } from "./auth/AuthContext";
import Teste from "./teste/page";

export default function Home() {
  const [estado, setEstado] = useState<boolean | null>(null);
 

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const session = await getAuthStatus();
        setEstado(session.loggedIn);
      
      } catch (error) {
        setEstado(false);
      }
    };

    checkAuthStatus();
  }, []);

  return (
    <>
    <AuthProvider>
    {!estado ? (
        <Container>
          <div className="w-full max-w-[1800px] bg-black absolute top-0 mb-56 h-auto">
            <Navbar />
          </div>
          <Hero />
        </Container>
      ) : (
        <div>
           
          <HomeDashboard />
         
          

      
        </div>
      )}
      
    </AuthProvider>
    
    </>
  );
}
