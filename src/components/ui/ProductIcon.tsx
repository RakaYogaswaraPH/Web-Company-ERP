import React from "react";
import { Archive, Droplet, Receipt, Users, Clock, LucideProps } from "lucide-react";
import { Product } from "@/types";

interface ProductIconProps extends LucideProps {
  name: Product["icon"];
}

export function ProductIcon({ name, ...props }: ProductIconProps) {
  switch (name) {
    case "archive":
      return <Archive {...props} />;
    case "droplet":
      return <Droplet {...props} />;
    case "receipt":
      return <Receipt {...props} />;
    case "users":
      return <Users {...props} />;
    case "clock":
      return <Clock {...props} />;
    default:
      return <Archive {...props} />;
  }
}
