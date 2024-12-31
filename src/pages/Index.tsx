import { useState } from "react";
import { UserCounter } from "@/components/UserCounter";
import { LanguageSelector } from "@/components/LanguageSelector";
import { useTranslation } from "react-i18next";
import { EarthGlobe } from "@/components/EarthGlobe";
import { UserInfoDisplay } from "@/components/UserInfoDisplay";
import { Header } from "@/components/Header";
import { ScanButton } from "@/components/ScanButton";
import { supabase } from "@/integrations/supabase/client";

interface UserInfo {
  ip: string;
  browser: string;
  location: string;
  country: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const { t } = useTranslation();

  const handleGetInfo = async () => {
    setIsLoading(true);
    try {
      const browser = navigator.userAgent;
      const response = await fetch("https://ipapi.co/json/");
      const data = await response.json();
      
      const userInfo = {
        ip: data.ip,
        browser: browser,
        location: `${data.city}, ${data.region}`,
        country: data.country_name,
        coordinates: {
          latitude: data.latitude,
          longitude: data.longitude,
        },
      };

      await supabase.from('visits').insert({
        user_ip: data.ip,
        user_browser: browser,
        user_location: `${data.city}, ${data.region}`,
        user_country: data.country_name
      });

      await supabase.from('online_users').upsert(
        { user_ip: data.ip, last_seen_at: new Date().toISOString() },
        { onConflict: 'user_ip' }
      );

      setUserInfo(userInfo);
    } catch (error) {
      console.error("Error fetching user info:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full">
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-b from-black/50 to-transparent z-0" />
      <EarthGlobe targetLocation={userInfo?.coordinates} />
      
      {/* Main content overlay */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-start p-4 pt-20">
        <LanguageSelector />
        <Header />
        
        <ScanButton isLoading={isLoading} onClick={handleGetInfo} />

        {userInfo && <UserInfoDisplay userInfo={userInfo} />}

        <UserCounter className="mt-12 text-white" />
      </div>
    </div>
  );
};

export default Index;