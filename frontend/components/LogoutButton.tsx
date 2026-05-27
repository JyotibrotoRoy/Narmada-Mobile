import { LogOut } from "lucide-react";
import { signOutAction } from "@/app/actions/auth"; // IMPORTANT: Update this path to match where you saved Step 1

export default function LogoutButton() {
  return (
    <form action={signOutAction}>
      <button
        type="submit"
        className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
      >
        <LogOut className="h-4 w-4" />
        <span>Logout</span>
      </button>
    </form>
  );
}