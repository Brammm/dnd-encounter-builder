import {Character} from '@/hooks/useApp';

type Props = {
  character: Character;
};

export function CharacterRow({character}: Props) {
  return (
    <div className="flex border rounded-lg mb-2 border-gray-200">
      <div className="flex flex-col bg-gray-200 p-2">
        <span>Initiative</span>
        <span>{character.initiative}</span>
      </div>
      <div className="place-self-center px-4">{character.name}</div>
      {character.hp !== undefined && (
        <div className="flex flex-col border-l p-2">
          <span>HP</span>
          <span>{character.hp}</span>
        </div>
      )}
    </div>
  );
}
