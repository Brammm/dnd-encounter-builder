'use client';
import AddPlayerForm from '@/app/AddPlayerForm';
import {useApp} from '@/hooks/useApp';

export default function Home() {
  const {addCharacter, encounters} = useApp();

  return (
    <main>
      <h1>DND Encounter tracker</h1>
      <div>
        {Object.entries(encounters).map(([encounterId, encounter]) => (
          <div key={`encounter-${encounterId}`}>
            <h2>{encounter.name}</h2>
            <div>
              {Object.entries(encounter.characters).map(([characterId, character]) => (
                <div key={characterId}>
                  <div>{character.name}</div>
                  <div>{character.hp}</div>
                  <div>{character.initiative}</div>
                </div>
              ))}
            </div>
            <AddPlayerForm
              onAdd={(type, name, initiative, hp) => {
                addCharacter(encounterId, {type, name, initiative, hp});
              }}
            />
          </div>
        ))}
      </div>
    </main>
  );
}
