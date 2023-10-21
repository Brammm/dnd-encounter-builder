'use client';
import {produce} from 'immer';
import {create} from 'zustand';

type Character = {
  type: 'PC' | 'NPC';
  name: string;
  initiative: number;
  hp?: number;
};

type Encounter = {
  name: string;
  characters: Record<string, Character>;
};

type AppContext = {
  encounters: Record<string, Encounter>;
  addCharacter: (encounterId: string, character: Character) => void;
};

const useApp = create<AppContext>(
  (set): AppContext => ({
    encounters: {'1': {name: 'Encounter 1', characters: {}}},
    addCharacter: (encounterId, character) => {
      set(
        produce((draft: AppContext) => {
          draft.encounters[encounterId].characters[nextId(draft.encounters[encounterId].characters)] = character;
        }),
      );
    },
  }),
);

function nextId(object: Record<string, any>): string {
  return (Object.entries(object).length + 1).toString();
}

export default useApp;
