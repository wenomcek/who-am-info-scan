import { useState } from "react";
import { UserCounter } from "@/components/UserCounter";
import { LanguageSelector } from "@/components/LanguageSelector";
import { useTranslation } from "react-i18next";
import { EarthGlobe } from "@/components/EarthGlobe";
import { UserInfoDisplay } from "@/components/UserInfoDisplay";
import { Header } from "@/components/Header";
import { ScanButton } from "@/components/ScanButton";
import { StatsButton } from "@/components/StatsButton";
import { supabase } from "@/integrations/supabase/client";
import { AnimatePresence, motion } from "framer-motion";

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
    <div className="min-h-screen w-full relative">
      <div className="fixed inset-0">
        <EarthGlobe targetLocation={userInfo?.coordinates} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-transparent pointer-events-none" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <StatsButton />
          <LanguageSelector />
        </div>
        
        <div className="min-h-screen flex flex-col items-center justify-center -mt-[30vh]">
          <Header />
          
          <div className="w-full max-w-md mx-auto space-y-8 flex flex-col items-center">
            <ScanButton isLoading={isLoading} onClick={handleGetInfo} />
            
            <AnimatePresence>
              {userInfo && (
                <motion.div 
                  initial={{ opacity: 0, x: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: 1, 
                    x: -400,
                    scale: 1,
                    transition: { 
                      duration: 3,
                      x: { delay: 0.5 },
                      opacity: { duration: 0.3 },
                      scale: { duration: 0.3 }
                    }
                  }}
                  exit={{ opacity: 0, x: 0 }}
                  className="fixed left-1/2 top-1/2 -translate-y-1/2 backdrop-blur-sm bg-black/30 p-6 rounded-xl border border-white/10 w-full max-w-md"
                >
                  <UserInfoDisplay userInfo={userInfo} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;