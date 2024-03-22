"use client";

import Layout from "@/components/Layout";
import React from "react";

export default function AboutPage() {
  return (
    <Layout>
      <div>
        <div className="mx-auto max-w-7xl px-4">
          {/* Hero Map */}
          <div className="flex flex-col space-y-8 pb-10 pt-12 md:pt-24">
            <div className="max-w-max rounded-full border bg-gray-50 p-1 px-3">
              <p className="text-xs font-semibold leading-normal md:text-sm">
                How to use
              </p>
            </div>
            <p className="text-3xl font-bold text-gray-900 md:text-5xl md:leading-10">
              Made with love, right here in India
            </p>
            <p className="max-w-4xl text-base text-gray-600 md:text-xl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
              veritatis voluptates neque itaque repudiandae sint, explicabo
              assumenda quam ratione placeat?
            </p>
          </div>
          <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-4">How to Use</h1>
            <div className="max-w-lg mx-auto">
              <p className="text-lg mb-4">
                Welcome to our application! Here's a guide on how to use it:
              </p>
              <ol className="list-decimal pl-4">
                <li className="mb-2">Step 1: Sign up for an account.</li>
                <li className="mb-2">Step 2: Log in to your account.</li>
                <li className="mb-2">
                  Step 3: Navigate to the desired feature.
                </li>
              </ol>
              <p className="text-lg mt-2 mb-4">
                Here are some key features of our application:
              </p>
              <ul className="list-disc pl-4">
                <li className="mb-2">
                  Feature 1: Only admin has the login access.
                </li>
                <li className="mb-2">
                  Feature 2: If u are the user just register
                </li>
                <li className="mb-2">Feature 3: Filter with date.</li>
              </ul>
              <p className="text-lg mt-4">
                That's it! You're now ready to use our application.
              </p>
            </div>
          </div>
          <hr className="mt-20" />
        </div>
        <hr className="mt-6" />
      </div>
    </Layout>
  );
}
