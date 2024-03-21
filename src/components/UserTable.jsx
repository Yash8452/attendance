"use client";
import React, { useState } from "react";

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
        user._id
        // att.userId === user._id
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
        <>
          <h1>No users found</h1>
        </>
      ) : (
        <>
          <div>
            {/* Input field to select the date */}
            <input
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
            />
          </div>
          <>
            {filteredUsers.length === 0 ? (
              <h1>No users found for selected date</h1>
            ) : (
              <>
                <div className="flex justify-around space-x-2">
                  <h1>Name</h1>
                  <h1 className="text-center">Email</h1>
                  <h1 className="text-center">Status</h1>
                  <h1 className="text-center">Date</h1>
                </div>
                {filteredUsers.map((user) => (
                  <div className="flex justify-around space-x-2" key={user._id}>
                    <h1 className="text-center">{user.name}</h1>
                    <h1 className="text-center">{user.email}</h1>
                    {/* Find the attendance record for the user and display status and date */}
                    <h1 className="text-center">
                      {attendance.find(
                        (att) => att.userId === user._id && att.status
                      )?.status || "N/A"}
                    </h1>
                    <h1 className="text-center">
                      {attendance.find(
                        (att) => att.userId === user._id && att.date
                      )?.date
                        ? formatDate(
                            attendance.find(
                              (att) => att.userId === user._id && att.date
                            ).date
                          )
                        : "N/A"}
                    </h1>

                    <select
                      onChange={(e) =>
                        handleMarkAttendance(user._id, e.target.value)
                      }
                    >
                      <option value="">Mark Attendance</option>
                      <option value="PRESENT">Present</option>
                      <option value="ABSENT">Absent</option>
                    </select>
                  </div>
                ))}
              </>
            )}
          </>
        </>
      )}
    </>
  );
}
