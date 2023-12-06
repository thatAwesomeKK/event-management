"use client";
import { PropsWithChildren, useState } from "react";
import { trpc } from "@/app/_trpc/client";
import { httpBatchLink } from "@trpc/client";
import SuperJSON from "superjson";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const TRPCProvider = ({ children }: PropsWithChildren) => {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: `${process.env.NEXT_PUBLIC_URL}/api/trpc`,
        }),
      ],
      transformer: SuperJSON,
    })
  );
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
};

export default TRPCProvider;
