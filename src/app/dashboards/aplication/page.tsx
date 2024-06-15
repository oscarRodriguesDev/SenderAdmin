'use client'
import ECommerce from "../components/Dashboard/E-commerce";
import DefaultLayout from "../components/Layouts/DefaultLaout";
import React from "react";
import { AuthProvider } from "@/app/auth/AuthContext";



export default function HomeDashboard() {
  return (
    <>
    
    
    <DefaultLayout>
        <ECommerce />
      </DefaultLayout>
    
   
    </>
  );
}
