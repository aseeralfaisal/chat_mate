"use client";

import React from "react";
import { LoginCard } from "@/app/components";

const Home: React.FC = () => {
  return (
    <div className="h-screen pb-20 w-full bg-slate-900 flex justify-center items-center">
      <LoginCard />
    </div>
  );
}

export default Home;
