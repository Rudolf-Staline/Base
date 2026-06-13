import { useEffect, useState } from "react";
import { createMockClient } from "@basekit/api";
import {
  ButtonView,
  CardContentView,
  CardHeaderView,
  CardView,
  DescriptionListView,
  ErrorStateView,
  SkeletonView,
  StackView,
} from "@basekit/ui";

type Profile = { name: string; email: string; plan: string };

// A mock client stands in for a real `createApiClient({ baseUrl, getToken })`.
const api = createMockClient(
  [
    {
      method: "GET",
      path: "/me",
      response: { name: "Rudolf", email: "rudolf@example.com", plan: "Pro" },
      delay: 700,
    },
    { method: "GET", path: "/me/fail", status: 500, delay: 600 },
  ],
  { defaultDelay: 500 },
);

export const ApiDemo = () => {
  const [path, setPath] = useState("/me");
  const [tick, setTick] = useState(0);
  const [state, setState] = useState<{
    loading: boolean;
    data?: Profile;
    error?: string;
  }>({
    loading: true,
  });

  useEffect(() => {
    let active = true;
    setState({ loading: true });
    api
      .get<Profile>(path)
      .then((data) => active && setState({ loading: false, data }))
      .catch(
        (err) =>
          active &&
          setState({ loading: false, error: String(err.message ?? err) }),
      );
    return () => {
      active = false;
    };
  }, [path, tick]);

  return (
    <CardView className="mx-auto max-w-xl">
      <CardHeaderView
        title="Couche API"
        description="@basekit/api : loading, succès et erreur via un client mock."
      />
      <CardContentView>
        <StackView gap="md">
          <div className="flex gap-2">
            <ButtonView
              text="GET /me"
              variant={path === "/me" ? "solid" : "outline"}
              onClick={() => setPath("/me")}
            />
            <ButtonView
              text="GET /me/fail"
              tone="danger"
              variant={path === "/me/fail" ? "solid" : "outline"}
              onClick={() => setPath("/me/fail")}
            />
          </div>

          {state.loading ? (
            <SkeletonView lines={3} />
          ) : state.error ? (
            <ErrorStateView
              title="Requête échouée"
              description={state.error}
              action={
                <ButtonView
                  text="Réessayer"
                  size="sm"
                  onClick={() => setTick((t) => t + 1)}
                />
              }
            />
          ) : state.data ? (
            <DescriptionListView
              columns={2}
              items={[
                { term: "Nom", description: state.data.name },
                { term: "Email", description: state.data.email },
                { term: "Plan", description: state.data.plan },
              ]}
            />
          ) : null}
        </StackView>
      </CardContentView>
    </CardView>
  );
};
