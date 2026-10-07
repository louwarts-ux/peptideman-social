# peptideman-social

Tools for the Peptideman social media workflow.

## Mods

### caption-check

A [Claude Code mod](https://code.claude.com/docs/en/plugins/mods/overview) that adds `/caption-check`. It checks a draft post against each platform's character and hashtag limits, notes where the feed cuts the caption off with "more", and flags health-claim wording ("cures", "FDA approved", "guaranteed", ...) that platforms often reject in peptide posts. It runs at once, even while Claude is working, and Claude sees the result, so you can follow up with "fix it".

```
/caption-check BPC-157 heals your gut, guaranteed #peptides #recovery
/caption-check threads Morning stack #peptides #recovery
```

Platforms: `instagram` (`ig`), `tiktok` (`tt`), `x` (`twitter`), `threads`, `linkedin` (`li`), `facebook` (`fb`). Leave the platform out to check all of them. The limits are in `mods/caption-check/hooks/check.ts`.

Install it from a terminal Claude Code session (v2.1.287 or later):

```
/plugin install caption-check --marketplace louwarts-ux/peptideman-social
```

Answer `y` to add the marketplace, then pick a scope. To try it without installing, run `claude --plugin-dir mods/caption-check` from this repo.

Develop:

```
claude plugin validate mods/caption-check
claude plugin test mods/caption-check
```
