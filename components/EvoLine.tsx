import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Card } from "./Card";

export default function EvoLine({ chain }: { chain: EvoChain }) {
  return (
    <div className="flex items-center flex-col flex-wrap p-1 justify-center">
      <Card url={"https://pokeapi.co/api/v2/pokemon/" + chain.species.name} />
      {chain.evolves_to.length > 0 && (
        <>
          <ChevronDownIcon className="w-10" />
          <div className="evoLine">
            {chain.evolves_to.map((evo) => (
              <EvoLine key={evo.species.name} chain={evo} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
