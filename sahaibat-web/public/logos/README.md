# Partner and certification marks

Drop the files here with **exactly these names** and the homepage picks them up
with no code change. Until a file exists, that mark renders as a clean text chip
— nothing appears broken, it just loses the recognition the logo would give.

| File | Mark | What we may claim |
|---|---|---|
| `bpjs-kesehatan.png` | BPJS Kesehatan | **Terintegrasi** — P-Care integration is live |
| `satusehat.png` | SATUSEHAT (Kemenkes) | **Terintegrasi** — HL7 FHIR R4 |
| `komdigi-pse.png` | PSE Komdigi | **Terdaftar** — NIB 1202260248509 |
| `iso-9001-kan.png` | TÜV SÜD ISO 9001 + KAN | **Tersertifikasi** — KAN LSSM-019-IDN |

`nvidia-inception.png` already lives at the public root and is referenced from
there.

## Format

PNG or SVG, transparent background, around 200px tall. They are rendered at
44px in the band and 28px in the hero, so anything smaller than ~120px tall
will look soft on a retina screen.

## Two marks that are deliberately absent

**The AWS logo.** AWS trademark guidelines restrict the mark to AWS Partner
Network members. `AWS Jakarta · ap-southeast-3` renders as text instead, which
is permitted and tells a procurement officer the one thing they need — the
region the data sits in.

**KAN on its own.** KAN accredits certification bodies; it does not certify
software companies. The KAN mark is legitimate here only because it travels
with the TÜV SÜD ISO 9001 certificate it accredited. If that certificate ever
lapses, this file comes down with it.

## The wording is a legal distinction, not a copy one

*Terintegrasi* is a claim about our software. *Terdaftar* is a filing.
*Tersertifikasi* says an accreditation body audited us. On a homepage the three
look interchangeable; to a hospital compliance officer they do not, and they are
the reader who checks.
