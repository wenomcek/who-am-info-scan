import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";

export const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="bg-gray-800/50 backdrop-blur-sm">
            <Globe className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-gray-800/90 backdrop-blur-sm border-gray-700">
          <DropdownMenuItem onClick={() => changeLanguage('en')}>
            English
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => changeLanguage('es')}>
            Español
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};