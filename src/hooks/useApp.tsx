'use client';
import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';

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

type State = {
  encounters: Record<string, Encounter>;
};

type Actions = {
  addCharacter: (encounterId: string, character: Character) => void;
};

const useApp = create<State & Actions>()(
  immer((set) => ({
    encounters: {'1': {name: 'Encounter 1', characters: {}}},
    addCharacter: (encounterId, character) => {
      set((draft) => {
        draft.encounters[encounterId].characters[nextId(draft.encounters[encounterId].characters)] = character;
      });
    },
  })),
);

function nextId(object: Record<string, any>): string {
  return (Object.entries(object).length + 1).toString();
}

export default useApp;
