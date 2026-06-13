import { useState } from "react";
import { ReaderLayout, SwitchView } from "@basekit/ui";

const books = [
  "Genèse",
  "Exode",
  "Psaumes",
  "Ésaïe",
  "Matthieu",
  "Jean",
  "Romains",
];

export const ReaderDemo = () => {
  const [focus, setFocus] = useState(false);
  const [active, setActive] = useState("Jean");

  return (
    <ReaderLayout
      focusMode={focus}
      navigation={
        <nav className="space-y-0.5">
          {books.map((book) => (
            <button
              key={book}
              type="button"
              onClick={() => setActive(book)}
              className={
                "block w-full rounded-md px-3 py-1.5 text-left text-sm transition-colors " +
                (book === active
                  ? "bg-primary-soft font-medium text-primary"
                  : "text-muted-foreground hover:bg-surface-muted hover:text-foreground")
              }
            >
              {book}
            </button>
          ))}
        </nav>
      }
      secondaryPanel={
        <div className="space-y-3">
          <SwitchView label="Mode focus" checked={focus} onChange={setFocus} />
          <p className="font-medium text-foreground">Notes</p>
          <p>
            Le ReaderLayout offre navigation latérale, zone de lecture lisible
            et panneau secondaire optionnel.
          </p>
        </div>
      }
    >
      <h1 className="text-2xl font-bold text-foreground">{active} 1</h1>
      <p>
        Au commencement était la Parole, et la Parole était avec Dieu, et la
        Parole était Dieu.
      </p>
      <p>
        Elle était au commencement avec Dieu. Toutes choses ont été faites par
        elle, et rien de ce qui a été fait n'a été fait sans elle.
      </p>
      <p>
        En elle était la vie, et la vie était la lumière des hommes. La lumière
        luit dans les ténèbres, et les ténèbres ne l'ont point reçue.
      </p>
    </ReaderLayout>
  );
};
