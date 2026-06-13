import { useState } from "react";
import {
  AlertView,
  AvatarView,
  ButtonView,
  CardContentView,
  CardView,
  CheckboxView,
  DateInputView,
  DropdownView,
  IconButtonView,
  InputView,
  MetricCardView,
  ModalView,
  ProgressView,
  RenderNode,
  SectionView,
  SelectView,
  StackView,
  SwitchView,
  TabsView,
  TextView,
  TextareaView,
  Card,
  CardContent,
  CardHeader,
  Text,
} from "@basekit/ui";

export const Components = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [date, setDate] = useState("2026-06-13");
  const [agree, setAgree] = useState(false);

  // A card built entirely from declarative factories, then rendered.
  const declarativeCard = Card({
    variant: "elevated",
    children: [
      CardHeader({
        title: "Déclaratif",
        description: "Cette carte est créée par fonctions.",
      }),
      CardContent({
        children: Text({
          value: "Rendue ensuite par le renderer React via RenderNode.",
          tone: "neutral",
        }),
      }),
    ],
  });

  return (
    <StackView gap="xl">
      <SectionView
        title="Champs de formulaire"
        description="Contrôlés, accessibles (label, aria-invalid, aria-describedby)."
      >
        <CardView>
          <CardContentView>
            <div className="grid gap-4 md:grid-cols-2">
              <InputView
                label="Nom"
                placeholder="Rudolf"
                helperText="Texte d'aide"
                leftSlot={<span className="text-muted-foreground">@</span>}
              />
              <InputView
                label="Email"
                type="email"
                error="Adresse invalide"
                defaultValue="not-an-email"
                required
              />
              <DateInputView
                label="Date"
                clearable
                value={date}
                onValueChange={setDate}
              />
              <SelectView
                label="Rôle"
                placeholder="Choisir…"
                options={[
                  { label: "Administrateur", value: "admin" },
                  { label: "Éditeur", value: "editor" },
                  { label: "Lecteur", value: "viewer" },
                ]}
              />
              <TextareaView label="Notes" placeholder="Décrivez…" rows={3} />
              <StackView gap="md">
                <CheckboxView
                  label="J'accepte les conditions"
                  description="Obligatoire pour continuer"
                  checked={agree}
                  onChange={setAgree}
                />
                <SwitchView label="Notifications" defaultChecked />
              </StackView>
            </div>
          </CardContentView>
        </CardView>
      </SectionView>

      <SectionView title="Feedback">
        <StackView gap="md">
          <AlertView tone="success" title="Sauvegardé">
            Vos changements ont été enregistrés.
          </AlertView>
          <AlertView tone="warning" title="Attention">
            Le quota approche de sa limite.
          </AlertView>
          <AlertView tone="danger" title="Erreur" onClose={() => undefined}>
            Impossible de contacter le serveur.
          </AlertView>
          <ProgressView
            value={64}
            showValue
            label="Entraînement du modèle"
            tone="primary"
          />
        </StackView>
      </SectionView>

      <SectionView title="Actions & overlays">
        <div className="flex flex-wrap items-center gap-3">
          <ButtonView
            text="Ouvrir une modale"
            onClick={() => setModalOpen(true)}
          />
          <IconButtonView
            icon="settings"
            aria-label="Réglages"
            variant="outline"
          />
          <IconButtonView
            icon="trash"
            aria-label="Supprimer"
            tone="danger"
            variant="soft"
          />
          <DropdownView
            trigger={
              <ButtonView
                text="Menu"
                iconRight="chevron-down"
                variant="outline"
              />
            }
            items={[
              {
                id: "edit",
                label: "Modifier",
                icon: "settings",
                onSelect: () => undefined,
              },
              {
                id: "del",
                label: "Supprimer",
                icon: "trash",
                tone: "danger",
                onSelect: () => undefined,
              },
            ]}
          />
          <AvatarView name="Rudolf Staline" />
        </div>
      </SectionView>

      <SectionView title="Onglets">
        <TabsView
          items={[
            {
              id: "metrics",
              label: "Métriques",
              icon: "info",
              content: (
                <MetricCardView
                  label="Accuracy"
                  value="92.4%"
                  tone="success"
                  delta="+1.2%"
                  trend="up"
                />
              ),
            },
            {
              id: "declarative",
              label: "Déclaratif",
              content: <RenderNode node={declarativeCard} />,
            },
            {
              id: "disabled",
              label: "Désactivé",
              content: <TextView value="—" />,
              disabled: true,
            },
          ]}
        />
      </SectionView>

      <ModalView
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Exemple de modale"
        description="Accessible : Escape, clic backdrop, role dialog."
        footer={
          <>
            <ButtonView
              text="Annuler"
              variant="ghost"
              onClick={() => setModalOpen(false)}
            />
            <ButtonView
              text="Confirmer"
              tone="primary"
              onClick={() => setModalOpen(false)}
            />
          </>
        }
      >
        <TextView value="Le contenu de la modale vit dans un portail au-dessus de l'application." />
      </ModalView>
    </StackView>
  );
};
