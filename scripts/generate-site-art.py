"""Build the Pages artwork and trailer from shipped art and promotional captures.

Requires Pillow (also used by compose-act5-map.py). Run from any directory:
python scripts/generate-site-art.py
Optional SITE_FONT overrides the Linux DejaVu Serif font path.
No API calls, new dependencies in the game, or gameplay asset changes.
"""
import os
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageOps

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'docs/assets'
ART = ROOT / 'public/assets'
SIZE = (768, 432)
FONT = os.environ.get('SITE_FONT', '/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf')
font = ImageFont.truetype(FONT, 30)
small = ImageFont.truetype(FONT, 15)

# Reuse the same 5x5 painted icon cells as src/control-icons.ts.
atlas = Image.open(ART / 'pirate-ui-atlas.png').convert('RGBA')
edge = atlas.width / 5
for name, cell in {'compass': 24, 'map': 6, 'tools': 4, 'notebook': 5, 'chest': 11, 'lantern': 15}.items():
    x, y = cell % 5 * edge, cell // 5 * edge
    atlas.crop((round(x+16), round(y+16), round(x+edge-16), round(y+edge-16))).resize((128, 128), Image.Resampling.LANCZOS).save(OUT / f'icon-{name}.png')

shots = OUT / 'screenshots'
scenes = [
    (Image.open(shots / 'map.jpg').crop((293, 116, 1146, 685)), 'A harbour full of secrets', 'CHART YOUR COURSE'),
    (Image.open(shots / 'sword-fight.jpg').crop((38, 130, 948, 738)), 'Cross swords. Cross words.', 'BRING YOUR SHARPEST REPLY'),
    (Image.open(shots / 'puzzle.jpg').crop((38, 130, 948, 738)), 'Nothing is quite shipshape', 'OBSERVE • EXPERIMENT • OUTWIT'),
    (Image.open(OUT / 'game-logo.jpg'), 'Your adventure starts at the quay', 'FIVE ACTS • ONE INCONVENIENT SURVEYOR'),
]

def compose(image, title, subtitle, progress):
    # Gentle 4% push-in, keeping title lettering separate and sharp.
    enlarged = ImageOps.fit(image.convert('RGB'), (int(SIZE[0]*(1+progress*.04)), int(SIZE[1]*(1+progress*.04))), Image.Resampling.LANCZOS)
    x, y = (enlarged.width-SIZE[0])//2, (enlarged.height-SIZE[1])//2
    frame = enlarged.crop((x, y, x+SIZE[0], y+SIZE[1])).convert('RGBA')
    shade = Image.new('RGBA', SIZE)
    draw = ImageDraw.Draw(shade)
    for row in range(275, SIZE[1]):
        draw.line((0, row, SIZE[0], row), fill=(5, 16, 20, int(235*(row-275)/(SIZE[1]-275))))
    frame = Image.alpha_composite(frame, shade)
    draw = ImageDraw.Draw(frame)
    draw.rectangle((3, 3, 764, 428), outline='#d5ad68', width=2)
    draw.text((384, 354), title, font=font, fill='#fff1cf', anchor='mm', stroke_width=1, stroke_fill='#102c30')
    draw.text((384, 397), subtitle, font=small, fill='#e7bd70', anchor='mm')
    return frame.convert('RGB')

frames = []
for index, (image, title, subtitle) in enumerate(scenes):
    for tick in range(12):
        frames.append(compose(image, title, subtitle, tick/11))
    next_image, next_title, next_subtitle = scenes[(index+1) % len(scenes)]
    destination = compose(next_image, next_title, next_subtitle, 0)
    last = frames[-1]
    for tick in range(1, 4):
        frames.append(Image.blend(last, destination, tick/4))

# One shared palette avoids color flicker during transitions.
palette_sheet = Image.new('RGB', (768, 432*4))
for i in range(4):
    palette_sheet.paste(frames[i*15], (0, i*432))
palette = palette_sheet.quantize(colors=128)
quantized = [frame.resize((640, 360), Image.Resampling.LANCZOS).quantize(palette=palette, dither=Image.Dither.NONE) for frame in frames]
quantized[0].save(OUT / 'trailer.gif', save_all=True, append_images=quantized[1:], duration=200, loop=0, optimize=True)
frames[0].save(OUT / 'trailer-poster.jpg', quality=90)
for name, (image, _, _) in zip(['explore', 'outwit', 'unravel'], scenes):
    ImageOps.fit(image.convert('RGB'), (640, 400), Image.Resampling.LANCZOS).save(OUT / f'feature-{name}.jpg', quality=88)
print(f'Trailer: {len(frames)} frames, {len(frames)*.2:.2f}s, {(OUT / "trailer.gif").stat().st_size/1024/1024:.2f} MiB')