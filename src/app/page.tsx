'use client';
import {useState} from 'react';

import AddCharacterForm from '@/components/AddCharacterForm';
import Encounter from '@/components/Encounter';
import useApp from '@/hooks/useApp';

export default function Home() {
  const {addCharacter, encounters} = useApp();
  const [activeEncounterId, setActiveEncounterId] = useState<string>(Object.keys(encounters)[0]);
  const activeEncounter = encounters[activeEncounterId];

  return (
    <main className="max-w-screen-md mx-auto">
      <h1>DND Encounter tracker</h1>
      <div>
        <nav>
          {Object.values(encounters).map((encounter) => (
            <button key={`nav-${encounter.id}`} onClick={() => setActiveEncounterId(encounter.id)}>
              {encounter.name}
            </button>
          ))}
        </nav>
        <Encounter encounter={activeEncounter} />

        <AddCharacterForm
          onAdd={(type, name, initiative, hp) => {
            addCharacter(activeEncounterId, {type, name, initiative, hp});
          }}
        />
      </div>
    </main>
  );
}
