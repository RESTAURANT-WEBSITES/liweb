<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Architecture

- LIWEB Solutions is a single-page marketing site: all sections live on `src/routes/index.tsx` as components in `src/components/`, reached by hash-anchor navigation. The scroll-driven hero (`ScrollHero.tsx`) and the continuous canvas background (`AnimatedBackground.tsx`) are core features — keep them when editing the page.
- Contact form submissions are stored server-side by the `submitEnquiry` server function (`src/lib/contact.ts`) into the `contact_submissions` table (RLS-locked, service-role insert only). Never render client-submitted claims of delivery without that function succeeding.
