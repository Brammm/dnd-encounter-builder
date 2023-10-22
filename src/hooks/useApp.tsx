'use client';
import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';

export type Character = {
  id: string;
  type: 'PC' | 'NPC';
  name: string;
  initiative: number;
  hp?: number;
};

export type Encounter = {
  id: string;
  name: string;
  characters: Character[];
};

type State = {
  encounters: Record<string, Encounter>;
};

type Actions = {
  addCharacter: (encounterId: string, character: Omit<Character, 'id'>) => void;
};

const useApp = create<State & Actions>()(
  immer((set) => ({
    encounters: {
      '1': {
        id: '1',
        name: 'Encounter 1',
        characters: [],
      },
    },
    addCharacter: (encounterId, character) => {
      set((draft) => {
        const charId = nextId(draft.encounters[encounterId].characters);

        draft.encounters[encounterId].characters = [
          ...draft.encounters[encounterId].characters,
          {...character, id: charId},
        ];
      });
    },
  })),
);

function nextId(object: any[] | Record<string, any>): string {
  let array = object;
  if (!Array.isArray(array)) {
    array = Object.keys(array);
  }

  return (array.length + 1).toString();
}

export default useApp;
