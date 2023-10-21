'use client';
import AddPlayerForm from '@/app/AddPlayerForm';
import {useApp} from '@/hooks/useApp';

export default function Home() {
  const {addCharacter, characters} = useApp();

  return (
    <main>
      <h1>DND Encounter tracker</h1>
      <div>
        {Object.entries(characters).map(([characterId, character]) => (
          <div key={characterId}>
            <div>{character.name}</div>
            <div>{character.hp}</div>
            <div>{character.initiative}</div>
          </div>
        ))}
      </div>
      <AddPlayerForm
        onAdd={(type, name, initiative, hp) => {
          addCharacter({type, name, initiative, hp});
        }}
      />
    </main>
  );
}
