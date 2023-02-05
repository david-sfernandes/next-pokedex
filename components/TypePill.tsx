export default function TypePill({
  type,
  lg = false,
}: {
  type: string;
  lg?: boolean;
}) {
  type bgMapT = keyof typeof bgMap;
  const bgMap = {
    normal: "bg-normal",
    fire: "bg-fire",
    water: "bg-water",
    electric: "bg-electric",
    grass: "bg-grass",
    ice: "bg-ice",
    fighting: "bg-fighting",
    poison: "bg-poison",
    ground: "bg-ground",
    flying: "bg-flying",
    psychic: "bg-psychic",
    bug: "bg-bug",
    rock: "bg-rock",
    ghost: "bg-ghost",
    dragon: "bg-dragon",
    dark: "bg-dark",
    steel: "bg-steel",
    fairy: "bg-fairy",
  };

  return (
    <p
      className={`px-4 py-1 font-medium rounded-full ${
        lg ? "text-2xl" : "text-sm"
      } tracking-wide ${bgMap[type as bgMapT]}`}
    >
      {type}
    </p>
  );
}
