# CDE3301-ASI301 — BAPNN

Shared team repository for **ASI-301 / BAP** — *"Beach Assistant Pu…"*, an Automated
Modular End Effector for Beach Debris Collection. CDE3301, AY 2025/26.
Team: **BAPNN · "The Beach Boys"** (5 members).

This is a **mechanical capstone**: a SOLIDWORKS end-effector design + a machine-learning
debris-classification pipeline + a test-bench robotic platform. The repo is mostly a
**binary-asset + document store** (CAD, PDFs, slides, media) with version history, plus the
ML / control code.

> **Public repo, on purpose.** Keep it public. **One hard rule:** never commit the
> RE Sustainability NDA or any partner-confidential material. The `.gitignore` blocks
> `*NDA*`, `*Signed*`, and `**/confidential/` as a safety net — don't rely on it, think
> before you `git add`.

The **project website** (Jekyll) is *not* on `main`. Its source lives on the **`website`
branch**; pushing there builds it and deploys to **`gh-pages`**, which GitHub Pages serves
at <https://jeonwonje.github.io/CDE3301-ASI301/>. Touch the website only by working on the
`website` branch — `main` is purely the asset/document store.

## SOLIDWORKS version

**SOLIDWORKS 2025.** Save and commit files in 2025 format. SOLIDWORKS cannot open files
saved in a *newer* version, so do not upgrade individual files to a later release.

## Folder layout

```
cad/            SOLIDWORKS source (the end effector)
  parts/          .sldprt
  assemblies/     .sldasm
  drawings/       .slddrw
  exports/        STEP / IGES / STL for sharing & fabrication
ml/             debris-classification pipeline (Python: training, inference)
control/        test-bench / platform control code & firmware
docs/           PDFs, reports, datasheets, manuals
  reports/        interim & final reports
  procurement/    BOM, item-request lists, claims
presentations/  slides (pptx, pdf exports)
media/          images, photos, renders, field-visit pics
reference/      third-party datasheets, standards, partner material
```

(The project website source is not here — it lives on the `website` branch.)

## Big files & the 100 MB limit (NO Git LFS)

This repo **does not use Git LFS** (team decision). Binaries are committed straight into
`.git`. Two consequences everyone must know:

1. **GitHub rejects any single file larger than 100 MB.** A large SOLIDWORKS assembly or
   video can exceed this and your `push` will be rejected. If you hit that, compress/export
   a lighter version, store the original on OneDrive and commit a STEP/STL, or tell Wonje so
   we reconsider LFS.
2. The `.git` history grows with every revision of a binary and never shrinks. Commit
   deliberately — don't check in throwaway intermediate saves.

There is also **no `git lfs lock`** without LFS. Coordinating CAD edits is therefore a
**manual discipline** (see below).

## Working day to day

### 1. Clone
```bash
git clone git@github.com:jeonwonje/CDE3301-ASI301.git
cd CDE3301-ASI301
```

### 2. Work on your own branch
Each member has a personal branch `person/<name>`:

| Member | Branch | GitHub |
|---|---|---|
| Jeon Wonje | `person/wonje` | `jeonwonje` (owner) |
| Chen Zhi Yi Gary | `person/gary` | `garychen177` |
| Kow Ming Yuan | `person/ming` | `Kmyming` |
| Ng Jing Jie Russell | `person/russell` | `Russell501` |
| Wang Yizhang | `person/yizhang` | `eggsacc` |

```bash
git checkout person/<you>
git merge origin/main        # keep your branch fresh with the latest main
```

### 3. Editing SOLIDWORKS / other un-mergeable files — coordinate first
SOLIDWORKS files and PDFs **cannot be merged**. If two people edit the same part on
different branches, Git can only keep one — the other's work is lost on merge. Since we have
no LFS locking:

- **Announce in the team chat before editing a shared CAD file** ("editing `bracket.sldprt`").
- Keep one owner per part where possible.
- Pull `main` before you start, push as soon as you're done, keep edit sessions short.

```bash
git add cad/parts/bracket.sldprt
git commit -m "design: revise bracket fillets"
git push
```

### 4. Sharing finished work
Open a **Pull Request from `person/<you>` into `main`**. Do **not** push straight to `main`.
For documents that genuinely need parallel editing, prefer the live OneDrive/Google copy and
commit periodic snapshots — don't treat Git as a real-time co-edit tool.

## Branch convention

`person/<name>` (lowercase), one per member, off `main`. `main` is the integration branch;
`gh-pages` serves the website. Share work via PRs into `main`.

## Roster & supervisors

- **Members:** Jeon Wonje, Chen Zhi Yi Gary, Kow Ming Yuan, Ng Jing Jie Russell, Wang Yizhang
- **Supervisors:** Dr. Elliot Law · Mr. Nicholas Chew · Mr. Royston Shieh
- **Industry partner:** RE Sustainability (Daniel – ops; Henri – innovation), via Benjamin @
  Sentosa Development Corp
