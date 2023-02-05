import { SetStateAction } from "react";
import FemaleIcon from "./icons/FemaleIcon";
import MaleIcon from "./icons/MaleIcon";

type GenderSwitcherProps = {
  isDefault: boolean;
  setIsDefault: (value: SetStateAction<boolean>) => void;
};

export default function GenderSwitcher({
  isDefault,
  setIsDefault,
}: GenderSwitcherProps) {
  return (
    <div className="flex">
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          value=""
          defaultChecked={!isDefault}
          onClick={() => setIsDefault((isDefault) => !isDefault)}
          className="sr-only peer"
        />
        <div
          className="switcher peer peer-checked:after:translate-x-full peer-checked:bg-red-300"
        >
          <MaleIcon />
          <FemaleIcon />
        </div>
      </label>
    </div>
  );
}
