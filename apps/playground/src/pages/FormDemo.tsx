import { useState } from "react";
import {
  ButtonView,
  CardContentView,
  CardView,
  FormActionsView,
  FormSectionView,
  FormView,
  InputView,
  SelectView,
  SwitchView,
  TextareaView,
  useToast,
} from "@basekit/ui";

type ProfileState = {
  name: string;
  email: string;
  role: string;
  bio: string;
  newsletter: boolean;
};
type Errors = Partial<Record<keyof ProfileState, string>>;

export const FormDemo = () => {
  const toast = useToast();
  const [state, setState] = useState<ProfileState>({
    name: "",
    email: "",
    role: "",
    bio: "",
    newsletter: true,
  });
  const [errors, setErrors] = useState<Errors>({});

  const set = <K extends keyof ProfileState>(key: K, value: ProfileState[K]) =>
    setState((prev) => ({ ...prev, [key]: value }));

  const submit = () => {
    const next: Errors = {};
    if (!state.name) next.name = "Le nom est requis";
    if (!/^[^@]+@[^@]+\.[^@]+$/.test(state.email))
      next.email = "Email invalide";
    if (!state.role) next.role = "Sélectionnez un rôle";
    setErrors(next);
    if (Object.keys(next).length === 0) {
      toast.push({ title: "Profil enregistré", tone: "success" });
    } else {
      toast.push({ title: "Corrigez les erreurs", tone: "danger" });
    }
  };

  return (
    <CardView className="mx-auto max-w-2xl">
      <CardContentView>
        <FormView onSubmit={submit}>
          <FormSectionView
            title="Profil"
            description="Formulaire contrôlé avec validation simple."
          >
            <InputView
              label="Nom"
              value={state.name}
              onChangeValue={(v) => set("name", v)}
              error={errors.name}
              required
            />
            <InputView
              label="Email"
              type="email"
              value={state.email}
              onChangeValue={(v) => set("email", v)}
              error={errors.email}
              required
            />
            <SelectView
              label="Rôle"
              value={state.role}
              placeholder="Choisir un rôle"
              onValueChange={(v) => set("role", v)}
              error={errors.role}
              required
              options={[
                { label: "Administrateur", value: "admin" },
                { label: "Éditeur", value: "editor" },
                { label: "Lecteur", value: "viewer" },
              ]}
            />
            <TextareaView
              label="Bio"
              value={state.bio}
              onChangeValue={(v) => set("bio", v)}
              rows={3}
              helperText="Optionnel"
            />
            <SwitchView
              label="Recevoir la newsletter"
              checked={state.newsletter}
              onChange={(v) => set("newsletter", v)}
            />
          </FormSectionView>
          <FormActionsView>
            <ButtonView text="Annuler" variant="ghost" type="reset" />
            <ButtonView text="Enregistrer" tone="primary" type="submit" />
          </FormActionsView>
        </FormView>
      </CardContentView>
    </CardView>
  );
};
