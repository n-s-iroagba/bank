import { useParams } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";

const AdminDashboardWrapper = () => {
    const { id } = useParams(); // Retrieves the `id` parameter from the URL
  
    return <AdminDashboard adminId={Number(id)} isAdmin={false} />;
  };
  export default AdminDashboardWrapper