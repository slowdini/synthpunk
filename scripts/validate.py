#!/usr/bin/env python3
"""Validate synthpunk palette files."""

import json
import os
import re


def validate_hex(hex_str):
    return re.match(r"^[0-9A-Fa-f]{6}$", hex_str) is not None


def validate_palette(path, name):
    print(f"\nValidating {name}...")
    with open(path) as f:
        data = json.load(f)
    
    colors = data.get("colors", {})
    errors = []
    
    for color_name, color_data in colors.items():
        hex_val = color_data.get("hex", "")
        rgb = color_data.get("rgb", [])
        
        if not validate_hex(hex_val):
            errors.append(f"  Invalid hex for {color_name}: {hex_val}")
        
        if len(rgb) != 3 or not all(isinstance(v, int) and 0 <= v <= 255 for v in rgb):
            errors.append(f"  Invalid RGB for {color_name}: {rgb}")
        
        # Verify hex matches rgb
        expected_hex = f"{rgb[0]:02x}{rgb[1]:02x}{rgb[2]:02x}".upper()
        if hex_val.upper() != expected_hex:
            errors.append(f"  Hex/RGB mismatch for {color_name}: hex={hex_val}, rgb={rgb}")
    
    if errors:
        print(f"  FAILED with {len(errors)} errors:")
        for e in errors:
            print(e)
        return False
    else:
        print(f"  OK — {len(colors)} colors validated")
        return True


def validate_zed_theme(path, name):
    print(f"\nValidating {name}...")
    with open(path) as f:
        data = json.load(f)
    
    themes = data.get("themes", [])
    errors = []
    
    for theme in themes:
        style = theme.get("style", {})
        for key, value in style.items():
            if key == "syntax":
                for syntax_key, syntax_value in value.items():
                    color = syntax_value.get("color", "")
                    if color and not re.match(r"^#[0-9A-Fa-f]{8}$", color):
                        errors.append(f"  Invalid color in syntax.{syntax_key}: {color}")
            elif key == "players":
                continue
            elif value and not re.match(r"^#[0-9A-Fa-f]{8}$", str(value)):
                errors.append(f"  Invalid color in {key}: {value}")
    
    if errors:
        print(f"  FAILED with {len(errors)} errors:")
        for e in errors:
            print(e)
        return False
    else:
        print(f"  OK")
        return True


def main():
    project_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

    results = []
    # Pastel palettes
    results.append(validate_palette(os.path.join(project_dir, "palette", "base.json"), "base.json (pastel light)"))
    results.append(validate_palette(os.path.join(project_dir, "palette", "dark.json"), "dark.json (pastel dark)"))
    # Neon palettes
    results.append(validate_palette(os.path.join(project_dir, "palette", "neon-light.json"), "neon-light.json"))
    results.append(validate_palette(os.path.join(project_dir, "palette", "neon-dark.json"), "neon-dark.json"))
    # Zed themes
    results.append(validate_zed_theme(os.path.join(project_dir, "themes", "zed", "themes", "synthpunk-pastel.json"), "Zed synthpunk-pastel theme"))
    results.append(validate_zed_theme(os.path.join(project_dir, "themes", "zed", "themes", "synthpunk-neon.json"), "Zed synthpunk-neon theme"))

    print("\n" + "="*50)
    if all(results):
        print("All validations passed!")
    else:
        print("Some validations failed. Please fix the errors above.")


if __name__ == "__main__":
    main()
