"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function useAuthGuard() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const auth = localStorage.getItem("auth");

    if (!auth) {
      router.replace("/examination/admin");
      return;
    }

    const parsed = JSON.parse(auth);

    if (!parsed.sessionKey) {
      router.replace("/examination/admin");
      return;
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsAuthorized(true);
    setChecking(false);
  }, [router]);

  return { isAuthorized, checking };
}
