import { redirect, RedirectType } from "next/navigation";
export default function AboutPage() {
    redirect('/', "replace" as RedirectType);
}