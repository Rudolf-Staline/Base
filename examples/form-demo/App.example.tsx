/**
 * Form demo — reference snippet (not compiled by the monorepo).
 */
import { useState } from "react";
import {
  ButtonView,
  FormActionsView,
  FormSectionView,
  FormView,
  InputView,
  SelectView,
} from "@basekit/ui";

type State = { name: string; role: string };

export const FormExample = () => {
  const [state, setState] = useState<State>({ name: "", role: "" });
  const [error, setError] = useState<string | undefined>();

  const submit = () => {
    if (!state.name) {
      setError("Le nom est requis");
      return;
    }
    setError(undefined);
    // call your API here, e.g. api.post("/profile", state)
  };

  return (
    <FormView onSubmit={submit}>
      <FormSectionView title="Profil">
        <InputView
          label="Nom"
          required
          value={state.name}
          error={error}
          onChangeValue={(name) => setState((s) => ({ ...s, name }))}
        />
        <SelectView
          label="Rôle"
          value={state.role}
          placeholder="Choisir…"
          onValueChange={(role) => setState((s) => ({ ...s, role }))}
          options={[
            { label: "Admin", value: "admin" },
            { label: "Éditeur", value: "editor" },
          ]}
        />
      </FormSectionView>
      <FormActionsView>
        <ButtonView text="Annuler" variant="ghost" type="reset" />
        <ButtonView text="Enregistrer" tone="primary" type="submit" />
      </FormActionsView>
    </FormView>
  );
};
