import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";

interface UserInfoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface UserInfo {
  ip: string;
  browser: string;
  location: string;
  country: string;
}

export function UserInfoModal({ open, onOpenChange }: UserInfoModalProps) {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (open) {
      setLoading(true);
      // Get browser info
      const browser = navigator.userAgent;
      
      // Fetch IP and location info
      fetch("https://ipapi.co/json/")
        .then((res) => res.json())
        .then((data) => {
          setUserInfo({
            ip: data.ip,
            browser: browser,
            location: `${data.city}, ${data.region}`,
            country: data.country_name,
          });
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching user info:", error);
          setLoading(false);
        });
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl mb-4">Your Digital Identity</DialogTitle>
        </DialogHeader>
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          </div>
        ) : (
          <div className="space-y-4">
            {userInfo && (
              <>
                <InfoItem label="IP Address" value={userInfo.ip} />
                <InfoItem label="Browser" value={userInfo.browser} />
                <InfoItem label="Location" value={userInfo.location} />
                <InfoItem label="Country" value={userInfo.country} />
              </>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-secondary/50 p-3 rounded-lg">
      <p className="text-sm text-muted-foreground mb-1">{label}</p>
      <p className="text-sm font-medium">{value}</p>
    </div>
  );
}