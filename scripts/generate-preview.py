#!/usr/bin/env python3
"""Generate palette preview images for synthpunk-pastel."""

import json
import os
from PIL import Image, ImageDraw, ImageFont


def load_palette(path):
    with open(path) as f:
        data = json.load(f)
    return data["colors"]


def hex_to_rgb(hex_color):
    hex_color = hex_color.lstrip("#")
    return tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))


def get_text_color(bg_rgb):
    """Return white or black text depending on background brightness."""
    brightness = (bg_rgb[0] * 299 + bg_rgb[1] * 587 + bg_rgb[2] * 114) / 1000
    return (255, 255, 255) if brightness < 128 else (46, 26, 36)


def generate_preview(palette, output_path, title):
    """Generate a palette preview image."""
    # Layout constants
    swatch_size = 120
    text_height = 40
    gap = 8
    cols = 7
    
    accent_names = [
        "rosewater", "flamingo", "pink", "maroon", "red", "peach", "yellow",
        "green", "teal", "sky", "sapphire", "blue", "lavender"
    ]
    neutral_names = [
        "text", "subtext1", "subtext0", "overlay",
        "surface2", "surface1", "surface0",
        "base", "mantle", "crust"
    ]
    
    accent_count = len(accent_names)
    neutral_count = len(neutral_names)
    
    accent_rows = (accent_count + cols - 1) // cols
    neutral_rows = (neutral_count + cols - 1) // cols
    total_rows = accent_rows + neutral_rows + 1  # +1 for title spacing
    
    width = cols * (swatch_size + gap) + gap
    height = total_rows * (swatch_size + text_height + gap) + gap + 60  # extra for title
    
    img = Image.new("RGB", (width, height), (250, 250, 250))
    draw = ImageDraw.Draw(img)
    
    # Try to load a font, fallback to default
    try:
        font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 14)
        title_font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 20)
    except:
        font = ImageFont.load_default()
        title_font = font
    
    # Draw title
    draw.text((gap, 20), title, fill=(46, 26, 36), font=title_font)
    
    y_offset = 60
    
    # Draw accent colors
    for i, name in enumerate(accent_names):
        col = i % cols
        row = i // cols
        x = gap + col * (swatch_size + gap)
        y = y_offset + row * (swatch_size + text_height + gap)
        
        color_data = palette.get(name, {"hex": "000000"})
        rgb = hex_to_rgb(color_data["hex"])
        
        draw.rectangle([x, y, x + swatch_size, y + swatch_size], fill=rgb, outline=(200, 200, 200))
        
        text_color = get_text_color(rgb)
        draw.text((x + 8, y + 8), name, fill=text_color, font=font)
        draw.text((x + 8, y + 28), f"#{color_data['hex']}", fill=text_color, font=font)
    
    y_offset += accent_rows * (swatch_size + text_height + gap) + 30
    
    # Draw neutral colors
    for i, name in enumerate(neutral_names):
        col = i % cols
        row = i // cols
        x = gap + col * (swatch_size + gap)
        y = y_offset + row * (swatch_size + text_height + gap)
        
        color_data = palette.get(name, {"hex": "000000"})
        rgb = hex_to_rgb(color_data["hex"])
        
        draw.rectangle([x, y, x + swatch_size, y + swatch_size], fill=rgb, outline=(200, 200, 200))
        
        text_color = get_text_color(rgb)
        draw.text((x + 8, y + 8), name, fill=text_color, font=font)
        draw.text((x + 8, y + 28), f"#{color_data['hex']}", fill=text_color, font=font)
    
    img.save(output_path)
    print(f"Saved {output_path}")


def generate_variant_preview(palette_path, output_path, title):
    """Generate a preview for a single palette variant."""
    palette = load_palette(palette_path)
    generate_preview(palette, output_path, title)


def main():
    project_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    assets_dir = os.path.join(project_dir, "assets")
    os.makedirs(assets_dir, exist_ok=True)

    # Pastel previews
    generate_variant_preview(
        os.path.join(project_dir, "palette", "base.json"),
        os.path.join(assets_dir, "palette-preview-light.png"),
        "Synthpunk Pastel — Light Mode"
    )
    generate_variant_preview(
        os.path.join(project_dir, "palette", "dark.json"),
        os.path.join(assets_dir, "palette-preview-dark.png"),
        "Synthpunk Pastel — Dark Mode"
    )

    # Neon previews
    generate_variant_preview(
        os.path.join(project_dir, "palette", "neon-light.json"),
        os.path.join(assets_dir, "palette-preview-neon-light.png"),
        "Synthpunk Neon — Light Mode"
    )
    generate_variant_preview(
        os.path.join(project_dir, "palette", "neon-dark.json"),
        os.path.join(assets_dir, "palette-preview-neon-dark.png"),
        "Synthpunk Neon — Dark Mode"
    )


if __name__ == "__main__":
    main()
