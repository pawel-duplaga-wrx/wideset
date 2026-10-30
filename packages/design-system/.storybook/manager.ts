/* Manager is bundled with esbuild — use tailwind's concrete entry (not package root). */
import 'tailwindcss/index.css';
import '../src/styles/tokens/theme-base-tokens.css';
import '../src/styles/tokens/theme-light-tokens.css';
import '../src/styles/tokens/theme-light-semantic.css';
import '../src/styles/tokens/theme-dark-tokens.css';
import '../src/styles/tokens/theme-dark-semantic.css';
import '../src/styles/tokens/theme-desktop-tokens.css';
import '../src/styles/tokens/theme-desktop-semantic.css';
import '../src/styles/utilities/overrides.css';
import './storybook-manager-overrides.css';
