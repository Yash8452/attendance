"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"; // Import `useState` for managing state
import UserTable from "@/components/UserTable";
import SlideBar from "@/components/SlideBar";
import Layout from "@/components/Layout";
export default function Home() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false); // State for authorization status

  useEffect(() => {
    fetchUsers();
    fetchAttendance();
    const role = sessionStorage.getItem("role");
    console.log(role);
    const authorized = role === "ADMIN"; // Check if user is authorized based on role
    setIsAuthorized(authorized); // Update the state based on authorization status

    if (!authorized) {
      router.push("/auth"); // Redirect to the auth page if user is not authorized
    }
  }, [router]); // Include `router` in the dependency array to avoid a missing dependency warning

  const [users, setUser] = useState([]);
  const [attendance, setAttendance] = useState([]);

  const fetchUsers = async () => {
    let response: any = await fetch("/api/users/get-users");
    response = await response.json();
    const data = response.users;
    setUser(data);
    // console.log(response);
  };
  const fetchAttendance = async () => {
    let response: any = await fetch(
      "/api/attendance/get-attendance/all-attendance"
    );
    response = await response.json();
    const data = response.attendances;
    setAttendance(data);
    // console.log(response);
  };
  return (
    <>
      <>
        {isAuthorized ? (
          <>
            <Layout>
              <UserTable users={users} attendance={attendance} />
            </Layout>
          </>
        ) : (
          <h1 className="mt-24 md:text-4xl font-bold text-center">
            Your are not authorized or please wait.
          </h1>
        )}
      </>
    </>
  );
}
