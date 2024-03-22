"use client";
import { Table } from "flowbite-react";
import React, { useState } from "react";
import Skeleton from "./Skeleton";

export default function UserTable({ users, attendance }) {
  const [selectedDate, setSelectedDate] = useState(""); // State for selected date
  //   console.log(selectedDate);
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  // Filter users based on the selected date
  const filteredUsers = users.filter((user) =>
    attendance.some((att) => {
      const attendanceDate = att.date;
      return (
        (!selectedDate || formatDate(attendanceDate) === selectedDate) &&
        att.userId === user._id
      );
    })
  );

  const handleMarkAttendance = async (userId, status) => {
    let response = await fetch("/api/attendance/mark-attendance", {
      method: "POST",
      body: JSON.stringify({ userId, status }),
    });
    response = await response.json();
    // console.log(response);
  };

  //   console.log(filteredUsers);

  return (
    <>
      {users && users.length === 0 ? (
        <Skeleton />
      ) : (
        <div className="flex mt-6 flex-col w-full">
          <div className="flex justify-center">
            {/* Input field to select the date */}
            <input
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
            />
          </div>
          {filteredUsers.length === 0 ? (
            <h1>No users found for selected date</h1>
          ) : (
            <div className="mt-8 w-full overflow-x-auto">
              <Table>
                <Table.Head>
                  <Table.HeadCell>Name</Table.HeadCell>
                  <Table.HeadCell>Email</Table.HeadCell>
                  <Table.HeadCell>Status</Table.HeadCell>
                  <Table.HeadCell>Date</Table.HeadCell>
                  <Table.HeadCell>Action</Table.HeadCell>
                </Table.Head>
                <Table.Body>
                  {filteredUsers.map((user) => (
                    <Table.Row
                      key={user._id}
                      className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    >
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {user.name}
                      </Table.Cell>
                      <Table.Cell>{user.email}</Table.Cell>
                      <Table.Cell>
                        {attendance.find((att) => att.userId === user._id)
                          ?.status || "N/A"}
                      </Table.Cell>
                      <Table.Cell>
                        {attendance.find((att) => att.userId === user._id)?.date
                          ? formatDate(
                              attendance.find(
                                (att) => att.userId === user._id && att.date
                              ).date
                            )
                          : "N/A"}
                      </Table.Cell>
                      <Table.Cell>
                        <select
                          onChange={(e) =>
                            handleMarkAttendance(user._id, e.target.value)
                          }
                        >
                          <option value="">Mark Attendance</option>
                          <option value="PRESENT">Present</option>
                          <option value="ABSENT">Absent</option>
                        </select>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </div>
          )}
        </div>
      )}
    </>
  );
}
