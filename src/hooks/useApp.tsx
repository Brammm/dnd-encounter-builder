'use client';
import {createContext, PropsWithChildren, useContext, useState} from 'react';
import {produce} from 'immer';

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

const AppContext = createContext<AppContext | undefined>(undefined);

export function AppContextProvider({children}: PropsWithChildren) {
  const [encounters, setEncounters] = useState<Record<string, Encounter>>({'1': {name: 'Encounter 1', characters: {}}});

  function nextId(object: Record<string, any>): string {
    return (Object.entries(object).length + 1).toString();
  }

  return (
    <AppContext.Provider
      value={{
        encounters,
        addCharacter: (encounterId, character) => {
          setEncounters(
            produce((draft) => {
              draft[encounterId].characters[nextId(draft[encounterId].characters)] = character;
            }),
          );
        },
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const state = useContext(AppContext);

  if (!state) {
    throw new Error('Can only be used inside AppContextProvider');
  }

  return state;
}
