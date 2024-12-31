import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";

interface UserCounterProps {
  className?: string;
}

export function UserCounter({ className = "" }: UserCounterProps) {
  const [count, setCount] = useState(0);
  const { t } = useTranslation();

  useEffect(() => {
    // Initial fetch of visit count
    const fetchVisitCount = async () => {
      const { count } = await supabase
        .from('visits')
        .select('*', { count: 'exact', head: true });
      
      setCount(count || 0);
    };

    fetchVisitCount();

    // Subscribe to changes
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'visits'
        },
        () => {
          setCount(c => c + 1);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className={`text-muted-foreground ${className}`}>
      <p className="text-sm">
        {t("totalScans")}: <span className="font-bold text-blue-400">{count.toLocaleString()}</span>
      </p>
    </div>
  );
}