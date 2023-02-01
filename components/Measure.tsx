export default function Measure({
  type,
  value,
}: {
  type: "weight" | "height";
  value: number;
}) {
  return (
    <div className="bg-gray-700 rounded-xl p-6 shadow-md 
    text-center min-w-[135px]">
      <h4 className="capitalize text-xl text-gray-300 mb-2">{type}</h4>
      <h3 className="text-3xl font-medium">
        {value / 10} {type == "height" ? "m" : "kg"}
      </h3>
    </div>
  );
}
