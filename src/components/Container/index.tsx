import { cn } from "@/lib/utils";
import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function Container({
  children,
  className = "",
}: Readonly<ContainerProps>) {
  return (
    <section
      className={cn("px-4 xs:px-0 md:px-20 container mx-auto", className)}
    >
      {children}
    </section>
  );
}
