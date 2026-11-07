"""Compose the generated shoal chart with its two dry interior cutaways.

Run with the Pillow environment used by the image-generation CLI. Raster output
keeps the illustrations visible when browsers load the map through an img tag.
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

root = Path(__file__).resolve().parents[1]
assets = root / 'public' / 'assets'
image = Image.open(assets / 'act3' / 'inspection-map.png').convert('RGB')
draw = ImageDraw.Draw(image)
draw.rounded_rectangle((940, 540, 1500, 960), 24, fill='#102734', outline='#d9b771', width=5)
for name, pos in [('command', (958, 558)), ('bypass', (1220, 728))]:
    art = Image.open(assets / 'act5' / f'{name}.png').convert('RGB')
    image.paste(art.resize((245, 164)), pos)
draw.line([(1120, 310), (1120, 650), (1240, 740), (1300, 820)], fill='#ead5a0', width=12)
font = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf', 23)
for xy, text in [((1120, 550), 'DRY PERSONNEL STAIR'), ((1110, 700), 'Central Command Floor'), ((1290, 920), 'Inspection Bypass')]:
    draw.text(xy, text, font=font, fill='#ffe4a5', anchor='mt', stroke_width=3, stroke_fill='#102734')
image.save(assets / 'act5' / 'inspection-map.png', optimize=True)