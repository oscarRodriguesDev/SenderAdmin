import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import TableOne from "../../components/Tables/AprovTables";
import TableThree from "../../components/Tables/TableThree";
import TableTwo from "../../components/Tables/TableTwo";

import { Metadata } from "next";
import DefaultLayout from "../../components/Layouts/DefaultLaout";

export const metadata: Metadata = {
  title: "Approved users",
  description: "Lista de usuários com atestados aprovados",
};

const TablesPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Approved Doc" />

      <div className="flex flex-col gap-10">
        <TableOne />
       {/*  <TableTwo />
        <TableThree /> */}
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;