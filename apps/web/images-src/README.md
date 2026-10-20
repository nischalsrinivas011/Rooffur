# Lifestyle photos

Approved homepage photography goes here, named after its photo slot:

| File                 | Where it appears                   | Should show                               |
| -------------------- | ---------------------------------- | ----------------------------------------- |
| `hero.jpg`           | Hero (right side)                  | Pet + person, warm home/community setting |
| `pet-parent.jpg`     | Find Pet Care                      | A Pet Parent with their pet               |
| `host.jpg`           | Become a Host                      | A pet comfortable in someone's home       |
| `diagram-pet-parent` | What is Rooffur? → Pet Parent card | A Pet Parent with their pet               |
| `diagram-host`       | What is Rooffur? → Host card       | A pet lover meeting a pet                 |

`.jpg`, `.jpeg`, `.png` or `.webp`, ideally at least 1920px wide. Use only
Product Owner-approved images: no kennels, cages, vet clinics, staged
corporate stock or fake profiles; prefer Indian/urban residential settings.

Then run:

```bash
pnpm --filter @rooffur/web images
```

This writes responsive WebP variants to `public/images/` and updates
`src/content/images.generated.json`. Commit both. Also update the slot's
`alt` text in `src/content/images.ts` so it describes the actual photo.
Until a photo exists, its slot shows a designed placeholder.
