# SkillSpector: `claude-seo` (plugin)

**Bron:** https://github.com/AgriciDaniel/claude-seo, commit `6be93f4` (22 okt 2026), plugin-versie 2.5.0
**Oordeel:** CAUTION: geen kwaadaardig gedrag gevonden, wel een groot gevoelig oppervlak
**Risico:** 100/100 · CRITICAL · DO_NOT_INSTALL (SkillSpector)
**Advies:** alleen de kern lokaal installeren voor website-audits in een aparte map, niet in deze repo en zonder extensies of Google-koppeling.

## Kern
De score van 100 komt vooral door de omvang: 35 skills, 19 agents en 61 scripts leveren 399 meldingen op. Bijna alle meldingen bleken bij nalezen bedoeld gedrag: API-sleutels die naar de eigen API gaan, en installatiescripts die naar `~/.claude` schrijven. Ik vond geen verborgen verzending van gegevens, geen promptinjectie en geen persistentie buiten de plugin. Toch is het veel code die met inloggegevens werkt en een hook op elke bewerking zet. Installeer het daarom alleen begrensd.

## Signalen
| Bron | Resultaat | Betekenis |
|---|---|---|
| Statische scan (SkillSpector v2.12.0, `--no-llm`) | 4 CRITICAL, 147 HIGH, 237 MEDIUM, 11 LOW | Score gedreven door omvang; zie bewijs |
| Dekking | `partial`: `agents/seo-sxo.md` niet volledig te ontleden; OSV.dev geblokkeerd (403) | Dat bestand zelf gelezen; controle op bekende kwetsbaarheden beperkt |
| Semantische beoordeling | Code doet wat de README belooft; `PRIVACY.md`: geen telemetrie, bevestigd door grep | Geen mismatch tussen beschrijving en gedrag |
| Gevoelig oppervlak | Netwerk (Google API's, Bing, DataForSEO, Moz, Common Crawl), sleutels uit omgevingsvariabelen, Google OAuth-tokens in `~/.config/claude-seo/`, leest gcloud-ADC, Python-venv + Chromium, PostToolUse-hook | Groot, maar gedocumenteerd en grotendeels optioneel (extensies) |

## Belangrijkste bewijs
| Regel | Ernst | Locatie | Beoordeling |
|---|---|---|---|
| TT3 | CRITICAL | `extensions/banana/scripts/generate.py:84`, `edit.py:91` | Gemini-sleutel gaat in header `X-Goog-Api-Key` naar de Google-API zelf; foutmeldingen worden geredigeerd. Bedoeld gedrag. |
| TT3 | CRITICAL | `scripts/dataforseo_merchant.py:118,149` | DataForSEO-inlog naar `api.dataforseo.com`. Bedoeld gedrag (betaalde extensie). |
| PE3 | HIGH | `scripts/google_auth.py:197` | Leest `~/.config/gcloud` (application-default credentials) als je Google-koppeling gebruikt. Verklaard, maar gevoelig: niet gebruiken op een machine met bedrijfs-gcloud. |
| AS1 | HIGH | `extensions/*/install.sh` | Extensie-installers schrijven MCP-config in `~/.claude`. Verklaard; alleen bij expliciete installatie. |
| SC2 | HIGH | `install.sh`, `extensions/ahrefs/install.sh:35` | Handmatige installatie via `curl … \| bash`. Gebruik de plugin-marketplace, niet de curl-route. |
| P2 | HIGH | `skills/seo-cluster/references/execution-workflow.md:44-84` | HTML-commentaar `<!-- cluster-link:… -->` is een placeholder voor interne links, geen verborgen instructie. Vals alarm. |
| AR2 / P6 | HIGH | `dma-consent-mode-v2.md:28`, `agents/seo-sxo.md:78` | Scope-afbakening en uitvoerregels. Vals alarm. |
| RA1 | HIGH | `skills/seo-cluster/SKILL.md:6` | `/seo cluster execute` schrijft zelf blogposts. Geen zelfmodificatie, wel een inhoudsrisico (zie voorwaarden). |
| E2 | HIGH | `scripts/runtime.py:216`, `tests/*` | Kopie van de omgeving voor een eigen subproces; geen verzending. Vals alarm. |
| Hook | n.v.t. | `hooks/hooks.json` | PostToolUse op elke `Edit\|Write`, in elk project: valideert JSON-LD in het geschreven bestand, exit 2 bij fouten. Onschuldig maar draait overal mee. |

## Diagnose
De statische scan slaat aan op patronen die bij een SEO-tool met API-koppelingen horen. Bij elke CRITICAL- en HIGH-categorie gaan sleutels naar de dienst waar ze voor zijn, of gaat het om documentatie of tests. Nergens gaan gegevens naar een onbekende bestemming, en `eval` of gedecodeerde payloads zitten niet in de scripts of hooks. Het blijft CAUTION en niet APPROVE door drie dingen: de plugin raakt inloggegevens (gcloud, OAuth-tokens), de afhankelijkheden zijn niet vastgepind (`>=`-bereiken), en er draait een globale hook mee. Daarnaast kan de plugin zelf content schrijven, en die content kent onze claimregels niet.

## Voorwaarden
1. Installeer via `/plugin install`, niet via `curl | bash`, en lokaal op Davids eigen machine, niet in de cloudsessie van deze repo.
2. Gebruik geen extensies (Banana, DataForSEO, Ahrefs enz.) en geen Google-koppeling, tenzij er een aparte vraag voor is. Draai `/seo google` nooit op een machine die met een bedrijfs-gcloud is ingelogd.
3. Gebruik `/seo cluster execute` en andere schrijvende commando's niet. Elke tekst die eruit komt gaat eerst langs de `claimcheck`-agent; adviezen die naar effecten of gezondheidswoorden sturen negeren we (zie `kennis/peptideman.md`, Vindbaarheid).
4. Zet hem na de audit weer uit (`/plugin disable claude-seo`), zodat de globale hook niet in deze repo naast de poort meedraait.
5. Bij een nieuwe versie: scan opnieuw, want de score geldt voor commit `6be93f4`.
