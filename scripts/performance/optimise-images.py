"""Create responsive derivatives without altering portfolio originals. Requires Pillow."""
from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parents[2]
assets = root / "public"
output = assets / "projects/local"
output.mkdir(parents=True, exist_ok=True)
projects = {
    "global-tiles": "projects/global-tiles-bathrooms/homepage.png",
    "mckevitts": "projects/mckevitts/website-cover.png",
    "26-events": "projects/26-events/homepage.webp",
    "onyerbike": "projects/site-captures/onyerbike/homepage.jpg",
    "carlingford-arms": "projects/site-captures/carlingford-arms/homepage.jpg",
    "roco9": "projects/roco9/homepage.webp",
    "clubrovia": "projects/clubrovia/landing.webp",
    "mckevitts-brand": "projects/mckevitts/brand-presentation.jpg",
}
for name, source in projects.items():
    image = Image.open(assets / source).convert("RGB")
    for width in (480, 840, 1200):
        height = round(image.height * width / image.width)
        image.resize((width, height), Image.Resampling.LANCZOS).save(
            output / f"{name}-{width}.webp", quality=82, method=6
        )
for theme in ("dark", "light", "robot"):
    image = Image.open(assets / f"art/orbit/chimp-hero-{theme}.webp")
    for width in (480, 800, 1200):
        image.resize((width, round(image.height * width / image.width)), Image.Resampling.LANCZOS).save(
            assets / f"art/orbit/chimp-hero-{theme}-{width}.webp", quality=82, method=6
        )
for name in ("cinematic-moon", "moon-back", "moon-middle", "moon-front"):
    image = Image.open(assets / f"art/orbit/{name}.webp")
    for width in ((480,) if name == "cinematic-moon" else (1080, 1920)):
        image.resize((width, round(image.height * width / image.width)), Image.Resampling.LANCZOS).save(
            assets / f"art/orbit/{name}-{width}.webp", quality=82, method=6
        )
for theme, source in (("dark", "kamrok-logo.png"), ("light", "kamrok-logo-bright-mode.png")):
    image = Image.open(assets / source).convert("RGBA")
    width = 320
    destination = assets / "brand" / f"kamrok-header-{theme}.webp"
    destination.parent.mkdir(parents=True, exist_ok=True)
    image.resize((width, round(image.height * width / image.width)), Image.Resampling.LANCZOS).save(
        destination, quality=86, method=6
    )
