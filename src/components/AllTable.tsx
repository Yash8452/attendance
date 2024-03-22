"use client";
import { Table } from "flowbite-react";
import Skeleton from "./Skeleton";

export default function AllTable({ users }: any) {
  return (
    <>
      <div className="mt-8 w-full">
        {users && users.length === 0 ? (
          <Skeleton />
        ) : (
          <Table>
            <Table.Head>
              <Table.HeadCell>Name</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Role</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {users.map((user: any) => (
                <Table.Row
                  key={user._id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {user.name}
                  </Table.Cell>
                  <Table.Cell>{user.email}</Table.Cell>
                  <Table.Cell>{user.role}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        )}
      </div>
    </>
  );
}
