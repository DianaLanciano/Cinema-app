import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAuthStore from "../store/useAuthStore";

const useLogout = () => {

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
     // Get the adminLogout function from Zustand store
     const adminLogout = useAuthStore((state) => state.adminLogout);

    const logout = async () => {
        setLoading(true);
        try {
            const res = await fetch("http://localhost:8000/api/auth/logout", {
                method: "POST",
                headers: { "Content-Type": "application/json" }
            });

            const data = await res.json();
            if(data.error) throw new Error(data.error);

            localStorage.removeItem("cinema-admin");
            adminLogout(); // Clear admin state
            navigate("/"); // Redirect to the root page

        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    return { loading, logout }
}

export default useLogout;