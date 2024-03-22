"use client";
import AllTable from "@/components/AllTable";
import Layout from "@/components/Layout";
import React, { useEffect, useState } from "react";

export default function UserPage() {
  const [users, setUser] = useState([]);
  const fetchUsers = async () => {
    try {
      let response: any = await fetch("/api/users/get-users");
      response = await response.json();
      const data = response.users;
      console.log(data);
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Layout>
      <AllTable users={users} />
    </Layout>
  );
}
