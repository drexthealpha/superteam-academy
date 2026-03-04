"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useWallet } from "@/hooks/use-wallet";
import { supabase } from "@/lib/supabase";

interface EnrollmentGateProps {
  courseSlug: string;
  locale: string;
  children: React.ReactNode;
}

export function EnrollmentGate({ courseSlug, locale, children }: EnrollmentGateProps) {
  const { address, authenticated, ready } = useWallet();
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [enrolled, setEnrolled] = useState(false);

  useEffect(() => {
    if (!ready) return;

    if (!authenticated || !address) {
      router.replace(`/${locale}/courses/${courseSlug}`);
      return;
    }

    async function checkEnrollment() {
      const { data } = await supabase
        .from("enrollments")
        .select("course_id")
        .eq("user_wallet", address)
        .eq("course_id", courseSlug)
        .maybeSingle();

      if (!data) {
        router.replace(`/${locale}/courses/${courseSlug}`);
        return;
      }

      setEnrolled(true);
      setChecking(false);
    }

    checkEnrollment();
  }, [ready, authenticated, address, courseSlug, locale, router]);

  if (checking && !enrolled) {
    return (
      <div className="flex h-[calc(100vh-3.5rem)] items-center justify-center bg-background">
        <div className="w-10 h-10 border-3 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}
