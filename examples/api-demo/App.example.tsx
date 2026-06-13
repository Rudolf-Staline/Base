/**
 * API demo — reference snippet (not compiled by the monorepo).
 */
import { useEffect, useState } from "react";
import { createApiClient, ApiError } from "@basekit/api";
import { DescriptionListView, ErrorStateView, SkeletonView } from "@basekit/ui";

type User = { name: string; email: string };

// Production client. Swap for createMockClient in demos/tests.
const api = createApiClient({
  baseUrl: import.meta.env.VITE_API_URL ?? "https://api.example.com",
  getToken: () => localStorage.getItem("token"),
  timeoutMs: 10000,
});

export const ApiExample = () => {
  const [state, setState] = useState<{ loading: boolean; user?: User; error?: string }>({
    loading: true,
  });

  useEffect(() => {
    let active = true;
    api
      .get<User>("/me")
      .then((user) => active && setState({ loading: false, user }))
      .catch((err: unknown) => {
        const message = err instanceof ApiError ? err.message : String(err);
        if (active) setState({ loading: false, error: message });
      });
    return () => {
      active = false;
    };
  }, []);

  if (state.loading) return <SkeletonView lines={3} />;
  if (state.error) return <ErrorStateView title="Échec" description={state.error} />;
  return (
    <DescriptionListView
      items={[
        { term: "Nom", description: state.user?.name },
        { term: "Email", description: state.user?.email },
      ]}
    />
  );
};
