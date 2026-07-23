# SEO

The site is findable and previews well everywhere it's shared.

1. **Full metadata at the root**: title, description, Open Graph, Twitter card, targeting the canonical domain, plus favicons and the dark `theme-color`.
2. **Every route has its own title and description.** Dynamic pages derive theirs from their data entry (title, intro as description, first media as the OG image).
3. **Real text in the DOM.** No content locked in images or canvas; heading and landmark structure follows the [accessibility](accessibility.md) baseline.
4. **Overlays and loading states never hide content from crawlers**: page content is server-rendered and present in the initial HTML regardless of lifecycle state.
