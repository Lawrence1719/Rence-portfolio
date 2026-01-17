"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, Eye, EyeOff, RefreshCw } from "lucide-react";
import { getLoginAttempts } from "../projects/actions";
import { format } from "date-fns";

interface LoginAttempt {
  id: string;
  email: string;
  ip_address: string;
  user_agent: string;
  success: boolean;
  error_message: string | null;
  attempted_at: string;
}

export default function LoginAttemptsPage() {
  const [attempts, setAttempts] = useState<LoginAttempt[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  const fetchAttempts = async () => {
    try {
      setLoading(true);
      const data = await getLoginAttempts();
      setAttempts(data);
    } catch (error) {
      console.error("Failed to fetch login attempts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttempts();
  }, []);

  const displayedAttempts = showAll ? attempts : attempts.slice(0, 20);

  const getDeviceInfo = (userAgent: string) => {
    const ua = userAgent.toLowerCase();
    if (ua.includes('mobile')) return 'Mobile';
    if (ua.includes('tablet')) return 'Tablet';
    return 'Desktop';
  };

  const getBrowserInfo = (userAgent: string) => {
    const ua = userAgent.toLowerCase();
    if (ua.includes('chrome') && !ua.includes('edg')) return 'Chrome';
    if (ua.includes('firefox')) return 'Firefox';
    if (ua.includes('safari') && !ua.includes('chrome')) return 'Safari';
    if (ua.includes('edg')) return 'Edge';
    return 'Unknown';
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Shield className="size-6 text-primary" />
          <h1 className="text-2xl font-mono font-bold">Login Attempts</h1>
        </div>
        <Card className="p-8 border-border/50 bg-card/50 backdrop-blur-sm text-center">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-muted rounded w-1/4 mx-auto"></div>
            <div className="space-y-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-12 bg-muted rounded"></div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Shield className="size-6 text-primary" />
          <h1 className="text-2xl font-mono font-bold">Login Attempts</h1>
          <Badge variant="outline" className="font-mono">
            {attempts.length} total
          </Badge>
        </div>
        <Button
          onClick={fetchAttempts}
          size="sm"
          variant="outline"
          className="font-mono"
        >
          <RefreshCw className="size-4 mr-2" />
          refresh
        </Button>
      </div>

      {/* Attempts List */}
      <div className="space-y-4">
        {displayedAttempts.length === 0 ? (
          <Card className="p-8 border-border/50 bg-card/50 backdrop-blur-sm text-center">
            <p className="text-muted-foreground font-mono">
              no login attempts recorded yet.
            </p>
          </Card>
        ) : (
          <>
            {displayedAttempts.map((attempt) => (
              <Card key={attempt.id} className="p-4 border-border/50 bg-card/50 backdrop-blur-sm">
                <div className="flex items-start justify-between">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2">
                      <Badge
                        className={`font-mono text-xs ${
                          attempt.success
                            ? "bg-green-500/10 text-green-500 border-green-500/30"
                            : "bg-red-500/10 text-red-500 border-red-500/30"
                        }`}
                      >
                        {attempt.success ? "✓ Success" : "✗ Failed"}
                      </Badge>
                      <span className="text-sm text-muted-foreground font-mono">
                        {format(new Date(attempt.attempted_at), "MMM dd, yyyy 'at' HH:mm:ss")}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground font-mono">Email:</span>
                        <p className="font-mono font-medium">{attempt.email}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground font-mono">IP Address:</span>
                        <p className="font-mono font-medium">{attempt.ip_address}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground font-mono">Device:</span>
                        <p className="font-mono font-medium">
                          {getDeviceInfo(attempt.user_agent)} • {getBrowserInfo(attempt.user_agent)}
                        </p>
                      </div>
                    </div>

                    {attempt.error_message && (
                      <div>
                        <span className="text-muted-foreground font-mono">Error:</span>
                        <p className="font-mono text-red-400 text-sm mt-1">{attempt.error_message}</p>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}

            {attempts.length > 20 && (
              <div className="text-center">
                <Button
                  onClick={() => setShowAll(!showAll)}
                  variant="outline"
                  size="sm"
                  className="font-mono"
                >
                  {showAll ? (
                    <>
                      <EyeOff className="size-4 mr-2" />
                      show less
                    </>
                  ) : (
                    <>
                      <Eye className="size-4 mr-2" />
                      show all ({attempts.length})
                    </>
                  )}
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}