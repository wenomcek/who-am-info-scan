import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UserCounter } from "@/components/UserCounter";
import { motion } from "framer-motion";
import { Loader2, Globe, Monitor, MapPin, Flag } from "lucide-react";
import { LanguageSelector } from "@/components/LanguageSelector";
import { useTranslation } from "react-i18next";
import { EarthGlobe } from "@/components/EarthGlobe";
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

      // Store visit in database
      await supabase.from('visits').insert({
        user_ip: data.ip,
        user_browser: browser,
        user_location: `${data.city}, ${data.region}`,
        user_country: data.country_name
      });

      // Update online users
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
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-white">
      <EarthGlobe targetLocation={userInfo?.coordinates} />
      <LanguageSelector />
      
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12 relative z-10"
      >
        <h1 className="text-6xl font-bold mb-4 text-gray-900">
          {t('title')}
        </h1>
        <p className="text-lg text-gray-600 max-w-md mx-auto">
          {t('subtitle')}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="relative z-10"
      >
        <Button
          onClick={handleGetInfo}
          disabled={isLoading}
          className="text-lg px-8 py-6 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-900 border border-gray-300 transition-all duration-300 shadow-lg disabled:opacity-50 relative overflow-hidden group"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              {t('scanning')}
            </>
          ) : (
            t('getInfo')
          )}
        </Button>
      </motion.div>

      {userInfo && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 space-y-4 w-full max-w-md"
        >
          <div className="bg-gray-100 p-4 rounded-xl border border-gray-200">
            <div className="flex items-center gap-3">
              <Globe className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">{t('ipAddress')}</p>
                <p className="text-sm font-medium text-gray-900">{userInfo.ip}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-100 p-4 rounded-xl border border-gray-200">
            <div className="flex items-center gap-3">
              <Monitor className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">{t('browser')}</p>
                <p className="text-sm font-medium text-gray-900">{userInfo.browser}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-100 p-4 rounded-xl border border-gray-200">
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">{t('location')}</p>
                <p className="text-sm font-medium text-gray-900">{userInfo.location}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-100 p-4 rounded-xl border border-gray-200">
            <div className="flex items-center gap-3">
              <Flag className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">{t('country')}</p>
                <p className="text-sm font-medium text-gray-900">{userInfo.country}</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      <UserCounter className="mt-12 relative z-10" />
    </div>
  );
};

export default Index;