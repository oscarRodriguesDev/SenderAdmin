import Breadcrumb from "@/components/dashComponents/Breadcrumbs/Breadcrumb"
import DefaultLayout from "@/components/dashComponents/Layouts/DefaultLaout"
import SettingsUsers from "@/components/dashComponents/SettingBoxes/editUser"
export default function SettingsUser() {

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Settings User" />
            <SettingsUsers />
        </DefaultLayout>
    )
}