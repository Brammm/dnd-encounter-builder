'use client';
import {createContext, PropsWithChildren, useContext, useState} from 'react';
import {produce} from 'immer';

type Character = {
  type: 'PC' | 'NPC';
  name: string;
  initiative: number;
  hp?: number;
};

type AppContext = {
  characters: Record<string, Character>;
  addCharacter: (character: Character) => void;
};

const AppContext = createContext<AppContext | undefined>(undefined);

export function AppContextProvider({children}: PropsWithChildren) {
  const [characters, setCharacters] = useState<Record<string, Character>>({});

  function nextId(): string {
    return (Object.entries(characters).length + 1).toString();
  }

  return (
    <AppContext.Provider
      value={{
        characters,
        addCharacter: (character) => {
          setCharacters(
            produce((draft) => {
              draft[nextId()] = character;
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
