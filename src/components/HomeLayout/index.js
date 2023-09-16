import React from 'react';
export default function HomeLayout({
  children
}) {
  return (
    <div className="flex flex-col items-center w-full ">
      {children}
    </div>
  );
}