import generated from "./images.generated.json";

/**
 * Homepage photo slots (≈3 lifestyle photos, per the visual-storytelling
 * story). A slot shows its photo once `pnpm images` has processed
 * `images-src/<file>.jpg`; until then it shows a designed placeholder.
 *
 * When adding a photo, update `alt` to describe what the photo actually
 * shows (people, pet, setting) — never leave a generic description.
 */
export const photoSlots = {
  hero: {
    file: "hero",
    alt: "Neighbours in a leafy apartment courtyard: one holds a golden retriever on a lead while another crouches to pet it, and a third sits nearby holding a cat in a carrier.",
  },
  /** "What is Rooffur?" diagram — Pet Parent / Needs care. */
  diagramPetParent: {
    file: "diagram-pet-parent",
    alt: "Two women sitting on a living-room rug, smiling as they pet a relaxed golden retriever.",
  },
  /** "What is Rooffur?" diagram — Pet lover / Host / Open to helping. */
  diagramHost: {
    file: "diagram-host",
    alt: "Two women crouching in a park to greet a golden dog, with a cat watching from an open carrier.",
  },
  /** How It Works — wide closing Meet & Greet panel under the journey. */
  howMeet: {
    file: "how-meet",
    alt: "Two women crouching in a park to greet a golden dog, with a cat watching from an open carrier.",
  },
  petParent: {
    file: "pet-parent",
    alt: "A woman sitting on a rug at home, gently stroking a contented long-haired cat.",
  },
  host: {
    file: "host",
    alt: "A woman at her front door handing a budgie in its cage to a visitor.",
  },
} as const;

export type PhotoSlot = keyof typeof photoSlots;

export type GeneratedImage = {
  src: string;
  width: number;
  height: number;
  blurDataURL: string;
};

const manifest = generated as Record<string, GeneratedImage | undefined>;

/** The processed photo for a slot, or null if none has been supplied yet. */
export function getPhoto(slot: PhotoSlot): (GeneratedImage & { alt: string }) | null {
  const { file, alt } = photoSlots[slot];
  const image = manifest[file];
  return image ? { ...image, alt } : null;
}
