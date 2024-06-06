import ECommerce from "../components/Dashboard/E-commerce";
import { Metadata } from "next";
import DefaultLayout from "../components/Layouts/DefaultLaout";
import React from "react";

export const metadata: Metadata = {
  title:
    "Sender Admin",
  description: "Painel de Administração do sistema Sender",
};

export default function Home() {
  return (
    <>
      <DefaultLayout>
        <ECommerce />
      </DefaultLayout>
    </>
  );
}
