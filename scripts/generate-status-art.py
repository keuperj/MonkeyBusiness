"""Compose the illustrated public-beta status plaque using Pillow and game art.

Run: python3 scripts/generate-status-art.py
Optional SITE_FONT selects an alternative serif TrueType font.
"""
import math
import os
import random
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter

root = Path(__file__).resolve().parents[1]
out = root / 'docs/assets/status-public-beta.png'
rng = random.Random(7)
image = Image.new('RGBA', (1200, 430))
draw = ImageDraw.Draw(image)
font_path = os.environ.get('SITE_FONT', '/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf')
def font(size):
    return ImageFont.truetype(font_path, size)

# Irregular timber silhouette, warm grain and worn plank seams.
outline = [(24,42),(210,34),(350,41),(530,32),(760,39),(970,30),(1170,44),
           (1180,180),(1171,280),(1181,390),(950,398),(710,389),(480,401),(220,391),(22,399),(31,230)]
mask = Image.new('L', image.size)
ImageDraw.Draw(mask).polygon(outline, fill=255)
wood = Image.new('RGBA', image.size)
pixels = wood.load()
for y in range(430):
    for x in range(1200):
        grain = 5*math.sin(y*.44+math.sin(x*.015)*2)+3*math.sin(y*1.8+x*.01)+rng.uniform(-3,3)
        light = 10*(1-y/430)
        pixels[x,y]=(int(53+grain+light),int(35+grain*.65+light),int(23+grain*.4),255)
wood.putalpha(mask)
image.alpha_composite(wood)
draw = ImageDraw.Draw(image)
draw.line(outline+[outline[0]], fill='#ad8548', width=6)
draw.rounded_rectangle((43,55,1157,378),radius=16,outline='#65492c',width=5)
for y in [131,235,338]:
    draw.line((45,y,1155,y+3),fill='#251910',width=3)
    draw.line((45,y+4,1155,y+7),fill='#805b35',width=1)
for x in [60,1140]:
    for y in [71,360]:
        draw.ellipse((x-10,y-10,x+10,y+10),fill='#9c7439',outline='#e3bb6d',width=2)
        draw.line((x-5,y+3,x+5,y-3),fill='#49341e',width=3)

# Painted lantern and compass borrowed from the game's actual inventory atlas.
atlas = Image.open(root/'public/assets/pirate-ui-atlas.png').convert('RGBA')
cell = atlas.width/5
for index,box in [(15,(66,76,206,216)),(24,(994,76,1134,216))]:
    x,y=(index%5)*cell,(index//5)*cell
    icon=atlas.crop((round(x+16),round(y+16),round(x+cell-16),round(y+cell-16)))
    image.alpha_composite(icon.resize((box[2]-box[0],box[3]-box[1]),Image.Resampling.LANCZOS),(box[0],box[1]))
draw=ImageDraw.Draw(image)
draw.text((600,83),'CAPTAIN’S PROGRESS REPORT',font=font(25),anchor='mm',fill='#e8c88f',stroke_width=1,stroke_fill='#241a12')
draw.text((600,145),'PUBLIC BETA',font=font(62),anchor='mm',fill='#f8d769',stroke_width=2,stroke_fill='#382619')
draw.text((600,199),'STATUS 7 / 10',font=font(26),anchor='mm',fill='#f6e0aa')

colors=['#c65043','#ce6740','#da813c','#e39c40','#e8b142','#edc045','#f5d548','#b9c34c','#88af55','#5a9e64']
for i,color in enumerate(colors):
    x=172+i*86
    y=244 if i!=6 else 235
    draw.rounded_rectangle((x-4,y-4,x+74,321),radius=9,fill='#1e1812',outline='#a98048',width=3)
    draw.rounded_rectangle((x,y,x+70,315),radius=6,fill=color,outline='#e1bf77' if i==6 else '#614623',width=2)
    draw.line((x+8,y+7,x+61,y+7),fill='#ffebae',width=2)
    draw.text((x+35,y+35),str(i+1),font=font(30),anchor='mm',fill='#201b13',stroke_width=1)
    if i==6:
        draw.rounded_rectangle((x-7,y-7,x+77,324),radius=10,outline='#ffe598',width=4)
        draw.polygon([(x+21,222),(x+49,222),(x+35,234)],fill='#ffe598')
draw.text((171,351),'1 · RED',font=font(20),anchor='lm',fill='#e8c88f')
draw.text((1018,351),'10 · GREEN',font=font(20),anchor='rm',fill='#e8c88f')

# Soft shadow around the irregular silhouette, not a rectangular background.
shadow=Image.new('RGBA',image.size,(0,0,0,0))
shadow.putalpha(image.getchannel('A').filter(ImageFilter.GaussianBlur(6)).point(lambda a:int(a*.6)))
shadow.alpha_composite(image)
shadow.save(out,optimize=True)
print(out)