import React from "react";

const layout = ({ children }) => {
  return (
    <main className="w-full">
      <section className="flex items-center justify-center h-full">
        <div className="max-w-7xl w-full p-10">
           {children}
        </div>
      </section>
    </main>
  );
};

export default layout;
