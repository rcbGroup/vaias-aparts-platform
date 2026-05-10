import type { Metadata } from "next";
import GalleryClient from "./GalleryClient";

export const metadata: Metadata = {
  title: "Galerie Foto | Vila Vaias Aparts Târgu Neamț — 7 Apartamente Boutique",
  description:
    "Galerie foto Vila Vaias Aparts — toate cele 7 apartamente boutique, exterior, curte și facilitățile vilei din Târgu Neamț, la poalele Cetății Neamțului.",
};

export default function GalleryPage() {
  return <GalleryClient />;
}
