import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";

const languages = {
  en: "English",
  es: "Español",
  fr: "Français",
  de: "Deutsch",
  it: "Italiano",
  pt: "Português",
  ru: "Русский",
  zh: "中文",
  ja: "日本語",
  ko: "한국어",
  ar: "العربية",
  hi: "हिन्दी",
  tr: "Türkçe",
  nl: "Nederlands",
  pl: "Polski",
  vi: "Tiếng Việt",
  th: "ไทย",
  cs: "Čeština",
  el: "Ελληνικά",
  he: "עברית",
  id: "Bahasa Indonesia",
  ro: "Română",
  sv: "Svenska",
  da: "Dansk",
  fi: "Suomi",
  no: "Norsk",
  hu: "Magyar",
  sk: "Slovenčina",
  uk: "Українська",
  bg: "Български",
  hr: "Hrvatski"
};

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
        <DropdownMenuContent className="bg-gray-800/90 backdrop-blur-sm border-gray-700 max-h-[80vh] overflow-y-auto">
          {Object.entries(languages).map(([code, name]) => (
            <DropdownMenuItem key={code} onClick={() => changeLanguage(code)}>
              {name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};