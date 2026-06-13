/**
 * Reader demo — reference snippet (not compiled by the monorepo).
 */
import { useState } from "react";
import { ReaderLayout, SwitchView } from "@basekit/ui";

const books = ["Genèse", "Psaumes", "Jean", "Romains"];

export const ReaderExample = () => {
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
                "block w-full rounded-md px-3 py-1.5 text-left text-sm " +
                (book === active
                  ? "bg-primary-soft text-primary"
                  : "text-muted-foreground hover:bg-surface-muted")
              }
            >
              {book}
            </button>
          ))}
        </nav>
      }
      secondaryPanel={<SwitchView label="Mode focus" checked={focus} onChange={setFocus} />}
    >
      <h1 className="text-2xl font-bold text-foreground">{active} 1</h1>
      <p>Au commencement était la Parole…</p>
    </ReaderLayout>
  );
};
