# Fake Blaise Project

## Goal

Re-create the exact look and feel of a Blaise survey by Statistics Netherlands (CBS).

## Reference

The target design is based on a screenshot located at `temp/screenshot.png`. This shows a "Gewasbescherming 2024" (Crop Protection 2024) survey form.

## Key Design Elements

### Colors

- **Primary (dark purple)**: `rgb(39, 29, 108)` - Used for text, borders, buttons
- **Accent (cyan)**: `#00A1CD` - Used for the title bar background
- **Background light blue**: `rgb(192, 232, 243)` - Main page background
- **Info panel background**: `rgb(230, 250, 255)` - Lighter blue for navigation sidebar
- **Help button yellow**: `#FCFFa8`
- **Links**: `#0000FF` - Standard blue, underlined

### Layout

- Left purple border (10px) on the main container
- CBS logo in top left
- Header action buttons (Opslaan, Opslaan en sluiten, Printen, Help) in top right
- Cyan title bar with purple survey title band
- Info panel on the right side showing company info
- Left sidebar navigation with "Inhoudsopgave" (Table of Contents)
- Main content area with white background

### Typography

- Font: Verdana
- Navigation items: Small text, blue links with underline
- Active navigation item: Bold
- Section headings: Bold
- Content text: Regular weight

### Components

- `BlaiseLayout` - Main wrapper with left purple border
- `BlaiseHeader` - Top bar with logo and action buttons
- `BlaiseTitleBar` - Cyan/purple title section
- `BlaiseInfoPanel` - Company info box on the right
- `BlaiseNavigation` - Left sidebar navigation
- `BlaiseContent` - Main content area
- `BlaiseButton` - Purple action buttons
- `BlaiseHelpButton` - Yellow help indicator button
