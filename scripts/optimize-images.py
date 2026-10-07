"""Run with Python + Pillow only when source photos change. Originals stay intact."""
from pathlib import Path
from PIL import Image, ImageOps

root = Path(__file__).resolve().parent.parent
output = root / 'public' / 'optimized'
output.mkdir(exist_ok=True)
sources = [('portrait pas foto.jpeg', 'andri-juliono')]
sources += [(f'foto-{i:02}.jpeg', f'kegiatan-{i:02}') for i in range(1, 16)]
for source, name in sources:
    image = ImageOps.exif_transpose(Image.open(root / 'public' / source)).convert('RGB')
    for width in (480, 720, 960):
        resized = image.copy()
        resized.thumbnail((width, width * 2), Image.Resampling.LANCZOS)
        resized.save(output / f'{name}-{width}.webp', 'WEBP', quality=70, method=6)
print('16 foto dikompres menjadi WebP responsif; metadata EXIF tidak disertakan.')
