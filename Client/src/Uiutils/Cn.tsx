import { twMerge } from "tailwind-merge";
import { clsx , ClassValue} from "clsx";

export default function Cn(...inputs: ClassValue[]) {
   return twMerge(clsx(inputs))
};
