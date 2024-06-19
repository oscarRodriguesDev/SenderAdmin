import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import TableOne from "../../components/Tables/allUsers";
import TableThree from "../../components/Tables/TableThree";
import TableTwo from "../../components/Tables/TableTwo";

import { Metadata } from "next";
import DefaultLayout from "../../components/Layouts/DefaultLaout";

export const metadata: Metadata = {
  title: "All Users",
  description: "Pagina listando todos os usuários ativos no banco de dados de usuarios",
};

const TablesPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="All Active Users" />

      <div className="flex flex-col gap-10">
        <TableOne />
       {/*  <TableTwo />
        <TableThree /> */}
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;
