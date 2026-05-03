#!/usr/bin/env python3
"""Generate synthpunk-neon Zed theme from the pastel template via color substitution."""

import json
import os
import re


# Map pastel dark hex (6 chars, no #) → neon dark hex (6 chars, no #)
DARK_MAP = {
    "3A2850": "251540",  # surface1
    "2E1E40": "1A0D2E",  # surface0
    "C49BFF": "D040FF",  # lavender
    "5ED4E0": "00E8F0",  # teal
    "160A20": "0A0418",  # mantle
    "1E1028": "0F0620",  # base
    "F0E0F0": "E8E0F0",  # text
    "C8B0D8": "B8A8D0",  # subtext1
    "A090B8": "8878A0",  # subtext0
    "705880": "503870",  # overlay
    "FF9BB6": "FF5CA8",  # flamingo
    "FF5470": "FF3A50",  # red
    "0D0612": "060210",  # crust
    "FF7080": "FF5868",  # bright red
    "B83C50": "B02838",  # dim red
    "7FD7B5": "40FF80",  # green
    "9DE5C8": "60FFA0",  # bright green
    "5A9A80": "2DB860",  # dim green
    "FFE4B5": "FFE040",  # yellow
    "FFFCD5": "FFF868",  # bright yellow
    "BFBCA5": "B8A830",  # dim yellow
    "8BA4FF": "A060FF",  # blue
    "A8BCFF": "B880FF",  # bright blue
    "6270B0": "7040B0",  # dim blue
    "FF7DB0": "FF2A8A",  # pink
    "FF9BC8": "FF4AA0",  # bright magenta
    "B86080": "B01E60",  # dim magenta
    "7EE0EA": "20F0F8",  # bright cyan
    "4298A0": "00A0A8",  # dim cyan
    "9078A0": "705880",  # dim white
    "7AC8FF": "40B0FF",  # sky
    "7AA8C0": "6080FF",  # sapphire
    "FFA07A": "FF8040",  # peach
}

# Map pastel light hex (6 chars, no #) → neon light hex (6 chars, no #)
LIGHT_MAP = {
    "E4CCD8": "E0C8E8",  # surface2
    "F0DEE8": "F0E8F5",  # surface0
    "C49BFF": "B050D0",  # lavender
    "FF7DB0": "D04080",  # pink
    "FFF0EB": "F5F0F5",  # mantle
    "FFF8F5": "FAF6FA",  # base
    "2E1A24": "2A1A30",  # text
    "6B4F5E": "6B5A78",  # subtext1
    "997A8A": "A898B0",  # subtext0
    "C4A8B8": "C0A8C8",  # overlay
    "FF9BB6": "E06098",  # flamingo
    "FF5470": "E04058",  # red
    "FFE8E0": "F0E8F0",  # crust
    "FF7080": "E85870",  # bright red
    "B83C50": "A03048",  # dim red
    "5AC09A": "40C080",  # green
    "78CEAD": "60D098",  # bright green
    "358365": "2D9060",  # dim green
    "E8C468": "D8B030",  # yellow
    "F0DC88": "E8C850",  # bright yellow
    "A89C58": "988828",  # dim yellow
    "8BA4FF": "8050C8",  # blue
    "A8BCFF": "9870D8",  # bright blue
    "6270B0": "5040A0",  # dim blue
    "FF7DB0": "D04080",  # pink
    "FF9BC8": "E06098",  # bright magenta
    "B86080": "A04060",  # dim magenta
    "5ED4E0": "30C0C8",  # teal
    "7EE0EA": "50D0D8",  # bright cyan
    "4298A0": "208088",  # dim cyan
    "705860": "604858",  # dim white
    "7AC8FF": "4098D8",  # sky
    "7AA8C0": "6070C8",  # sapphire
    "FFA07A": "E88050",  # peach
}


def substitute_colors(theme_str, color_map):
    """Substitute 6-char hex colors in 8-char Zed color strings, preserving alpha."""
    def replacer(match):
        hex6 = match.group(1)
        alpha = match.group(2)
        new_hex6 = color_map.get(hex6, hex6)
        return f"#{new_hex6}{alpha}"
    return re.sub(r'#([0-9A-Fa-f]{6})([0-9A-Fa-f]{2})', replacer, theme_str)


def main():
    project_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    pastel_path = os.path.join(project_dir, "themes", "zed", "themes", "synthpunk-pastel.json")
    output_path = os.path.join(project_dir, "themes", "zed", "themes", "synthpunk-neon.json")

    with open(pastel_path) as f:
        theme_data = json.load(f)

    # Update metadata
    theme_data["name"] = "Synthpunk Neon"
    theme_data["author"] = "Synthpunk"

    # Update variant names
    theme_data["themes"][0]["name"] = "Synthpunk Neon Dark"
    theme_data["themes"][1]["name"] = "Synthpunk Neon Light"

    # Convert to string for substitution
    theme_str = json.dumps(theme_data, indent=2)

    # Split into dark and light sections for targeted substitution
    dark_end_marker = '"name": "Synthpunk Neon Light"'
    parts = theme_str.split(dark_end_marker)

    if len(parts) != 2:
        raise RuntimeError("Could not split theme into dark/light variants")

    dark_part = substitute_colors(parts[0], DARK_MAP)
    light_part = substitute_colors(dark_end_marker + parts[1], LIGHT_MAP)

    result = dark_part + light_part

    with open(output_path, "w") as f:
        f.write(result)

    print(f"Generated {output_path}")


if __name__ == "__main__":
    main()
