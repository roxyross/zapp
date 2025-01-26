"use client"

import Link from "next/link";
import HomePage from "../page";
import { Button } from "@/components/ui/button";

const SuccessPage = () => (
    <div className="text-center">
      <h1 className="text-2xl font-semibold">order Successful!</h1>
      <p>Your order has been processed successfully. Thank you for your purchase!</p>
      <Link href="/" className=" text-blue-500 hover:underline">
      <Button className="mt-4">Continue Shopping</Button>
      </Link>
    </div>
  );
  
  export default SuccessPage;
  