use std::collections::HashMap;

/// A neon palette keyed by semantic role.
#[derive(Debug, Clone, Default)]
pub struct Palette {
    colors: HashMap<String, u32>,
}

impl Palette {
    pub fn new() -> Self {
        Self::default()
    }

    /// Insert a color and return `self` for chaining.
    pub fn set(&mut self, role: &str, hex: u32) -> &mut Self {
        self.colors.insert(role.to_string(), hex);
        self
    }

    pub fn get(&self, role: &str) -> Option<u32> {
        self.colors.get(role).copied()
    }
}

fn main() {
    let mut p = Palette::new();
    p.set("keyword", 0xFF5CA8).set("string", 0x40FF80);
    println!("keyword = {:#08X}", p.get("keyword").unwrap_or(0));
}
