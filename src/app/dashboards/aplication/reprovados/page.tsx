import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import TableOne from "../../components/Tables/reprovedTables";
import TableThree from "../../components/Tables/TableThree";
import TableTwo from "../../components/Tables/TableTwo";

import { Metadata } from "next";
import DefaultLayout from "../../components/Layouts/DefaultLaout";

export const metadata: Metadata = {
  title: "unaprouved users",
  description: "Lista com os usuarios com atestados não aprovados",
};

const TablesPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="unapproved users" />

      <div className="flex flex-col gap-10">
        <TableOne />
       {/*  <TableTwo />
        <TableThree /> */}
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;