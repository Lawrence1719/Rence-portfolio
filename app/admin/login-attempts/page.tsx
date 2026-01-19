"use client";

import { useState, useEffect, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, Eye, EyeOff, RefreshCw, ArrowLeft, Trash2, BarChart3, Search, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import { getLoginAttempts, cleanupOldLoginAttempts, getLoginAttemptsStats, deleteLoginAttempt } from "../projects/actions";
import { format } from "date-fns";
import Link from "next/link";
import { toast } from "sonner";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

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
  const [stats, setStats] = useState<{
    total: number;
    successful: number;
    failed: number;
    recent: number;
  } | null>(null);
  const [cleaningUp, setCleaningUp] = useState(false);
  const [showCleanupDialog, setShowCleanupDialog] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // New state for search, filter, and pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "success" | "failed">("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);

  const fetchAttempts = async () => {
    try {
      setLoading(true);
      const [attemptsData, statsData] = await Promise.all([
        getLoginAttempts(1000), // Get more attempts for filtering/pagination
        getLoginAttemptsStats()
      ]);
      setAttempts(attemptsData);
      setStats(statsData);
    } catch (error) {
      console.error("Failed to fetch login attempts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAttempt = async (id: string) => {
    try {
      setDeletingId(id);
      await deleteLoginAttempt(id);
      toast.success("Login attempt deleted successfully!");
      await fetchAttempts(); // Refresh data
    } catch (error) {
      console.error("Failed to delete login attempt:", error);
      toast.error("Failed to delete login attempt");
    } finally {
      setDeletingId(null);
    }
  };

  const handleCleanup = async () => {
    console.log('Starting cleanup process...');
    try {
      setCleaningUp(true);
      // Use 7 days instead of 1 hour for more reasonable cleanup
      const result = await cleanupOldLoginAttempts(7);
      console.log('Cleanup completed, result:', result);
      toast.success(`Old login attempts cleaned up successfully! Deleted ${(result as any)?.length || 0} records.`);
      await fetchAttempts(); // Refresh data
    } catch (error) {
      console.error('Failed to cleanup old attempts:', error);
      toast.error('Failed to cleanup old login attempts');
    } finally {
      setCleaningUp(false);
      setShowCleanupDialog(false);
    }
  };

  useEffect(() => {
    fetchAttempts();
  }, []);

  // Filter and search logic
  const filteredAttempts = useMemo(() => {
    return attempts.filter((attempt) => {
      // Status filter
      if (statusFilter !== "all") {
        if (statusFilter === "success" && !attempt.success) return false;
        if (statusFilter === "failed" && attempt.success) return false;
      }

      // Search filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        return (
          attempt.email.toLowerCase().includes(searchLower) ||
          attempt.ip_address.toLowerCase().includes(searchLower) ||
          attempt.user_agent.toLowerCase().includes(searchLower) ||
          (attempt.error_message && attempt.error_message.toLowerCase().includes(searchLower))
        );
      }

      return true;
    });
  }, [attempts, searchTerm, statusFilter]);

  // Pagination logic
  const totalPages = Math.ceil(filteredAttempts.length / itemsPerPage);
  const paginatedAttempts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAttempts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAttempts, currentPage, itemsPerPage]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);

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
          <Link href="/admin">
            <Button variant="ghost" size="sm" className="font-mono">
              <ArrowLeft className="size-4 mr-2" />
              back
            </Button>
          </Link>
          <Shield className="size-6 text-primary" />
          <div>
            <h1 className="text-2xl font-mono font-bold">Login Attempts</h1>
            {stats && (
              <p className="text-sm text-muted-foreground font-mono">
                {stats.total} total • {stats.successful} successful • {stats.failed} failed • {stats.recent} in last 24h
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <AlertDialog open={showCleanupDialog} onOpenChange={setShowCleanupDialog}>
            <AlertDialogTrigger asChild>
              <Button
                size="sm"
                variant="destructive"
                className="font-mono"
                disabled={cleaningUp}
              >
                <Trash2 className="size-4 mr-2" />
                {cleaningUp ? 'cleaning...' : 'cleanup old'}
              </Button>
            </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="font-mono">cleanup old login attempts</AlertDialogTitle>
                  <AlertDialogDescription className="font-mono">
                    this will permanently delete all login attempts older than 7 days. this action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="font-mono">cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleCleanup}
                  className="font-mono bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  disabled={cleaningUp}
                >
                  {cleaningUp ? 'cleaning...' : 'delete old attempts'}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
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
      </div>

      {/* Search and Filter */}
      <Card className="p-4 border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                placeholder="Search by email, IP, user agent, or error message..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 font-mono"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="size-4 text-muted-foreground" />
            <Select value={statusFilter} onValueChange={(value: "all" | "success" | "failed") => setStatusFilter(value)}>
              <SelectTrigger className="w-32 font-mono">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className="font-mono">All</SelectItem>
                <SelectItem value="success" className="font-mono">Success</SelectItem>
                <SelectItem value="failed" className="font-mono">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="mt-2 text-sm text-muted-foreground font-mono">
          Showing {paginatedAttempts.length} of {filteredAttempts.length} attempts
        </div>
      </Card>

      {/* Attempts List */}
      <div className="space-y-4">
        {filteredAttempts.length === 0 ? (
          <Card className="p-8 border-border/50 bg-card/50 backdrop-blur-sm text-center">
            <p className="text-muted-foreground font-mono">
              {attempts.length === 0 ? "no login attempts recorded yet." : "no attempts match your search criteria."}
            </p>
          </Card>
        ) : (
          <>
            {paginatedAttempts.map((attempt) => (
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
                  <div className="ml-4">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="destructive"
                          className="font-mono"
                          disabled={deletingId === attempt.id}
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle className="font-mono">delete login attempt</AlertDialogTitle>
                          <AlertDialogDescription className="font-mono">
                            this will permanently delete this login attempt. this action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="font-mono">cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeleteAttempt(attempt.id)}
                            className="font-mono bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            disabled={deletingId === attempt.id}
                          >
                            {deletingId === attempt.id ? 'deleting...' : 'delete'}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </Card>
            ))}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground font-mono">
                  Page {currentPage} of {totalPages}
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    size="sm"
                    variant="outline"
                    className="font-mono"
                  >
                    <ChevronLeft className="size-4" />
                    Previous
                  </Button>
                  <Button
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    size="sm"
                    variant="outline"
                    className="font-mono"
                  >
                    Next
                    <ChevronRight className="size-4" />
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}