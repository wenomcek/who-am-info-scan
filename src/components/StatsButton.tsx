import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { BarChart3 } from "lucide-react";
import { UserCounter } from "./UserCounter";

export function StatsButton() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="bg-gray-800/50 backdrop-blur-sm">
          <BarChart3 className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-gray-800/90 backdrop-blur-sm border-gray-700 w-48 p-4">
        <UserCounter />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}