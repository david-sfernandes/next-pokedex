import { ChevronUpIcon } from "@heroicons/react/24/outline";

export default function GoTop() {
  return (
    <div
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="goTop"
    >
      <ChevronUpIcon className="w-10 text-gray-300" />
    </div>
  );
}
