# Sistema de design — JGNext Vision
Gerado com **UI/UX Pro Max** (curadoria de estilo + paleta + tipografia).
- **Estilo:** Glassmorphism
- **Palavras-chave:** Frosted glass, transparent, blurred background, layered, vibrant background, light source, depth, multi-layer
- **Modo:** dark
- **Fontes:** Inter (títulos) / Inter (corpo)
- **Efeitos:** Backdrop blur (10-20px), subtle border (1px solid rgba white 0.2), light reflection, Z-depth
- **Padrão de landing:** Hero + Features + CTA — Hero with headline/image > Value prop > Key features (3-5) > CTA section > Footer
- **Evitar:** Excessive animation + Dark mode by default
## Tokens (CSS vars em `app/globals.css`)
```css
--bg: 220 20% 7%;
--surface: 220 18% 10%;
--surface-2: 220 16% 14%;
--border: 220 14% 20%;
--fg: 210 20% 96%;
--fg-muted: 215 14% 65%;
--brand: 189 94% 53%;
--brand-fg: 220 25% 8%;
--accent: 142 71% 45%;
--accent-fg: 220 25% 8%;
```
_Use SEMPRE os tokens (`bg-brand`, `text-fg`, `border-border`…), nunca hex cru._