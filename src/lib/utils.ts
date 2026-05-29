import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const SITE = {
  name: "Pro-Tection",
  tagline: "Votre santé, notre engagement",
  email: "info@prot-ection.fr",
  phone: "+33 1 86 65 12 34",
  phoneDisplay: "01 86 65 12 34",
  whatsapp: "33186651234",
  address: "12 rue de la Paix, 75002 Paris, France",
  founded: 2013,
};
