import { redirect } from "next/navigation";

export default function PaymnetRedirect() {
  redirect("/policies/payment");
}