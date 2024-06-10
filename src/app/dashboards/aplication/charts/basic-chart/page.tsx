import BasicChart from "@/app/dashboards/components/Charts/BasicChart";
import { Metadata } from "next";
import DefaultLayout from "@/app/dashboards/components/Layouts/DefaultLaout";
import React from "react";
import Breadcrumb from "@/app/dashboards/components/Breadcrumbs/Breadcrumb";

export const metadata: Metadata = {
  title: "Next.js Basic Chart Page | NextAdmin - Next.js Dashboard Kit",
  description: "This is Next.js Basic Chart page for NextAdmin Dashboard Kit",
  // other metadata
};

const BasicChartPage: React.FC = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Basic Chart" />

      <BasicChart />
    </DefaultLayout>
  );
};

export default BasicChartPage;
