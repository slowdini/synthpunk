-- Synthpunk Neovim theme — generated; do not edit

local M = {}

local variants = {
  ["pastel-dark"] = {
  meta = {
    name = "synthpunk-pastel-dark",
    variant = "pastel-dark",
    type = "dark"
  },
  ui = {
    Normal = {
      fg = "#F0E0F0",
      bg = "#1E1028"
    },
    NormalNC = {
      fg = "#A090B8",
      bg = "#1E1028"
    },
    NormalFloat = {
      fg = "#F0E0F0",
      bg = "#1E1028"
    },
    StatusLine = {
      fg = "#F0E0F0",
      bg = "#4A3860"
    },
    StatusLineNC = {
      fg = "#A090B8",
      bg = "#2E1E40"
    },
    TabLine = {
      fg = "#A090B8",
      bg = "#0D0612"
    },
    TabLineFill = {
      bg = "#0D0612"
    },
    TabLineSel = {
      fg = "#F0E0F0",
      bg = "#1E1028"
    },
    CursorLine = {
      bg = "#2E1E40"
    },
    CursorColumn = {
      bg = "#2E1E40"
    },
    LineNr = {
      fg = "#7D628E",
      bg = "#1E1028"
    },
    CursorLineNr = {
      fg = "#5ED4E0"
    },
    SignColumn = {
      bg = "#1E1028"
    },
    VertSplit = {
      fg = "#2E1E40"
    },
    WinSeparator = {
      fg = "#3A2850"
    },
    FloatBorder = {
      fg = "#C49BFF"
    },
    FloatTitle = {
      fg = "#F0E0F0"
    },
    Pmenu = {
      fg = "#F0E0F0",
      bg = "#2E1E40"
    },
    PmenuSel = {
      fg = "#F0E0F0",
      bg = "#3A2850"
    },
    PmenuThumb = {
      bg = "#4A3860"
    },
    PmenuSbar = {
      bg = "#2E1E40"
    },
    Visual = {
      bg = "#362647",
      blend = 15
    },
    Search = {
      fg = "#0D0612",
      bg = "#FF9BB6"
    },
    IncSearch = {
      fg = "#0D0612",
      bg = "#FF5470"
    },
    Folded = {
      fg = "#A090B8",
      bg = "#2E1E40"
    },
    FoldColumn = {
      fg = "#A090B8",
      bg = "#1E1028"
    },
    DiagnosticError = {
      fg = "#FF5470"
    },
    DiagnosticWarn = {
      fg = "#FFE4B5"
    },
    DiagnosticInfo = {
      fg = "#8BA4FF"
    },
    DiagnosticHint = {
      fg = "#7FD7B5"
    },
    DiagnosticUnderlineError = {
      sp = "#FF5470",
      undercurl = true
    },
    DiagnosticUnderlineWarn = {
      sp = "#FFE4B5",
      undercurl = true
    },
    DiagnosticUnderlineInfo = {
      sp = "#8BA4FF",
      undercurl = true
    },
    DiagnosticUnderlineHint = {
      sp = "#7FD7B5",
      undercurl = true
    },
    ErrorMsg = {
      fg = "#FF5470"
    },
    WarningMsg = {
      fg = "#FFE4B5"
    },
    MsgArea = {
      fg = "#F0E0F0"
    },
    MsgSeparator = {
      fg = "#A090B8"
    },
    MoreMsg = {
      fg = "#5ED4E0"
    },
    ModeMsg = {
      fg = "#F0E0F0",
      bold = true
    },
    NonText = {
      fg = "#7D628E"
    },
    Whitespace = {
      fg = "#7D628E"
    },
    SpecialKey = {
      fg = "#7D628E"
    },
    EndOfBuffer = {
      fg = "#1E1028"
    },
    Directory = {
      fg = "#5ED4E0"
    },
    MatchParen = {
      fg = "#FF5470",
      bold = true
    },
    ColorColumn = {
      bg = "#2E1E40"
    },
    Conceal = {
      fg = "#A090B8",
      bg = "#1E1028"
    },
    Cursor = {
      fg = "#0D0612",
      bg = "#C49BFF"
    },
    lCursor = {
      link = "Cursor"
    },
    CursorIM = {
      link = "Cursor"
    },
    TermCursor = {
      link = "Cursor"
    },
    TermCursorNC = {
      bg = "#C49BFF"
    },
    QuickFixLine = {
      bg = "#3A2850"
    },
    WildMenu = {
      fg = "#F0E0F0",
      bg = "#3A2850"
    },
    Substitute = {
      fg = "#0D0612",
      bg = "#FF9BB6"
    },
    SpellBad = {
      sp = "#FF5470",
      undercurl = true
    },
    SpellCap = {
      sp = "#FFE4B5",
      undercurl = true
    },
    SpellLocal = {
      sp = "#8BA4FF",
      undercurl = true
    },
    SpellRare = {
      sp = "#7FD7B5",
      undercurl = true
    },
    Question = {
      fg = "#5ED4E0"
    },
    Bold = {
      bold = true
    },
    Italic = {
      italic = true
    },
    Underlined = {
      underline = true
    },
    DiffAdd = {
      fg = "#7FD7B5"
    },
    DiffChange = {
      fg = "#FFE4B5"
    },
    DiffDelete = {
      fg = "#FF5470"
    },
    DiffText = {
      fg = "#C49BFF"
    }
  },
  syntaxTreesitter = {
    ["@comment"] = {
      fg = "#7D628E",
      italic = true
    },
    ["@comment.block"] = {
      fg = "#7D628E",
      italic = true
    },
    ["@comment.line"] = {
      fg = "#7D628E",
      italic = true
    },
    ["@comment.line.double-slash"] = {
      fg = "#7D628E",
      italic = true
    },
    ["@comment.line.number-sign"] = {
      fg = "#7D628E",
      italic = true
    },
    ["@comment.triple-slash"] = {
      fg = "#7D628E",
      italic = true
    },
    ["@string"] = {
      fg = "#7FD7B5"
    },
    ["@string.quoted.double"] = {
      fg = "#7FD7B5"
    },
    ["@string.quoted.single"] = {
      fg = "#7FD7B5"
    },
    ["@string.quoted.triple"] = {
      fg = "#7FD7B5"
    },
    ["@string.unquoted"] = {
      fg = "#7FD7B5"
    },
    ["@string.regexp"] = {
      fg = "#7FD7B5"
    },
    ["@constant.character.escape"] = {
      fg = "#7FD7B5"
    },
    ["@constant.character.escape.backslash"] = {
      fg = "#7FD7B5"
    },
    ["@constant.numeric"] = {
      fg = "#FFA07A"
    },
    ["@constant.numeric.float"] = {
      fg = "#FFA07A"
    },
    ["@constant.numeric.integer"] = {
      fg = "#FFA07A"
    },
    ["@constant.numeric.hex"] = {
      fg = "#FFA07A"
    },
    ["@constant.numeric.octal"] = {
      fg = "#FFA07A"
    },
    ["@constant.numeric.binary"] = {
      fg = "#FFA07A"
    },
    ["@constant.language.boolean"] = {
      fg = "#FFA07A"
    },
    ["@constant.language.true"] = {
      fg = "#FFA07A"
    },
    ["@constant.language.false"] = {
      fg = "#FFA07A"
    },
    ["@constant"] = {
      fg = "#FFA07A"
    },
    ["@constant.language"] = {
      fg = "#FFA07A"
    },
    ["@constant.language.null"] = {
      fg = "#FFA07A"
    },
    ["@constant.language.undefined"] = {
      fg = "#FFA07A"
    },
    ["@constant.language.nan"] = {
      fg = "#FFA07A"
    },
    ["@keyword"] = {
      fg = "#FF9BB6"
    },
    ["@keyword.control"] = {
      fg = "#FF9BB6"
    },
    ["@keyword.control.import"] = {
      fg = "#FF9BB6"
    },
    ["@keyword.control.from"] = {
      fg = "#FF9BB6"
    },
    ["@keyword.control.export"] = {
      fg = "#FF9BB6"
    },
    ["@keyword.control.return"] = {
      fg = "#FF9BB6"
    },
    ["@keyword.control.flow"] = {
      fg = "#FF9BB6"
    },
    ["@keyword.control.conditional"] = {
      fg = "#FF9BB6"
    },
    ["@keyword.control.loop"] = {
      fg = "#FF9BB6"
    },
    ["@keyword.operator"] = {
      fg = "#D48BA0"
    },
    ["@keyword.operator.arithmetic"] = {
      fg = "#D48BA0"
    },
    ["@keyword.operator.assignment"] = {
      fg = "#D48BA0"
    },
    ["@keyword.operator.comparison"] = {
      fg = "#D48BA0"
    },
    ["@keyword.operator.logical"] = {
      fg = "#D48BA0"
    },
    ["@keyword.operator.new"] = {
      fg = "#D48BA0"
    },
    ["@keyword.operator.expression"] = {
      fg = "#D48BA0"
    },
    ["@storage.type"] = {
      fg = "#FFA07A"
    },
    ["@storage.type.class"] = {
      fg = "#FFA07A"
    },
    ["@storage.type.enum"] = {
      fg = "#FFA07A"
    },
    ["@storage.type.interface"] = {
      fg = "#FFA07A"
    },
    ["@storage.type.struct"] = {
      fg = "#FFA07A"
    },
    ["@storage.type.function"] = {
      fg = "#FFA07A"
    },
    ["@storage.type.method"] = {
      fg = "#FFA07A"
    },
    ["@storage.modifier"] = {
      fg = "#C49BFF"
    },
    ["@storage.modifier.async"] = {
      fg = "#C49BFF"
    },
    ["@storage.modifier.const"] = {
      fg = "#C49BFF"
    },
    ["@storage.modifier.static"] = {
      fg = "#C49BFF"
    },
    ["@storage.modifier.abstract"] = {
      fg = "#C49BFF"
    },
    ["@storage.modifier.readonly"] = {
      fg = "#C49BFF"
    },
    ["@storage.modifier.mutable"] = {
      fg = "#C49BFF"
    },
    ["@storage.modifier.private"] = {
      fg = "#C49BFF"
    },
    ["@storage.modifier.public"] = {
      fg = "#C49BFF"
    },
    ["@storage.modifier.protected"] = {
      fg = "#C49BFF"
    },
    ["@entity.name.function"] = {
      fg = "#8BA4FF"
    },
    ["@support.function"] = {
      fg = "#8BA4FF"
    },
    ["@meta.function-call"] = {
      fg = "#8BA4FF"
    },
    ["@meta.method-call"] = {
      fg = "#8BA4FF"
    },
    ["@entity.name.function.member"] = {
      fg = "#7AC8FF"
    },
    ["@meta.method"] = {
      fg = "#7AC8FF"
    },
    ["@entity.name.function.constructor"] = {
      fg = "#8BA4FF"
    },
    ["@entity.name.type.class"] = {
      fg = "#FFA07A"
    },
    ["@variable"] = {
      fg = "#F0E0F0"
    },
    ["@variable.other"] = {
      fg = "#F0E0F0"
    },
    ["@variable.other.member"] = {
      fg = "#F0E0F0"
    },
    ["@variable.other.object"] = {
      fg = "#F0E0F0"
    },
    ["@variable.other.constant"] = {
      fg = "#F0E0F0"
    },
    ["@meta.var"] = {
      fg = "#F0E0F0"
    },
    ["@variable.parameter"] = {
      fg = "#D48BA0"
    },
    ["@entity.name.variable.parameter"] = {
      fg = "#D48BA0"
    },
    ["@variable.other.property"] = {
      fg = "#5ED4E0"
    },
    ["@entity.name.variable.member"] = {
      fg = "#5ED4E0"
    },
    ["@meta.property"] = {
      fg = "#5ED4E0"
    },
    ["@entity.other.attribute"] = {
      fg = "#7AA8C0"
    },
    ["@meta.attribute"] = {
      fg = "#7AA8C0"
    },
    ["@decorator"] = {
      fg = "#7AA8C0"
    },
    ["@meta.decorator"] = {
      fg = "#7AA8C0"
    },
    ["@entity.name.type"] = {
      fg = "#FFA07A"
    },
    ["@entity.name.type.enum"] = {
      fg = "#FFA07A"
    },
    ["@entity.name.type.interface"] = {
      fg = "#FFA07A"
    },
    ["@entity.name.type.struct"] = {
      fg = "#FFA07A"
    },
    ["@support.type"] = {
      fg = "#FFA07A"
    },
    ["@support.class"] = {
      fg = "#FFA07A"
    },
    ["@entity.name.type.alias"] = {
      fg = "#FFA07A"
    },
    ["@entity.name.namespace"] = {
      fg = "#FF9BB6"
    },
    ["@entity.name.module"] = {
      fg = "#FF9BB6"
    },
    ["@entity.name.package"] = {
      fg = "#FF9BB6"
    },
    ["@entity.name.tag"] = {
      fg = "#7FD7B5"
    },
    ["@entity.name.tag.html"] = {
      fg = "#7FD7B5"
    },
    ["@entity.name.tag.xml"] = {
      fg = "#7FD7B5"
    },
    ["@entity.name.tag.jsx"] = {
      fg = "#7FD7B5"
    },
    ["@entity.other.attribute-name"] = {
      fg = "#FFE4B5"
    },
    ["@entity.other.attribute-name.html"] = {
      fg = "#FFE4B5"
    },
    ["@entity.other.attribute-name.xml"] = {
      fg = "#FFE4B5"
    },
    ["@entity.other.attribute-name.jsx"] = {
      fg = "#FFE4B5"
    },
    ["@entity.other.attribute-name.css"] = {
      fg = "#FFE4B5"
    },
    ["@entity.name.selector"] = {
      fg = "#FFE4B5"
    },
    ["@meta.selector"] = {
      fg = "#FFE4B5"
    },
    ["@punctuation"] = {
      fg = "#F0E0F0"
    },
    ["@punctuation.terminator"] = {
      fg = "#F0E0F0"
    },
    ["@punctuation.separator"] = {
      fg = "#F0E0F0"
    },
    ["@punctuation.separator.colon"] = {
      fg = "#F0E0F0"
    },
    ["@punctuation.separator.comma"] = {
      fg = "#F0E0F0"
    },
    ["@punctuation.separator.dot"] = {
      fg = "#F0E0F0"
    },
    ["@punctuation.separator.arrow"] = {
      fg = "#F0E0F0"
    },
    ["@punctuation.separator.key-value"] = {
      fg = "#F0E0F0"
    },
    ["@punctuation.section"] = {
      fg = "#F0E0F0"
    },
    ["@punctuation.section.brackets"] = {
      fg = "#F0E0F0"
    },
    ["@punctuation.section.parens"] = {
      fg = "#F0E0F0"
    },
    ["@punctuation.section.braces"] = {
      fg = "#F0E0F0"
    },
    ["@meta.brace"] = {
      fg = "#F0E0F0"
    },
    ["@punctuation.definition.brackets"] = {
      fg = "#F0E0F0"
    },
    ["@punctuation.definition.parens"] = {
      fg = "#F0E0F0"
    },
    ["@punctuation.definition.braces"] = {
      fg = "#F0E0F0"
    },
    ["@keyword.control.directive"] = {
      fg = "#FF9BB6"
    },
    ["@meta.preprocessor"] = {
      fg = "#FF9BB6"
    },
    ["@meta.preprocessor.directive"] = {
      fg = "#FF9BB6"
    },
    ["@keyword.control.preprocessor"] = {
      fg = "#FF9BB6"
    },
    ["@string.other.link"] = {
      fg = "#8BA4FF"
    },
    ["@markup.underline.link"] = {
      fg = "#8BA4FF"
    },
    ["@constant.other.reference.link"] = {
      fg = "#8BA4FF"
    },
    ["@markup.heading"] = {
      fg = "#FFE4B5"
    },
    ["@entity.name.section"] = {
      fg = "#FFE4B5"
    },
    ["@heading"] = {
      fg = "#FFE4B5"
    },
    ["@markup.bold"] = {
      fg = "#FFE4B5"
    },
    ["@markup.italic"] = {
      fg = "#8BA4FF"
    },
    ["@markup.deleted"] = {
      fg = "#FF5470",
      strikethrough = true
    },
    ["@markup.strikethrough"] = {
      fg = "#FF5470",
      strikethrough = true
    },
    ["@meta.deprecated"] = {
      fg = "#FF5470",
      strikethrough = true
    },
    ["@invalid"] = {
      fg = "#FF5470"
    },
    ["@invalid.illegal"] = {
      fg = "#FF5470"
    },
    ["@invalid.deprecated"] = {
      fg = "#FF5470"
    }
  },
  syntaxClassic = {
    Comment = {
      fg = "#7D628E",
      italic = true
    },
    String = {
      fg = "#7FD7B5"
    },
    SpecialChar = {
      fg = "#7FD7B5"
    },
    Number = {
      fg = "#FFA07A"
    },
    Boolean = {
      fg = "#FFA07A"
    },
    Constant = {
      fg = "#FFA07A"
    },
    Keyword = {
      fg = "#FF9BB6"
    },
    Operator = {
      fg = "#D48BA0"
    },
    Type = {
      fg = "#FFA07A"
    },
    StorageClass = {
      fg = "#C49BFF"
    },
    Function = {
      fg = "#8BA4FF"
    },
    Identifier = {
      fg = "#F0E0F0"
    },
    Tag = {
      fg = "#7FD7B5"
    },
    Structure = {
      fg = "#FFE4B5"
    },
    Delimiter = {
      fg = "#F0E0F0"
    },
    PreProc = {
      fg = "#FF9BB6"
    },
    Title = {
      fg = "#FFE4B5"
    },
    Error = {
      fg = "#FF5470"
    }
  },
  lspLinks = {
    ["@lsp.type.class"] = "@type",
    ["@lsp.type.comment"] = "@comment",
    ["@lsp.type.decorator"] = "@attribute",
    ["@lsp.type.enum"] = "@type",
    ["@lsp.type.enumMember"] = "@constant",
    ["@lsp.type.event"] = "@type",
    ["@lsp.type.function"] = "@function",
    ["@lsp.type.interface"] = "@type",
    ["@lsp.type.keyword"] = "@keyword",
    ["@lsp.type.macro"] = "@constant",
    ["@lsp.type.method"] = "@function.method",
    ["@lsp.type.namespace"] = "@namespace",
    ["@lsp.type.number"] = "@number",
    ["@lsp.type.operator"] = "@operator",
    ["@lsp.type.parameter"] = "@variable.parameter",
    ["@lsp.type.property"] = "@property",
    ["@lsp.type.regexp"] = "@string",
    ["@lsp.type.string"] = "@string",
    ["@lsp.type.struct"] = "@type",
    ["@lsp.type.type"] = "@type",
    ["@lsp.type.typeParameter"] = "@type",
    ["@lsp.type.variable"] = "@variable"
  },
  terminal = {
    "#0D0612",
    "#FF5470",
    "#7FD7B5",
    "#FFE4B5",
    "#8BA4FF",
    "#FF7DB0",
    "#5ED4E0",
    "#C8B0D8",
    "#A090B8",
    "#FF5470",
    "#7FD7B5",
    "#FFE4B5",
    "#8BA4FF",
    "#FF7DB0",
    "#5ED4E0",
    "#F0E0F0"
  }
},
  ["pastel-light"] = {
  meta = {
    name = "synthpunk-pastel-light",
    variant = "pastel-light",
    type = "light"
  },
  ui = {
    Normal = {
      fg = "#2E1A24",
      bg = "#FFF8F5"
    },
    NormalNC = {
      fg = "#997A8A",
      bg = "#FFF8F5"
    },
    NormalFloat = {
      fg = "#2E1A24",
      bg = "#FFF8F5"
    },
    StatusLine = {
      fg = "#2E1A24",
      bg = "#D4B8C8"
    },
    StatusLineNC = {
      fg = "#997A8A",
      bg = "#F0DEE8"
    },
    TabLine = {
      fg = "#997A8A",
      bg = "#FFE8E0"
    },
    TabLineFill = {
      bg = "#FFE8E0"
    },
    TabLineSel = {
      fg = "#2E1A24",
      bg = "#FFF8F5"
    },
    CursorLine = {
      bg = "#F0DEE8"
    },
    CursorColumn = {
      bg = "#F0DEE8"
    },
    LineNr = {
      fg = "#A27690",
      bg = "#FFF8F5"
    },
    CursorLineNr = {
      fg = "#03808E"
    },
    SignColumn = {
      bg = "#FFF8F5"
    },
    VertSplit = {
      fg = "#F0DEE8"
    },
    WinSeparator = {
      fg = "#E4CCD8"
    },
    FloatBorder = {
      fg = "#8A51C8"
    },
    FloatTitle = {
      fg = "#2E1A24"
    },
    Pmenu = {
      fg = "#2E1A24",
      bg = "#F0DEE8"
    },
    PmenuSel = {
      fg = "#2E1A24",
      bg = "#E4CCD8"
    },
    PmenuThumb = {
      bg = "#D4B8C8"
    },
    PmenuSbar = {
      bg = "#F0DEE8"
    },
    Visual = {
      bg = "#E7D5DC",
      blend = 15
    },
    Search = {
      fg = "#FFF8F5",
      bg = "#BB4970"
    },
    IncSearch = {
      fg = "#FFF8F5",
      bg = "#DB1836"
    },
    Folded = {
      fg = "#997A8A",
      bg = "#F0DEE8"
    },
    FoldColumn = {
      fg = "#997A8A",
      bg = "#FFF8F5"
    },
    DiagnosticError = {
      fg = "#DB1836"
    },
    DiagnosticWarn = {
      fg = "#8F6C02"
    },
    DiagnosticInfo = {
      fg = "#4556D2"
    },
    DiagnosticHint = {
      fg = "#037E55"
    },
    DiagnosticUnderlineError = {
      sp = "#DB1836",
      undercurl = true
    },
    DiagnosticUnderlineWarn = {
      sp = "#8F6C02",
      undercurl = true
    },
    DiagnosticUnderlineInfo = {
      sp = "#4556D2",
      undercurl = true
    },
    DiagnosticUnderlineHint = {
      sp = "#037E55",
      undercurl = true
    },
    ErrorMsg = {
      fg = "#DB1836"
    },
    WarningMsg = {
      fg = "#8F6C02"
    },
    MsgArea = {
      fg = "#2E1A24"
    },
    MsgSeparator = {
      fg = "#997A8A"
    },
    MoreMsg = {
      fg = "#03808E"
    },
    ModeMsg = {
      fg = "#2E1A24",
      bold = true
    },
    NonText = {
      fg = "#A27690"
    },
    Whitespace = {
      fg = "#A27690"
    },
    SpecialKey = {
      fg = "#A27690"
    },
    EndOfBuffer = {
      fg = "#FFF8F5"
    },
    Directory = {
      fg = "#03808E"
    },
    MatchParen = {
      fg = "#DB1836",
      bold = true
    },
    ColorColumn = {
      bg = "#F0DEE8"
    },
    Conceal = {
      fg = "#997A8A",
      bg = "#FFF8F5"
    },
    Cursor = {
      fg = "#FFF8F5",
      bg = "#8A51C8"
    },
    lCursor = {
      link = "Cursor"
    },
    CursorIM = {
      link = "Cursor"
    },
    TermCursor = {
      link = "Cursor"
    },
    TermCursorNC = {
      bg = "#8A51C8"
    },
    QuickFixLine = {
      bg = "#E4CCD8"
    },
    WildMenu = {
      fg = "#2E1A24",
      bg = "#E4CCD8"
    },
    Substitute = {
      fg = "#FFF8F5",
      bg = "#BB4970"
    },
    SpellBad = {
      sp = "#DB1836",
      undercurl = true
    },
    SpellCap = {
      sp = "#8F6C02",
      undercurl = true
    },
    SpellLocal = {
      sp = "#4556D2",
      undercurl = true
    },
    SpellRare = {
      sp = "#037E55",
      undercurl = true
    },
    Question = {
      fg = "#03808E"
    },
    Bold = {
      bold = true
    },
    Italic = {
      italic = true
    },
    Underlined = {
      underline = true
    },
    DiffAdd = {
      fg = "#037E55"
    },
    DiffChange = {
      fg = "#8F6C02"
    },
    DiffDelete = {
      fg = "#DB1836"
    },
    DiffText = {
      fg = "#8A51C8"
    }
  },
  syntaxTreesitter = {
    ["@comment"] = {
      fg = "#A27690",
      italic = true
    },
    ["@comment.block"] = {
      fg = "#A27690",
      italic = true
    },
    ["@comment.line"] = {
      fg = "#A27690",
      italic = true
    },
    ["@comment.line.double-slash"] = {
      fg = "#A27690",
      italic = true
    },
    ["@comment.line.number-sign"] = {
      fg = "#A27690",
      italic = true
    },
    ["@comment.triple-slash"] = {
      fg = "#A27690",
      italic = true
    },
    ["@string"] = {
      fg = "#037E55"
    },
    ["@string.quoted.double"] = {
      fg = "#037E55"
    },
    ["@string.quoted.single"] = {
      fg = "#037E55"
    },
    ["@string.quoted.triple"] = {
      fg = "#037E55"
    },
    ["@string.unquoted"] = {
      fg = "#037E55"
    },
    ["@string.regexp"] = {
      fg = "#037E55"
    },
    ["@constant.character.escape"] = {
      fg = "#037E55"
    },
    ["@constant.character.escape.backslash"] = {
      fg = "#037E55"
    },
    ["@constant.numeric"] = {
      fg = "#BC4D04"
    },
    ["@constant.numeric.float"] = {
      fg = "#BC4D04"
    },
    ["@constant.numeric.integer"] = {
      fg = "#BC4D04"
    },
    ["@constant.numeric.hex"] = {
      fg = "#BC4D04"
    },
    ["@constant.numeric.octal"] = {
      fg = "#BC4D04"
    },
    ["@constant.numeric.binary"] = {
      fg = "#BC4D04"
    },
    ["@constant.language.boolean"] = {
      fg = "#BC4D04"
    },
    ["@constant.language.true"] = {
      fg = "#BC4D04"
    },
    ["@constant.language.false"] = {
      fg = "#BC4D04"
    },
    ["@constant"] = {
      fg = "#BC4D04"
    },
    ["@constant.language"] = {
      fg = "#BC4D04"
    },
    ["@constant.language.null"] = {
      fg = "#BC4D04"
    },
    ["@constant.language.undefined"] = {
      fg = "#BC4D04"
    },
    ["@constant.language.nan"] = {
      fg = "#BC4D04"
    },
    ["@keyword"] = {
      fg = "#BB4970"
    },
    ["@keyword.control"] = {
      fg = "#BB4970"
    },
    ["@keyword.control.import"] = {
      fg = "#BB4970"
    },
    ["@keyword.control.from"] = {
      fg = "#BB4970"
    },
    ["@keyword.control.export"] = {
      fg = "#BB4970"
    },
    ["@keyword.control.return"] = {
      fg = "#BB4970"
    },
    ["@keyword.control.flow"] = {
      fg = "#BB4970"
    },
    ["@keyword.control.conditional"] = {
      fg = "#BB4970"
    },
    ["@keyword.control.loop"] = {
      fg = "#BB4970"
    },
    ["@keyword.operator"] = {
      fg = "#7F3E4C"
    },
    ["@keyword.operator.arithmetic"] = {
      fg = "#7F3E4C"
    },
    ["@keyword.operator.assignment"] = {
      fg = "#7F3E4C"
    },
    ["@keyword.operator.comparison"] = {
      fg = "#7F3E4C"
    },
    ["@keyword.operator.logical"] = {
      fg = "#7F3E4C"
    },
    ["@keyword.operator.new"] = {
      fg = "#7F3E4C"
    },
    ["@keyword.operator.expression"] = {
      fg = "#7F3E4C"
    },
    ["@storage.type"] = {
      fg = "#BC4D04"
    },
    ["@storage.type.class"] = {
      fg = "#BC4D04"
    },
    ["@storage.type.enum"] = {
      fg = "#BC4D04"
    },
    ["@storage.type.interface"] = {
      fg = "#BC4D04"
    },
    ["@storage.type.struct"] = {
      fg = "#BC4D04"
    },
    ["@storage.type.function"] = {
      fg = "#BC4D04"
    },
    ["@storage.type.method"] = {
      fg = "#BC4D04"
    },
    ["@storage.modifier"] = {
      fg = "#8A51C8"
    },
    ["@storage.modifier.async"] = {
      fg = "#8A51C8"
    },
    ["@storage.modifier.const"] = {
      fg = "#8A51C8"
    },
    ["@storage.modifier.static"] = {
      fg = "#8A51C8"
    },
    ["@storage.modifier.abstract"] = {
      fg = "#8A51C8"
    },
    ["@storage.modifier.readonly"] = {
      fg = "#8A51C8"
    },
    ["@storage.modifier.mutable"] = {
      fg = "#8A51C8"
    },
    ["@storage.modifier.private"] = {
      fg = "#8A51C8"
    },
    ["@storage.modifier.public"] = {
      fg = "#8A51C8"
    },
    ["@storage.modifier.protected"] = {
      fg = "#8A51C8"
    },
    ["@entity.name.function"] = {
      fg = "#4556D2"
    },
    ["@support.function"] = {
      fg = "#4556D2"
    },
    ["@meta.function-call"] = {
      fg = "#4556D2"
    },
    ["@meta.method-call"] = {
      fg = "#4556D2"
    },
    ["@entity.name.function.member"] = {
      fg = "#026BAA"
    },
    ["@meta.method"] = {
      fg = "#026BAA"
    },
    ["@entity.name.function.constructor"] = {
      fg = "#4556D2"
    },
    ["@entity.name.type.class"] = {
      fg = "#BC4D04"
    },
    ["@variable"] = {
      fg = "#2E1A24"
    },
    ["@variable.other"] = {
      fg = "#2E1A24"
    },
    ["@variable.other.member"] = {
      fg = "#2E1A24"
    },
    ["@variable.other.object"] = {
      fg = "#2E1A24"
    },
    ["@variable.other.constant"] = {
      fg = "#2E1A24"
    },
    ["@meta.var"] = {
      fg = "#2E1A24"
    },
    ["@variable.parameter"] = {
      fg = "#7F3E4C"
    },
    ["@entity.name.variable.parameter"] = {
      fg = "#7F3E4C"
    },
    ["@variable.other.property"] = {
      fg = "#03808E"
    },
    ["@entity.name.variable.member"] = {
      fg = "#03808E"
    },
    ["@meta.property"] = {
      fg = "#03808E"
    },
    ["@entity.other.attribute"] = {
      fg = "#546D86"
    },
    ["@meta.attribute"] = {
      fg = "#546D86"
    },
    ["@decorator"] = {
      fg = "#546D86"
    },
    ["@meta.decorator"] = {
      fg = "#546D86"
    },
    ["@entity.name.type"] = {
      fg = "#BC4D04"
    },
    ["@entity.name.type.enum"] = {
      fg = "#BC4D04"
    },
    ["@entity.name.type.interface"] = {
      fg = "#BC4D04"
    },
    ["@entity.name.type.struct"] = {
      fg = "#BC4D04"
    },
    ["@support.type"] = {
      fg = "#BC4D04"
    },
    ["@support.class"] = {
      fg = "#BC4D04"
    },
    ["@entity.name.type.alias"] = {
      fg = "#BC4D04"
    },
    ["@entity.name.namespace"] = {
      fg = "#BB4970"
    },
    ["@entity.name.module"] = {
      fg = "#BB4970"
    },
    ["@entity.name.package"] = {
      fg = "#BB4970"
    },
    ["@entity.name.tag"] = {
      fg = "#037E55"
    },
    ["@entity.name.tag.html"] = {
      fg = "#037E55"
    },
    ["@entity.name.tag.xml"] = {
      fg = "#037E55"
    },
    ["@entity.name.tag.jsx"] = {
      fg = "#037E55"
    },
    ["@entity.other.attribute-name"] = {
      fg = "#8F6C02"
    },
    ["@entity.other.attribute-name.html"] = {
      fg = "#8F6C02"
    },
    ["@entity.other.attribute-name.xml"] = {
      fg = "#8F6C02"
    },
    ["@entity.other.attribute-name.jsx"] = {
      fg = "#8F6C02"
    },
    ["@entity.other.attribute-name.css"] = {
      fg = "#8F6C02"
    },
    ["@entity.name.selector"] = {
      fg = "#8F6C02"
    },
    ["@meta.selector"] = {
      fg = "#8F6C02"
    },
    ["@punctuation"] = {
      fg = "#2E1A24"
    },
    ["@punctuation.terminator"] = {
      fg = "#2E1A24"
    },
    ["@punctuation.separator"] = {
      fg = "#2E1A24"
    },
    ["@punctuation.separator.colon"] = {
      fg = "#2E1A24"
    },
    ["@punctuation.separator.comma"] = {
      fg = "#2E1A24"
    },
    ["@punctuation.separator.dot"] = {
      fg = "#2E1A24"
    },
    ["@punctuation.separator.arrow"] = {
      fg = "#2E1A24"
    },
    ["@punctuation.separator.key-value"] = {
      fg = "#2E1A24"
    },
    ["@punctuation.section"] = {
      fg = "#2E1A24"
    },
    ["@punctuation.section.brackets"] = {
      fg = "#2E1A24"
    },
    ["@punctuation.section.parens"] = {
      fg = "#2E1A24"
    },
    ["@punctuation.section.braces"] = {
      fg = "#2E1A24"
    },
    ["@meta.brace"] = {
      fg = "#2E1A24"
    },
    ["@punctuation.definition.brackets"] = {
      fg = "#2E1A24"
    },
    ["@punctuation.definition.parens"] = {
      fg = "#2E1A24"
    },
    ["@punctuation.definition.braces"] = {
      fg = "#2E1A24"
    },
    ["@keyword.control.directive"] = {
      fg = "#BB4970"
    },
    ["@meta.preprocessor"] = {
      fg = "#BB4970"
    },
    ["@meta.preprocessor.directive"] = {
      fg = "#BB4970"
    },
    ["@keyword.control.preprocessor"] = {
      fg = "#BB4970"
    },
    ["@string.other.link"] = {
      fg = "#4556D2"
    },
    ["@markup.underline.link"] = {
      fg = "#4556D2"
    },
    ["@constant.other.reference.link"] = {
      fg = "#4556D2"
    },
    ["@markup.heading"] = {
      fg = "#8F6C02"
    },
    ["@entity.name.section"] = {
      fg = "#8F6C02"
    },
    ["@heading"] = {
      fg = "#8F6C02"
    },
    ["@markup.bold"] = {
      fg = "#8F6C02"
    },
    ["@markup.italic"] = {
      fg = "#4556D2"
    },
    ["@markup.deleted"] = {
      fg = "#DB1836",
      strikethrough = true
    },
    ["@markup.strikethrough"] = {
      fg = "#DB1836",
      strikethrough = true
    },
    ["@meta.deprecated"] = {
      fg = "#DB1836",
      strikethrough = true
    },
    ["@invalid"] = {
      fg = "#DB1836"
    },
    ["@invalid.illegal"] = {
      fg = "#DB1836"
    },
    ["@invalid.deprecated"] = {
      fg = "#DB1836"
    }
  },
  syntaxClassic = {
    Comment = {
      fg = "#A27690",
      italic = true
    },
    String = {
      fg = "#037E55"
    },
    SpecialChar = {
      fg = "#037E55"
    },
    Number = {
      fg = "#BC4D04"
    },
    Boolean = {
      fg = "#BC4D04"
    },
    Constant = {
      fg = "#BC4D04"
    },
    Keyword = {
      fg = "#BB4970"
    },
    Operator = {
      fg = "#7F3E4C"
    },
    Type = {
      fg = "#BC4D04"
    },
    StorageClass = {
      fg = "#8A51C8"
    },
    Function = {
      fg = "#4556D2"
    },
    Identifier = {
      fg = "#2E1A24"
    },
    Tag = {
      fg = "#037E55"
    },
    Structure = {
      fg = "#8F6C02"
    },
    Delimiter = {
      fg = "#2E1A24"
    },
    PreProc = {
      fg = "#BB4970"
    },
    Title = {
      fg = "#8F6C02"
    },
    Error = {
      fg = "#DB1836"
    }
  },
  lspLinks = {
    ["@lsp.type.class"] = "@type",
    ["@lsp.type.comment"] = "@comment",
    ["@lsp.type.decorator"] = "@attribute",
    ["@lsp.type.enum"] = "@type",
    ["@lsp.type.enumMember"] = "@constant",
    ["@lsp.type.event"] = "@type",
    ["@lsp.type.function"] = "@function",
    ["@lsp.type.interface"] = "@type",
    ["@lsp.type.keyword"] = "@keyword",
    ["@lsp.type.macro"] = "@constant",
    ["@lsp.type.method"] = "@function.method",
    ["@lsp.type.namespace"] = "@namespace",
    ["@lsp.type.number"] = "@number",
    ["@lsp.type.operator"] = "@operator",
    ["@lsp.type.parameter"] = "@variable.parameter",
    ["@lsp.type.property"] = "@property",
    ["@lsp.type.regexp"] = "@string",
    ["@lsp.type.string"] = "@string",
    ["@lsp.type.struct"] = "@type",
    ["@lsp.type.type"] = "@type",
    ["@lsp.type.typeParameter"] = "@type",
    ["@lsp.type.variable"] = "@variable"
  },
  terminal = {
    "#2E1A24",
    "#DB1836",
    "#037E55",
    "#8F6C02",
    "#4556D2",
    "#BB218A",
    "#03808E",
    "#614755",
    "#614755",
    "#DB1836",
    "#037E55",
    "#8F6C02",
    "#4556D2",
    "#BB218A",
    "#03808E",
    "#2E1A24"
  }
},
  ["neon-dark"] = {
  meta = {
    name = "synthpunk-neon-dark",
    variant = "neon-dark",
    type = "dark"
  },
  ui = {
    Normal = {
      fg = "#E8E0F0",
      bg = "#0F0620"
    },
    NormalNC = {
      fg = "#8878A0",
      bg = "#0F0620"
    },
    NormalFloat = {
      fg = "#E8E0F0",
      bg = "#0F0620"
    },
    StatusLine = {
      fg = "#E8E0F0",
      bg = "#301E50"
    },
    StatusLineNC = {
      fg = "#8878A0",
      bg = "#1A0D2E"
    },
    TabLine = {
      fg = "#8878A0",
      bg = "#060210"
    },
    TabLineFill = {
      bg = "#060210"
    },
    TabLineSel = {
      fg = "#E8E0F0",
      bg = "#0F0620"
    },
    CursorLine = {
      bg = "#1A0D2E"
    },
    CursorColumn = {
      bg = "#1A0D2E"
    },
    LineNr = {
      fg = "#6D4D99",
      bg = "#0F0620"
    },
    CursorLineNr = {
      fg = "#00E8F0"
    },
    SignColumn = {
      bg = "#0F0620"
    },
    VertSplit = {
      fg = "#1A0D2E"
    },
    WinSeparator = {
      fg = "#251540"
    },
    FloatBorder = {
      fg = "#D040FF"
    },
    FloatTitle = {
      fg = "#E8E0F0"
    },
    Pmenu = {
      fg = "#E8E0F0",
      bg = "#1A0D2E"
    },
    PmenuSel = {
      fg = "#E8E0F0",
      bg = "#251540"
    },
    PmenuThumb = {
      bg = "#301E50"
    },
    PmenuSbar = {
      bg = "#1A0D2E"
    },
    Visual = {
      bg = "#21133A",
      blend = 15
    },
    Search = {
      fg = "#060210",
      bg = "#FF5CA8"
    },
    IncSearch = {
      fg = "#060210",
      bg = "#FF3A50"
    },
    Folded = {
      fg = "#8878A0",
      bg = "#1A0D2E"
    },
    FoldColumn = {
      fg = "#8878A0",
      bg = "#0F0620"
    },
    DiagnosticError = {
      fg = "#FF3A50"
    },
    DiagnosticWarn = {
      fg = "#FFE040"
    },
    DiagnosticInfo = {
      fg = "#A060FF"
    },
    DiagnosticHint = {
      fg = "#40FF80"
    },
    DiagnosticUnderlineError = {
      sp = "#FF3A50",
      undercurl = true
    },
    DiagnosticUnderlineWarn = {
      sp = "#FFE040",
      undercurl = true
    },
    DiagnosticUnderlineInfo = {
      sp = "#A060FF",
      undercurl = true
    },
    DiagnosticUnderlineHint = {
      sp = "#40FF80",
      undercurl = true
    },
    ErrorMsg = {
      fg = "#FF3A50"
    },
    WarningMsg = {
      fg = "#FFE040"
    },
    MsgArea = {
      fg = "#E8E0F0"
    },
    MsgSeparator = {
      fg = "#8878A0"
    },
    MoreMsg = {
      fg = "#00E8F0"
    },
    ModeMsg = {
      fg = "#E8E0F0",
      bold = true
    },
    NonText = {
      fg = "#6D4D99"
    },
    Whitespace = {
      fg = "#6D4D99"
    },
    SpecialKey = {
      fg = "#6D4D99"
    },
    EndOfBuffer = {
      fg = "#0F0620"
    },
    Directory = {
      fg = "#00E8F0"
    },
    MatchParen = {
      fg = "#FF3A50",
      bold = true
    },
    ColorColumn = {
      bg = "#1A0D2E"
    },
    Conceal = {
      fg = "#8878A0",
      bg = "#0F0620"
    },
    Cursor = {
      fg = "#060210",
      bg = "#D040FF"
    },
    lCursor = {
      link = "Cursor"
    },
    CursorIM = {
      link = "Cursor"
    },
    TermCursor = {
      link = "Cursor"
    },
    TermCursorNC = {
      bg = "#D040FF"
    },
    QuickFixLine = {
      bg = "#251540"
    },
    WildMenu = {
      fg = "#E8E0F0",
      bg = "#251540"
    },
    Substitute = {
      fg = "#060210",
      bg = "#FF5CA8"
    },
    SpellBad = {
      sp = "#FF3A50",
      undercurl = true
    },
    SpellCap = {
      sp = "#FFE040",
      undercurl = true
    },
    SpellLocal = {
      sp = "#A060FF",
      undercurl = true
    },
    SpellRare = {
      sp = "#40FF80",
      undercurl = true
    },
    Question = {
      fg = "#00E8F0"
    },
    Bold = {
      bold = true
    },
    Italic = {
      italic = true
    },
    Underlined = {
      underline = true
    },
    DiffAdd = {
      fg = "#40FF80"
    },
    DiffChange = {
      fg = "#FFE040"
    },
    DiffDelete = {
      fg = "#FF3A50"
    },
    DiffText = {
      fg = "#D040FF"
    }
  },
  syntaxTreesitter = {
    ["@comment"] = {
      fg = "#6D4D99",
      italic = true
    },
    ["@comment.block"] = {
      fg = "#6D4D99",
      italic = true
    },
    ["@comment.line"] = {
      fg = "#6D4D99",
      italic = true
    },
    ["@comment.line.double-slash"] = {
      fg = "#6D4D99",
      italic = true
    },
    ["@comment.line.number-sign"] = {
      fg = "#6D4D99",
      italic = true
    },
    ["@comment.triple-slash"] = {
      fg = "#6D4D99",
      italic = true
    },
    ["@string"] = {
      fg = "#40FF80"
    },
    ["@string.quoted.double"] = {
      fg = "#40FF80"
    },
    ["@string.quoted.single"] = {
      fg = "#40FF80"
    },
    ["@string.quoted.triple"] = {
      fg = "#40FF80"
    },
    ["@string.unquoted"] = {
      fg = "#40FF80"
    },
    ["@string.regexp"] = {
      fg = "#40FF80"
    },
    ["@constant.character.escape"] = {
      fg = "#40FF80"
    },
    ["@constant.character.escape.backslash"] = {
      fg = "#40FF80"
    },
    ["@constant.numeric"] = {
      fg = "#FF8040"
    },
    ["@constant.numeric.float"] = {
      fg = "#FF8040"
    },
    ["@constant.numeric.integer"] = {
      fg = "#FF8040"
    },
    ["@constant.numeric.hex"] = {
      fg = "#FF8040"
    },
    ["@constant.numeric.octal"] = {
      fg = "#FF8040"
    },
    ["@constant.numeric.binary"] = {
      fg = "#FF8040"
    },
    ["@constant.language.boolean"] = {
      fg = "#FF8040"
    },
    ["@constant.language.true"] = {
      fg = "#FF8040"
    },
    ["@constant.language.false"] = {
      fg = "#FF8040"
    },
    ["@constant"] = {
      fg = "#FF8040"
    },
    ["@constant.language"] = {
      fg = "#FF8040"
    },
    ["@constant.language.null"] = {
      fg = "#FF8040"
    },
    ["@constant.language.undefined"] = {
      fg = "#FF8040"
    },
    ["@constant.language.nan"] = {
      fg = "#FF8040"
    },
    ["@keyword"] = {
      fg = "#FF5CA8"
    },
    ["@keyword.control"] = {
      fg = "#FF5CA8"
    },
    ["@keyword.control.import"] = {
      fg = "#FF5CA8"
    },
    ["@keyword.control.from"] = {
      fg = "#FF5CA8"
    },
    ["@keyword.control.export"] = {
      fg = "#FF5CA8"
    },
    ["@keyword.control.return"] = {
      fg = "#FF5CA8"
    },
    ["@keyword.control.flow"] = {
      fg = "#FF5CA8"
    },
    ["@keyword.control.conditional"] = {
      fg = "#FF5CA8"
    },
    ["@keyword.control.loop"] = {
      fg = "#FF5CA8"
    },
    ["@keyword.operator"] = {
      fg = "#C04078"
    },
    ["@keyword.operator.arithmetic"] = {
      fg = "#C04078"
    },
    ["@keyword.operator.assignment"] = {
      fg = "#C04078"
    },
    ["@keyword.operator.comparison"] = {
      fg = "#C04078"
    },
    ["@keyword.operator.logical"] = {
      fg = "#C04078"
    },
    ["@keyword.operator.new"] = {
      fg = "#C04078"
    },
    ["@keyword.operator.expression"] = {
      fg = "#C04078"
    },
    ["@storage.type"] = {
      fg = "#FF8040"
    },
    ["@storage.type.class"] = {
      fg = "#FF8040"
    },
    ["@storage.type.enum"] = {
      fg = "#FF8040"
    },
    ["@storage.type.interface"] = {
      fg = "#FF8040"
    },
    ["@storage.type.struct"] = {
      fg = "#FF8040"
    },
    ["@storage.type.function"] = {
      fg = "#FF8040"
    },
    ["@storage.type.method"] = {
      fg = "#FF8040"
    },
    ["@storage.modifier"] = {
      fg = "#D040FF"
    },
    ["@storage.modifier.async"] = {
      fg = "#D040FF"
    },
    ["@storage.modifier.const"] = {
      fg = "#D040FF"
    },
    ["@storage.modifier.static"] = {
      fg = "#D040FF"
    },
    ["@storage.modifier.abstract"] = {
      fg = "#D040FF"
    },
    ["@storage.modifier.readonly"] = {
      fg = "#D040FF"
    },
    ["@storage.modifier.mutable"] = {
      fg = "#D040FF"
    },
    ["@storage.modifier.private"] = {
      fg = "#D040FF"
    },
    ["@storage.modifier.public"] = {
      fg = "#D040FF"
    },
    ["@storage.modifier.protected"] = {
      fg = "#D040FF"
    },
    ["@entity.name.function"] = {
      fg = "#A060FF"
    },
    ["@support.function"] = {
      fg = "#A060FF"
    },
    ["@meta.function-call"] = {
      fg = "#A060FF"
    },
    ["@meta.method-call"] = {
      fg = "#A060FF"
    },
    ["@entity.name.function.member"] = {
      fg = "#40B0FF"
    },
    ["@meta.method"] = {
      fg = "#40B0FF"
    },
    ["@entity.name.function.constructor"] = {
      fg = "#A060FF"
    },
    ["@entity.name.type.class"] = {
      fg = "#FF8040"
    },
    ["@variable"] = {
      fg = "#E8E0F0"
    },
    ["@variable.other"] = {
      fg = "#E8E0F0"
    },
    ["@variable.other.member"] = {
      fg = "#E8E0F0"
    },
    ["@variable.other.object"] = {
      fg = "#E8E0F0"
    },
    ["@variable.other.constant"] = {
      fg = "#E8E0F0"
    },
    ["@meta.var"] = {
      fg = "#E8E0F0"
    },
    ["@variable.parameter"] = {
      fg = "#C04078"
    },
    ["@entity.name.variable.parameter"] = {
      fg = "#C04078"
    },
    ["@variable.other.property"] = {
      fg = "#00E8F0"
    },
    ["@entity.name.variable.member"] = {
      fg = "#00E8F0"
    },
    ["@meta.property"] = {
      fg = "#00E8F0"
    },
    ["@entity.other.attribute"] = {
      fg = "#6080FF"
    },
    ["@meta.attribute"] = {
      fg = "#6080FF"
    },
    ["@decorator"] = {
      fg = "#6080FF"
    },
    ["@meta.decorator"] = {
      fg = "#6080FF"
    },
    ["@entity.name.type"] = {
      fg = "#FF8040"
    },
    ["@entity.name.type.enum"] = {
      fg = "#FF8040"
    },
    ["@entity.name.type.interface"] = {
      fg = "#FF8040"
    },
    ["@entity.name.type.struct"] = {
      fg = "#FF8040"
    },
    ["@support.type"] = {
      fg = "#FF8040"
    },
    ["@support.class"] = {
      fg = "#FF8040"
    },
    ["@entity.name.type.alias"] = {
      fg = "#FF8040"
    },
    ["@entity.name.namespace"] = {
      fg = "#FF5CA8"
    },
    ["@entity.name.module"] = {
      fg = "#FF5CA8"
    },
    ["@entity.name.package"] = {
      fg = "#FF5CA8"
    },
    ["@entity.name.tag"] = {
      fg = "#40FF80"
    },
    ["@entity.name.tag.html"] = {
      fg = "#40FF80"
    },
    ["@entity.name.tag.xml"] = {
      fg = "#40FF80"
    },
    ["@entity.name.tag.jsx"] = {
      fg = "#40FF80"
    },
    ["@entity.other.attribute-name"] = {
      fg = "#FFE040"
    },
    ["@entity.other.attribute-name.html"] = {
      fg = "#FFE040"
    },
    ["@entity.other.attribute-name.xml"] = {
      fg = "#FFE040"
    },
    ["@entity.other.attribute-name.jsx"] = {
      fg = "#FFE040"
    },
    ["@entity.other.attribute-name.css"] = {
      fg = "#FFE040"
    },
    ["@entity.name.selector"] = {
      fg = "#FFE040"
    },
    ["@meta.selector"] = {
      fg = "#FFE040"
    },
    ["@punctuation"] = {
      fg = "#E8E0F0"
    },
    ["@punctuation.terminator"] = {
      fg = "#E8E0F0"
    },
    ["@punctuation.separator"] = {
      fg = "#E8E0F0"
    },
    ["@punctuation.separator.colon"] = {
      fg = "#E8E0F0"
    },
    ["@punctuation.separator.comma"] = {
      fg = "#E8E0F0"
    },
    ["@punctuation.separator.dot"] = {
      fg = "#E8E0F0"
    },
    ["@punctuation.separator.arrow"] = {
      fg = "#E8E0F0"
    },
    ["@punctuation.separator.key-value"] = {
      fg = "#E8E0F0"
    },
    ["@punctuation.section"] = {
      fg = "#E8E0F0"
    },
    ["@punctuation.section.brackets"] = {
      fg = "#E8E0F0"
    },
    ["@punctuation.section.parens"] = {
      fg = "#E8E0F0"
    },
    ["@punctuation.section.braces"] = {
      fg = "#E8E0F0"
    },
    ["@meta.brace"] = {
      fg = "#E8E0F0"
    },
    ["@punctuation.definition.brackets"] = {
      fg = "#E8E0F0"
    },
    ["@punctuation.definition.parens"] = {
      fg = "#E8E0F0"
    },
    ["@punctuation.definition.braces"] = {
      fg = "#E8E0F0"
    },
    ["@keyword.control.directive"] = {
      fg = "#FF5CA8"
    },
    ["@meta.preprocessor"] = {
      fg = "#FF5CA8"
    },
    ["@meta.preprocessor.directive"] = {
      fg = "#FF5CA8"
    },
    ["@keyword.control.preprocessor"] = {
      fg = "#FF5CA8"
    },
    ["@string.other.link"] = {
      fg = "#A060FF"
    },
    ["@markup.underline.link"] = {
      fg = "#A060FF"
    },
    ["@constant.other.reference.link"] = {
      fg = "#A060FF"
    },
    ["@markup.heading"] = {
      fg = "#FFE040"
    },
    ["@entity.name.section"] = {
      fg = "#FFE040"
    },
    ["@heading"] = {
      fg = "#FFE040"
    },
    ["@markup.bold"] = {
      fg = "#FFE040"
    },
    ["@markup.italic"] = {
      fg = "#A060FF"
    },
    ["@markup.deleted"] = {
      fg = "#FF3A50",
      strikethrough = true
    },
    ["@markup.strikethrough"] = {
      fg = "#FF3A50",
      strikethrough = true
    },
    ["@meta.deprecated"] = {
      fg = "#FF3A50",
      strikethrough = true
    },
    ["@invalid"] = {
      fg = "#FF3A50"
    },
    ["@invalid.illegal"] = {
      fg = "#FF3A50"
    },
    ["@invalid.deprecated"] = {
      fg = "#FF3A50"
    }
  },
  syntaxClassic = {
    Comment = {
      fg = "#6D4D99",
      italic = true
    },
    String = {
      fg = "#40FF80"
    },
    SpecialChar = {
      fg = "#40FF80"
    },
    Number = {
      fg = "#FF8040"
    },
    Boolean = {
      fg = "#FF8040"
    },
    Constant = {
      fg = "#FF8040"
    },
    Keyword = {
      fg = "#FF5CA8"
    },
    Operator = {
      fg = "#C04078"
    },
    Type = {
      fg = "#FF8040"
    },
    StorageClass = {
      fg = "#D040FF"
    },
    Function = {
      fg = "#A060FF"
    },
    Identifier = {
      fg = "#E8E0F0"
    },
    Tag = {
      fg = "#40FF80"
    },
    Structure = {
      fg = "#FFE040"
    },
    Delimiter = {
      fg = "#E8E0F0"
    },
    PreProc = {
      fg = "#FF5CA8"
    },
    Title = {
      fg = "#FFE040"
    },
    Error = {
      fg = "#FF3A50"
    }
  },
  lspLinks = {
    ["@lsp.type.class"] = "@type",
    ["@lsp.type.comment"] = "@comment",
    ["@lsp.type.decorator"] = "@attribute",
    ["@lsp.type.enum"] = "@type",
    ["@lsp.type.enumMember"] = "@constant",
    ["@lsp.type.event"] = "@type",
    ["@lsp.type.function"] = "@function",
    ["@lsp.type.interface"] = "@type",
    ["@lsp.type.keyword"] = "@keyword",
    ["@lsp.type.macro"] = "@constant",
    ["@lsp.type.method"] = "@function.method",
    ["@lsp.type.namespace"] = "@namespace",
    ["@lsp.type.number"] = "@number",
    ["@lsp.type.operator"] = "@operator",
    ["@lsp.type.parameter"] = "@variable.parameter",
    ["@lsp.type.property"] = "@property",
    ["@lsp.type.regexp"] = "@string",
    ["@lsp.type.string"] = "@string",
    ["@lsp.type.struct"] = "@type",
    ["@lsp.type.type"] = "@type",
    ["@lsp.type.typeParameter"] = "@type",
    ["@lsp.type.variable"] = "@variable"
  },
  terminal = {
    "#060210",
    "#FF3A50",
    "#40FF80",
    "#FFE040",
    "#A060FF",
    "#FF2A8A",
    "#00E8F0",
    "#B8A8D0",
    "#8878A0",
    "#FF3A50",
    "#40FF80",
    "#FFE040",
    "#A060FF",
    "#FF2A8A",
    "#00E8F0",
    "#E8E0F0"
  }
},
  ["neon-light"] = {
  meta = {
    name = "synthpunk-neon-light",
    variant = "neon-light",
    type = "light"
  },
  ui = {
    Normal = {
      fg = "#2A1A30",
      bg = "#FAF6FA"
    },
    NormalNC = {
      fg = "#9884A1",
      bg = "#FAF6FA"
    },
    NormalFloat = {
      fg = "#2A1A30",
      bg = "#FAF6FA"
    },
    StatusLine = {
      fg = "#2A1A30",
      bg = "#E0C8E8"
    },
    StatusLineNC = {
      fg = "#9884A1",
      bg = "#F0E8F5"
    },
    TabLine = {
      fg = "#9884A1",
      bg = "#F0E8F0"
    },
    TabLineFill = {
      bg = "#F0E8F0"
    },
    TabLineSel = {
      fg = "#2A1A30",
      bg = "#FAF6FA"
    },
    CursorLine = {
      bg = "#F0E8F5"
    },
    CursorColumn = {
      bg = "#F0E8F5"
    },
    LineNr = {
      fg = "#A37FAE",
      bg = "#FAF6FA"
    },
    CursorLineNr = {
      fg = "#00868C"
    },
    SignColumn = {
      bg = "#FAF6FA"
    },
    VertSplit = {
      fg = "#F0E8F5"
    },
    WinSeparator = {
      fg = "#E8D8F0"
    },
    FloatBorder = {
      fg = "#B050D0"
    },
    FloatTitle = {
      fg = "#2A1A30"
    },
    Pmenu = {
      fg = "#2A1A30",
      bg = "#F0E8F5"
    },
    PmenuSel = {
      fg = "#2A1A30",
      bg = "#E8D8F0"
    },
    PmenuThumb = {
      bg = "#E0C8E8"
    },
    PmenuSbar = {
      bg = "#F0E8F5"
    },
    Visual = {
      bg = "#ECDDF0",
      blend = 15
    },
    Search = {
      fg = "#FAF6FA",
      bg = "#BA57A7"
    },
    IncSearch = {
      fg = "#FAF6FA",
      bg = "#E04058"
    },
    Folded = {
      fg = "#9884A1",
      bg = "#F0E8F5"
    },
    FoldColumn = {
      fg = "#9884A1",
      bg = "#FAF6FA"
    },
    DiagnosticError = {
      fg = "#E04058"
    },
    DiagnosticWarn = {
      fg = "#907206"
    },
    DiagnosticInfo = {
      fg = "#8050C8"
    },
    DiagnosticHint = {
      fg = "#01844F"
    },
    DiagnosticUnderlineError = {
      sp = "#E04058",
      undercurl = true
    },
    DiagnosticUnderlineWarn = {
      sp = "#907206",
      undercurl = true
    },
    DiagnosticUnderlineInfo = {
      sp = "#8050C8",
      undercurl = true
    },
    DiagnosticUnderlineHint = {
      sp = "#01844F",
      undercurl = true
    },
    ErrorMsg = {
      fg = "#E04058"
    },
    WarningMsg = {
      fg = "#907206"
    },
    MsgArea = {
      fg = "#2A1A30"
    },
    MsgSeparator = {
      fg = "#9884A1"
    },
    MoreMsg = {
      fg = "#00868C"
    },
    ModeMsg = {
      fg = "#2A1A30",
      bold = true
    },
    NonText = {
      fg = "#A37FAE"
    },
    Whitespace = {
      fg = "#A37FAE"
    },
    SpecialKey = {
      fg = "#A37FAE"
    },
    EndOfBuffer = {
      fg = "#FAF6FA"
    },
    Directory = {
      fg = "#00868C"
    },
    MatchParen = {
      fg = "#E04058",
      bold = true
    },
    ColorColumn = {
      bg = "#F0E8F5"
    },
    Conceal = {
      fg = "#9884A1",
      bg = "#FAF6FA"
    },
    Cursor = {
      fg = "#FAF6FA",
      bg = "#B050D0"
    },
    lCursor = {
      link = "Cursor"
    },
    CursorIM = {
      link = "Cursor"
    },
    TermCursor = {
      link = "Cursor"
    },
    TermCursorNC = {
      bg = "#B050D0"
    },
    QuickFixLine = {
      bg = "#E8D8F0"
    },
    WildMenu = {
      fg = "#2A1A30",
      bg = "#E8D8F0"
    },
    Substitute = {
      fg = "#FAF6FA",
      bg = "#BA57A7"
    },
    SpellBad = {
      sp = "#E04058",
      undercurl = true
    },
    SpellCap = {
      sp = "#907206",
      undercurl = true
    },
    SpellLocal = {
      sp = "#8050C8",
      undercurl = true
    },
    SpellRare = {
      sp = "#01844F",
      undercurl = true
    },
    Question = {
      fg = "#00868C"
    },
    Bold = {
      bold = true
    },
    Italic = {
      italic = true
    },
    Underlined = {
      underline = true
    },
    DiffAdd = {
      fg = "#01844F"
    },
    DiffChange = {
      fg = "#907206"
    },
    DiffDelete = {
      fg = "#E04058"
    },
    DiffText = {
      fg = "#B050D0"
    }
  },
  syntaxTreesitter = {
    ["@comment"] = {
      fg = "#A37FAE",
      italic = true
    },
    ["@comment.block"] = {
      fg = "#A37FAE",
      italic = true
    },
    ["@comment.line"] = {
      fg = "#A37FAE",
      italic = true
    },
    ["@comment.line.double-slash"] = {
      fg = "#A37FAE",
      italic = true
    },
    ["@comment.line.number-sign"] = {
      fg = "#A37FAE",
      italic = true
    },
    ["@comment.triple-slash"] = {
      fg = "#A37FAE",
      italic = true
    },
    ["@string"] = {
      fg = "#01844F"
    },
    ["@string.quoted.double"] = {
      fg = "#01844F"
    },
    ["@string.quoted.single"] = {
      fg = "#01844F"
    },
    ["@string.quoted.triple"] = {
      fg = "#01844F"
    },
    ["@string.unquoted"] = {
      fg = "#01844F"
    },
    ["@string.regexp"] = {
      fg = "#01844F"
    },
    ["@constant.character.escape"] = {
      fg = "#01844F"
    },
    ["@constant.character.escape.backslash"] = {
      fg = "#01844F"
    },
    ["@constant.numeric"] = {
      fg = "#C65100"
    },
    ["@constant.numeric.float"] = {
      fg = "#C65100"
    },
    ["@constant.numeric.integer"] = {
      fg = "#C65100"
    },
    ["@constant.numeric.hex"] = {
      fg = "#C65100"
    },
    ["@constant.numeric.octal"] = {
      fg = "#C65100"
    },
    ["@constant.numeric.binary"] = {
      fg = "#C65100"
    },
    ["@constant.language.boolean"] = {
      fg = "#C65100"
    },
    ["@constant.language.true"] = {
      fg = "#C65100"
    },
    ["@constant.language.false"] = {
      fg = "#C65100"
    },
    ["@constant"] = {
      fg = "#C65100"
    },
    ["@constant.language"] = {
      fg = "#C65100"
    },
    ["@constant.language.null"] = {
      fg = "#C65100"
    },
    ["@constant.language.undefined"] = {
      fg = "#C65100"
    },
    ["@constant.language.nan"] = {
      fg = "#C65100"
    },
    ["@keyword"] = {
      fg = "#BA57A7"
    },
    ["@keyword.control"] = {
      fg = "#BA57A7"
    },
    ["@keyword.control.import"] = {
      fg = "#BA57A7"
    },
    ["@keyword.control.from"] = {
      fg = "#BA57A7"
    },
    ["@keyword.control.export"] = {
      fg = "#BA57A7"
    },
    ["@keyword.control.return"] = {
      fg = "#BA57A7"
    },
    ["@keyword.control.flow"] = {
      fg = "#BA57A7"
    },
    ["@keyword.control.conditional"] = {
      fg = "#BA57A7"
    },
    ["@keyword.control.loop"] = {
      fg = "#BA57A7"
    },
    ["@keyword.operator"] = {
      fg = "#B04068"
    },
    ["@keyword.operator.arithmetic"] = {
      fg = "#B04068"
    },
    ["@keyword.operator.assignment"] = {
      fg = "#B04068"
    },
    ["@keyword.operator.comparison"] = {
      fg = "#B04068"
    },
    ["@keyword.operator.logical"] = {
      fg = "#B04068"
    },
    ["@keyword.operator.new"] = {
      fg = "#B04068"
    },
    ["@keyword.operator.expression"] = {
      fg = "#B04068"
    },
    ["@storage.type"] = {
      fg = "#C65100"
    },
    ["@storage.type.class"] = {
      fg = "#C65100"
    },
    ["@storage.type.enum"] = {
      fg = "#C65100"
    },
    ["@storage.type.interface"] = {
      fg = "#C65100"
    },
    ["@storage.type.struct"] = {
      fg = "#C65100"
    },
    ["@storage.type.function"] = {
      fg = "#C65100"
    },
    ["@storage.type.method"] = {
      fg = "#C65100"
    },
    ["@storage.modifier"] = {
      fg = "#B050D0"
    },
    ["@storage.modifier.async"] = {
      fg = "#B050D0"
    },
    ["@storage.modifier.const"] = {
      fg = "#B050D0"
    },
    ["@storage.modifier.static"] = {
      fg = "#B050D0"
    },
    ["@storage.modifier.abstract"] = {
      fg = "#B050D0"
    },
    ["@storage.modifier.readonly"] = {
      fg = "#B050D0"
    },
    ["@storage.modifier.mutable"] = {
      fg = "#B050D0"
    },
    ["@storage.modifier.private"] = {
      fg = "#B050D0"
    },
    ["@storage.modifier.public"] = {
      fg = "#B050D0"
    },
    ["@storage.modifier.protected"] = {
      fg = "#B050D0"
    },
    ["@entity.name.function"] = {
      fg = "#8050C8"
    },
    ["@support.function"] = {
      fg = "#8050C8"
    },
    ["@meta.function-call"] = {
      fg = "#8050C8"
    },
    ["@meta.method-call"] = {
      fg = "#8050C8"
    },
    ["@entity.name.function.member"] = {
      fg = "#1278B8"
    },
    ["@meta.method"] = {
      fg = "#1278B8"
    },
    ["@entity.name.function.constructor"] = {
      fg = "#8050C8"
    },
    ["@entity.name.type.class"] = {
      fg = "#C65100"
    },
    ["@variable"] = {
      fg = "#2A1A30"
    },
    ["@variable.other"] = {
      fg = "#2A1A30"
    },
    ["@variable.other.member"] = {
      fg = "#2A1A30"
    },
    ["@variable.other.object"] = {
      fg = "#2A1A30"
    },
    ["@variable.other.constant"] = {
      fg = "#2A1A30"
    },
    ["@meta.var"] = {
      fg = "#2A1A30"
    },
    ["@variable.parameter"] = {
      fg = "#B04068"
    },
    ["@entity.name.variable.parameter"] = {
      fg = "#B04068"
    },
    ["@variable.other.property"] = {
      fg = "#00868C"
    },
    ["@entity.name.variable.member"] = {
      fg = "#00868C"
    },
    ["@meta.property"] = {
      fg = "#00868C"
    },
    ["@entity.other.attribute"] = {
      fg = "#6070C8"
    },
    ["@meta.attribute"] = {
      fg = "#6070C8"
    },
    ["@decorator"] = {
      fg = "#6070C8"
    },
    ["@meta.decorator"] = {
      fg = "#6070C8"
    },
    ["@entity.name.type"] = {
      fg = "#C65100"
    },
    ["@entity.name.type.enum"] = {
      fg = "#C65100"
    },
    ["@entity.name.type.interface"] = {
      fg = "#C65100"
    },
    ["@entity.name.type.struct"] = {
      fg = "#C65100"
    },
    ["@support.type"] = {
      fg = "#C65100"
    },
    ["@support.class"] = {
      fg = "#C65100"
    },
    ["@entity.name.type.alias"] = {
      fg = "#C65100"
    },
    ["@entity.name.namespace"] = {
      fg = "#BA57A7"
    },
    ["@entity.name.module"] = {
      fg = "#BA57A7"
    },
    ["@entity.name.package"] = {
      fg = "#BA57A7"
    },
    ["@entity.name.tag"] = {
      fg = "#01844F"
    },
    ["@entity.name.tag.html"] = {
      fg = "#01844F"
    },
    ["@entity.name.tag.xml"] = {
      fg = "#01844F"
    },
    ["@entity.name.tag.jsx"] = {
      fg = "#01844F"
    },
    ["@entity.other.attribute-name"] = {
      fg = "#907206"
    },
    ["@entity.other.attribute-name.html"] = {
      fg = "#907206"
    },
    ["@entity.other.attribute-name.xml"] = {
      fg = "#907206"
    },
    ["@entity.other.attribute-name.jsx"] = {
      fg = "#907206"
    },
    ["@entity.other.attribute-name.css"] = {
      fg = "#907206"
    },
    ["@entity.name.selector"] = {
      fg = "#907206"
    },
    ["@meta.selector"] = {
      fg = "#907206"
    },
    ["@punctuation"] = {
      fg = "#2A1A30"
    },
    ["@punctuation.terminator"] = {
      fg = "#2A1A30"
    },
    ["@punctuation.separator"] = {
      fg = "#2A1A30"
    },
    ["@punctuation.separator.colon"] = {
      fg = "#2A1A30"
    },
    ["@punctuation.separator.comma"] = {
      fg = "#2A1A30"
    },
    ["@punctuation.separator.dot"] = {
      fg = "#2A1A30"
    },
    ["@punctuation.separator.arrow"] = {
      fg = "#2A1A30"
    },
    ["@punctuation.separator.key-value"] = {
      fg = "#2A1A30"
    },
    ["@punctuation.section"] = {
      fg = "#2A1A30"
    },
    ["@punctuation.section.brackets"] = {
      fg = "#2A1A30"
    },
    ["@punctuation.section.parens"] = {
      fg = "#2A1A30"
    },
    ["@punctuation.section.braces"] = {
      fg = "#2A1A30"
    },
    ["@meta.brace"] = {
      fg = "#2A1A30"
    },
    ["@punctuation.definition.brackets"] = {
      fg = "#2A1A30"
    },
    ["@punctuation.definition.parens"] = {
      fg = "#2A1A30"
    },
    ["@punctuation.definition.braces"] = {
      fg = "#2A1A30"
    },
    ["@keyword.control.directive"] = {
      fg = "#BA57A7"
    },
    ["@meta.preprocessor"] = {
      fg = "#BA57A7"
    },
    ["@meta.preprocessor.directive"] = {
      fg = "#BA57A7"
    },
    ["@keyword.control.preprocessor"] = {
      fg = "#BA57A7"
    },
    ["@string.other.link"] = {
      fg = "#8050C8"
    },
    ["@markup.underline.link"] = {
      fg = "#8050C8"
    },
    ["@constant.other.reference.link"] = {
      fg = "#8050C8"
    },
    ["@markup.heading"] = {
      fg = "#907206"
    },
    ["@entity.name.section"] = {
      fg = "#907206"
    },
    ["@heading"] = {
      fg = "#907206"
    },
    ["@markup.bold"] = {
      fg = "#907206"
    },
    ["@markup.italic"] = {
      fg = "#8050C8"
    },
    ["@markup.deleted"] = {
      fg = "#E04058",
      strikethrough = true
    },
    ["@markup.strikethrough"] = {
      fg = "#E04058",
      strikethrough = true
    },
    ["@meta.deprecated"] = {
      fg = "#E04058",
      strikethrough = true
    },
    ["@invalid"] = {
      fg = "#E04058"
    },
    ["@invalid.illegal"] = {
      fg = "#E04058"
    },
    ["@invalid.deprecated"] = {
      fg = "#E04058"
    }
  },
  syntaxClassic = {
    Comment = {
      fg = "#A37FAE",
      italic = true
    },
    String = {
      fg = "#01844F"
    },
    SpecialChar = {
      fg = "#01844F"
    },
    Number = {
      fg = "#C65100"
    },
    Boolean = {
      fg = "#C65100"
    },
    Constant = {
      fg = "#C65100"
    },
    Keyword = {
      fg = "#BA57A7"
    },
    Operator = {
      fg = "#B04068"
    },
    Type = {
      fg = "#C65100"
    },
    StorageClass = {
      fg = "#B050D0"
    },
    Function = {
      fg = "#8050C8"
    },
    Identifier = {
      fg = "#2A1A30"
    },
    Tag = {
      fg = "#01844F"
    },
    Structure = {
      fg = "#907206"
    },
    Delimiter = {
      fg = "#2A1A30"
    },
    PreProc = {
      fg = "#BA57A7"
    },
    Title = {
      fg = "#907206"
    },
    Error = {
      fg = "#E04058"
    }
  },
  lspLinks = {
    ["@lsp.type.class"] = "@type",
    ["@lsp.type.comment"] = "@comment",
    ["@lsp.type.decorator"] = "@attribute",
    ["@lsp.type.enum"] = "@type",
    ["@lsp.type.enumMember"] = "@constant",
    ["@lsp.type.event"] = "@type",
    ["@lsp.type.function"] = "@function",
    ["@lsp.type.interface"] = "@type",
    ["@lsp.type.keyword"] = "@keyword",
    ["@lsp.type.macro"] = "@constant",
    ["@lsp.type.method"] = "@function.method",
    ["@lsp.type.namespace"] = "@namespace",
    ["@lsp.type.number"] = "@number",
    ["@lsp.type.operator"] = "@operator",
    ["@lsp.type.parameter"] = "@variable.parameter",
    ["@lsp.type.property"] = "@property",
    ["@lsp.type.regexp"] = "@string",
    ["@lsp.type.string"] = "@string",
    ["@lsp.type.struct"] = "@type",
    ["@lsp.type.type"] = "@type",
    ["@lsp.type.typeParameter"] = "@type",
    ["@lsp.type.variable"] = "@variable"
  },
  terminal = {
    "#2A1A30",
    "#E04058",
    "#01844F",
    "#907206",
    "#8050C8",
    "#D04080",
    "#00868C",
    "#63536F",
    "#63536F",
    "#E04058",
    "#01844F",
    "#907206",
    "#8050C8",
    "#D04080",
    "#00868C",
    "#2A1A30"
  }
},
}

local function hl(group, opts)
  if opts.link then
    vim.api.nvim_set_hl(0, group, { link = opts.link })
    return
  end
  local ok, result = pcall(vim.api.nvim_set_hl, 0, group, opts)
  if not ok then
    vim.api.nvim_set_hl(0, group, { fg = opts.fg, bg = opts.bg })
  end
end

function M.apply(variant)
  local palette = variants[variant]
  if not palette then
    vim.notify("synthpunk: unknown variant \"" .. variant .. "\"", vim.log.levels.ERROR)
    return
  end

  vim.o.termguicolors = true
  vim.o.background = palette.meta.type

  for group, opts in pairs(palette.ui) do hl(group, opts) end
  for group, opts in pairs(palette.syntaxTreesitter) do hl(group, opts) end
  for group, opts in pairs(palette.syntaxClassic) do hl(group, opts) end
  for from, to in pairs(palette.lspLinks) do hl(from, { link = to }) end

  for i, color in ipairs(palette.terminal) do
    vim.g["terminal_color_" .. (i - 1)] = color
  end
end

return M
