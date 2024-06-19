import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb"
import DefaultLayout from "../../components/Layouts/DefaultLaout"
import SettingsUsers from "../../components/SettingBoxes/editUser"
export default function SettingsUser() {

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Settings User" />
            <SettingsUsers />
        </DefaultLayout>
    )
}