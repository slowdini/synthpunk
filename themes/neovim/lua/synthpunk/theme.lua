-- Synthpunk Neovim theme — generated; do not edit

local M = {}

local variants = {
  ["pastel-dark"] = {
  meta = {
    name = "synthpunk-pastel-dark",
    variant = "pastel-dark",
    type = dark
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
      fg = "#705880",
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
      bg = "#5ED4E0",
      blend = 15
    },
    Search = {
      fg = "#1E1028",
      bg = "#FF9BB6"
    },
    IncSearch = {
      fg = "#1E1028",
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
      fg = "#705880"
    },
    Whitespace = {
      fg = "#705880"
    },
    SpecialKey = {
      fg = "#705880"
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
      fg = "#1E1028",
      bg = "#C49BFF"
    },
    lCursor = {
      link = Cursor
    },
    CursorIM = {
      link = Cursor
    },
    TermCursor = {
      link = Cursor
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
      fg = "#705880",
      italic = true
    },
    ["@comment.block"] = {
      fg = "#705880",
      italic = true
    },
    ["@comment.line"] = {
      fg = "#705880",
      italic = true
    },
    ["@comment.line.double-slash"] = {
      fg = "#705880",
      italic = true
    },
    ["@comment.line.number-sign"] = {
      fg = "#705880",
      italic = true
    },
    ["@comment.triple-slash"] = {
      fg = "#705880",
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
      fg = "#705880",
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
    Normal = {
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
    Underlined = {
      fg = "#8BA4FF"
    },
    Title = {
      fg = "#FFE4B5"
    },
    Bold = {
      fg = "#FFE4B5"
    },
    Italic = {
      fg = "#8BA4FF"
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
    type = light
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
      fg = "#C4A8B8",
      bg = "#FFF8F5"
    },
    CursorLineNr = {
      fg = "#5ED4E0"
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
      fg = "#C49BFF"
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
      bg = "#5ED4E0",
      blend = 15
    },
    Search = {
      fg = "#FFF8F5",
      bg = "#FF9BB6"
    },
    IncSearch = {
      fg = "#FFF8F5",
      bg = "#FF5470"
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
      fg = "#FF5470"
    },
    DiagnosticWarn = {
      fg = "#E8C468"
    },
    DiagnosticInfo = {
      fg = "#8BA4FF"
    },
    DiagnosticHint = {
      fg = "#5AC09A"
    },
    DiagnosticUnderlineError = {
      sp = "#FF5470",
      undercurl = true
    },
    DiagnosticUnderlineWarn = {
      sp = "#E8C468",
      undercurl = true
    },
    DiagnosticUnderlineInfo = {
      sp = "#8BA4FF",
      undercurl = true
    },
    DiagnosticUnderlineHint = {
      sp = "#5AC09A",
      undercurl = true
    },
    ErrorMsg = {
      fg = "#FF5470"
    },
    WarningMsg = {
      fg = "#E8C468"
    },
    MsgArea = {
      fg = "#2E1A24"
    },
    MsgSeparator = {
      fg = "#997A8A"
    },
    MoreMsg = {
      fg = "#5ED4E0"
    },
    ModeMsg = {
      fg = "#2E1A24",
      bold = true
    },
    NonText = {
      fg = "#C4A8B8"
    },
    Whitespace = {
      fg = "#C4A8B8"
    },
    SpecialKey = {
      fg = "#C4A8B8"
    },
    EndOfBuffer = {
      fg = "#FFF8F5"
    },
    Directory = {
      fg = "#5ED4E0"
    },
    MatchParen = {
      fg = "#FF5470",
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
      bg = "#C49BFF"
    },
    lCursor = {
      link = Cursor
    },
    CursorIM = {
      link = Cursor
    },
    TermCursor = {
      link = Cursor
    },
    TermCursorNC = {
      bg = "#C49BFF"
    },
    QuickFixLine = {
      bg = "#E4CCD8"
    },
    WildMenu = {
      fg = "#2E1A24",
      bg = "#E4CCD8"
    },
    Substitute = {
      bg = "#FF9BB6"
    },
    SpellBad = {
      sp = "#FF5470",
      undercurl = true
    },
    SpellCap = {
      sp = "#E8C468",
      undercurl = true
    },
    SpellLocal = {
      sp = "#8BA4FF",
      undercurl = true
    },
    SpellRare = {
      sp = "#5AC09A",
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
      fg = "#5AC09A"
    },
    DiffChange = {
      fg = "#E8C468"
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
      fg = "#C4A8B8",
      italic = true
    },
    ["@comment.block"] = {
      fg = "#C4A8B8",
      italic = true
    },
    ["@comment.line"] = {
      fg = "#C4A8B8",
      italic = true
    },
    ["@comment.line.double-slash"] = {
      fg = "#C4A8B8",
      italic = true
    },
    ["@comment.line.number-sign"] = {
      fg = "#C4A8B8",
      italic = true
    },
    ["@comment.triple-slash"] = {
      fg = "#C4A8B8",
      italic = true
    },
    ["@string"] = {
      fg = "#5AC09A"
    },
    ["@string.quoted.double"] = {
      fg = "#5AC09A"
    },
    ["@string.quoted.single"] = {
      fg = "#5AC09A"
    },
    ["@string.quoted.triple"] = {
      fg = "#5AC09A"
    },
    ["@string.unquoted"] = {
      fg = "#5AC09A"
    },
    ["@string.regexp"] = {
      fg = "#5AC09A"
    },
    ["@constant.character.escape"] = {
      fg = "#5AC09A"
    },
    ["@constant.character.escape.backslash"] = {
      fg = "#5AC09A"
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
      fg = "#5AC09A"
    },
    ["@entity.name.tag.html"] = {
      fg = "#5AC09A"
    },
    ["@entity.name.tag.xml"] = {
      fg = "#5AC09A"
    },
    ["@entity.name.tag.jsx"] = {
      fg = "#5AC09A"
    },
    ["@entity.other.attribute-name"] = {
      fg = "#E8C468"
    },
    ["@entity.other.attribute-name.html"] = {
      fg = "#E8C468"
    },
    ["@entity.other.attribute-name.xml"] = {
      fg = "#E8C468"
    },
    ["@entity.other.attribute-name.jsx"] = {
      fg = "#E8C468"
    },
    ["@entity.other.attribute-name.css"] = {
      fg = "#E8C468"
    },
    ["@entity.name.selector"] = {
      fg = "#E8C468"
    },
    ["@meta.selector"] = {
      fg = "#E8C468"
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
      fg = "#E8C468"
    },
    ["@entity.name.section"] = {
      fg = "#E8C468"
    },
    ["@heading"] = {
      fg = "#E8C468"
    },
    ["@markup.bold"] = {
      fg = "#E8C468"
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
      fg = "#C4A8B8",
      italic = true
    },
    String = {
      fg = "#5AC09A"
    },
    SpecialChar = {
      fg = "#5AC09A"
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
    Normal = {
      fg = "#8BA4FF"
    },
    Identifier = {
      fg = "#2E1A24"
    },
    Tag = {
      fg = "#5AC09A"
    },
    Structure = {
      fg = "#E8C468"
    },
    Delimiter = {
      fg = "#2E1A24"
    },
    PreProc = {
      fg = "#FF9BB6"
    },
    Underlined = {
      fg = "#8BA4FF"
    },
    Title = {
      fg = "#E8C468"
    },
    Bold = {
      fg = "#E8C468"
    },
    Italic = {
      fg = "#8BA4FF"
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
    "#2E1A24",
    "#FF516E",
    "#3EA27C",
    "#B68A1C",
    "#6989FF",
    "#FF4A91",
    "#219FAC",
    "#6B4F5E",
    "#6B4F5E",
    "#FF516E",
    "#3EA27C",
    "#B68A1C",
    "#6989FF",
    "#FF4A91",
    "#219FAC",
    "#2E1A24"
  }
},
  ["neon-dark"] = {
  meta = {
    name = "synthpunk-neon-dark",
    variant = "neon-dark",
    type = dark
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
      fg = "#503870",
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
      bg = "#00E8F0",
      blend = 15
    },
    Search = {
      fg = "#0F0620",
      bg = "#FF5CA8"
    },
    IncSearch = {
      fg = "#0F0620",
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
      fg = "#503870"
    },
    Whitespace = {
      fg = "#503870"
    },
    SpecialKey = {
      fg = "#503870"
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
      fg = "#0F0620",
      bg = "#D040FF"
    },
    lCursor = {
      link = Cursor
    },
    CursorIM = {
      link = Cursor
    },
    TermCursor = {
      link = Cursor
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
      fg = "#503870",
      italic = true
    },
    ["@comment.block"] = {
      fg = "#503870",
      italic = true
    },
    ["@comment.line"] = {
      fg = "#503870",
      italic = true
    },
    ["@comment.line.double-slash"] = {
      fg = "#503870",
      italic = true
    },
    ["@comment.line.number-sign"] = {
      fg = "#503870",
      italic = true
    },
    ["@comment.triple-slash"] = {
      fg = "#503870",
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
      fg = "#503870",
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
    Normal = {
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
    Underlined = {
      fg = "#A060FF"
    },
    Title = {
      fg = "#FFE040"
    },
    Bold = {
      fg = "#FFE040"
    },
    Italic = {
      fg = "#A060FF"
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
    type = light
  },
  ui = {
    Normal = {
      fg = "#2A1A30",
      bg = "#FAF6FA"
    },
    NormalNC = {
      fg = "#A898B0",
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
      fg = "#A898B0",
      bg = "#F0E8F5"
    },
    TabLine = {
      fg = "#A898B0",
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
      fg = "#C0A8C8",
      bg = "#FAF6FA"
    },
    CursorLineNr = {
      fg = "#30C0C8"
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
      bg = "#30C0C8",
      blend = 15
    },
    Search = {
      fg = "#FAF6FA",
      bg = "#E06098"
    },
    IncSearch = {
      fg = "#FAF6FA",
      bg = "#E04058"
    },
    Folded = {
      fg = "#A898B0",
      bg = "#F0E8F5"
    },
    FoldColumn = {
      fg = "#A898B0",
      bg = "#FAF6FA"
    },
    DiagnosticError = {
      fg = "#E04058"
    },
    DiagnosticWarn = {
      fg = "#D8B030"
    },
    DiagnosticInfo = {
      fg = "#8050C8"
    },
    DiagnosticHint = {
      fg = "#40C080"
    },
    DiagnosticUnderlineError = {
      sp = "#E04058",
      undercurl = true
    },
    DiagnosticUnderlineWarn = {
      sp = "#D8B030",
      undercurl = true
    },
    DiagnosticUnderlineInfo = {
      sp = "#8050C8",
      undercurl = true
    },
    DiagnosticUnderlineHint = {
      sp = "#40C080",
      undercurl = true
    },
    ErrorMsg = {
      fg = "#E04058"
    },
    WarningMsg = {
      fg = "#D8B030"
    },
    MsgArea = {
      fg = "#2A1A30"
    },
    MsgSeparator = {
      fg = "#A898B0"
    },
    MoreMsg = {
      fg = "#30C0C8"
    },
    ModeMsg = {
      fg = "#2A1A30",
      bold = true
    },
    NonText = {
      fg = "#C0A8C8"
    },
    Whitespace = {
      fg = "#C0A8C8"
    },
    SpecialKey = {
      fg = "#C0A8C8"
    },
    EndOfBuffer = {
      fg = "#FAF6FA"
    },
    Directory = {
      fg = "#30C0C8"
    },
    MatchParen = {
      fg = "#E04058",
      bold = true
    },
    ColorColumn = {
      bg = "#F0E8F5"
    },
    Conceal = {
      fg = "#A898B0",
      bg = "#FAF6FA"
    },
    Cursor = {
      fg = "#FAF6FA",
      bg = "#B050D0"
    },
    lCursor = {
      link = Cursor
    },
    CursorIM = {
      link = Cursor
    },
    TermCursor = {
      link = Cursor
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
      bg = "#E06098"
    },
    SpellBad = {
      sp = "#E04058",
      undercurl = true
    },
    SpellCap = {
      sp = "#D8B030",
      undercurl = true
    },
    SpellLocal = {
      sp = "#8050C8",
      undercurl = true
    },
    SpellRare = {
      sp = "#40C080",
      undercurl = true
    },
    Question = {
      fg = "#30C0C8"
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
      fg = "#40C080"
    },
    DiffChange = {
      fg = "#D8B030"
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
      fg = "#C0A8C8",
      italic = true
    },
    ["@comment.block"] = {
      fg = "#C0A8C8",
      italic = true
    },
    ["@comment.line"] = {
      fg = "#C0A8C8",
      italic = true
    },
    ["@comment.line.double-slash"] = {
      fg = "#C0A8C8",
      italic = true
    },
    ["@comment.line.number-sign"] = {
      fg = "#C0A8C8",
      italic = true
    },
    ["@comment.triple-slash"] = {
      fg = "#C0A8C8",
      italic = true
    },
    ["@string"] = {
      fg = "#40C080"
    },
    ["@string.quoted.double"] = {
      fg = "#40C080"
    },
    ["@string.quoted.single"] = {
      fg = "#40C080"
    },
    ["@string.quoted.triple"] = {
      fg = "#40C080"
    },
    ["@string.unquoted"] = {
      fg = "#40C080"
    },
    ["@string.regexp"] = {
      fg = "#40C080"
    },
    ["@constant.character.escape"] = {
      fg = "#40C080"
    },
    ["@constant.character.escape.backslash"] = {
      fg = "#40C080"
    },
    ["@constant.numeric"] = {
      fg = "#E88050"
    },
    ["@constant.numeric.float"] = {
      fg = "#E88050"
    },
    ["@constant.numeric.integer"] = {
      fg = "#E88050"
    },
    ["@constant.numeric.hex"] = {
      fg = "#E88050"
    },
    ["@constant.numeric.octal"] = {
      fg = "#E88050"
    },
    ["@constant.numeric.binary"] = {
      fg = "#E88050"
    },
    ["@constant.language.boolean"] = {
      fg = "#E88050"
    },
    ["@constant.language.true"] = {
      fg = "#E88050"
    },
    ["@constant.language.false"] = {
      fg = "#E88050"
    },
    ["@constant"] = {
      fg = "#E88050"
    },
    ["@constant.language"] = {
      fg = "#E88050"
    },
    ["@constant.language.null"] = {
      fg = "#E88050"
    },
    ["@constant.language.undefined"] = {
      fg = "#E88050"
    },
    ["@constant.language.nan"] = {
      fg = "#E88050"
    },
    ["@keyword"] = {
      fg = "#E06098"
    },
    ["@keyword.control"] = {
      fg = "#E06098"
    },
    ["@keyword.control.import"] = {
      fg = "#E06098"
    },
    ["@keyword.control.from"] = {
      fg = "#E06098"
    },
    ["@keyword.control.export"] = {
      fg = "#E06098"
    },
    ["@keyword.control.return"] = {
      fg = "#E06098"
    },
    ["@keyword.control.flow"] = {
      fg = "#E06098"
    },
    ["@keyword.control.conditional"] = {
      fg = "#E06098"
    },
    ["@keyword.control.loop"] = {
      fg = "#E06098"
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
      fg = "#E88050"
    },
    ["@storage.type.class"] = {
      fg = "#E88050"
    },
    ["@storage.type.enum"] = {
      fg = "#E88050"
    },
    ["@storage.type.interface"] = {
      fg = "#E88050"
    },
    ["@storage.type.struct"] = {
      fg = "#E88050"
    },
    ["@storage.type.function"] = {
      fg = "#E88050"
    },
    ["@storage.type.method"] = {
      fg = "#E88050"
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
      fg = "#4098D8"
    },
    ["@meta.method"] = {
      fg = "#4098D8"
    },
    ["@entity.name.function.constructor"] = {
      fg = "#8050C8"
    },
    ["@entity.name.type.class"] = {
      fg = "#E88050"
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
      fg = "#30C0C8"
    },
    ["@entity.name.variable.member"] = {
      fg = "#30C0C8"
    },
    ["@meta.property"] = {
      fg = "#30C0C8"
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
      fg = "#E88050"
    },
    ["@entity.name.type.enum"] = {
      fg = "#E88050"
    },
    ["@entity.name.type.interface"] = {
      fg = "#E88050"
    },
    ["@entity.name.type.struct"] = {
      fg = "#E88050"
    },
    ["@support.type"] = {
      fg = "#E88050"
    },
    ["@support.class"] = {
      fg = "#E88050"
    },
    ["@entity.name.type.alias"] = {
      fg = "#E88050"
    },
    ["@entity.name.namespace"] = {
      fg = "#E06098"
    },
    ["@entity.name.module"] = {
      fg = "#E06098"
    },
    ["@entity.name.package"] = {
      fg = "#E06098"
    },
    ["@entity.name.tag"] = {
      fg = "#40C080"
    },
    ["@entity.name.tag.html"] = {
      fg = "#40C080"
    },
    ["@entity.name.tag.xml"] = {
      fg = "#40C080"
    },
    ["@entity.name.tag.jsx"] = {
      fg = "#40C080"
    },
    ["@entity.other.attribute-name"] = {
      fg = "#D8B030"
    },
    ["@entity.other.attribute-name.html"] = {
      fg = "#D8B030"
    },
    ["@entity.other.attribute-name.xml"] = {
      fg = "#D8B030"
    },
    ["@entity.other.attribute-name.jsx"] = {
      fg = "#D8B030"
    },
    ["@entity.other.attribute-name.css"] = {
      fg = "#D8B030"
    },
    ["@entity.name.selector"] = {
      fg = "#D8B030"
    },
    ["@meta.selector"] = {
      fg = "#D8B030"
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
      fg = "#E06098"
    },
    ["@meta.preprocessor"] = {
      fg = "#E06098"
    },
    ["@meta.preprocessor.directive"] = {
      fg = "#E06098"
    },
    ["@keyword.control.preprocessor"] = {
      fg = "#E06098"
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
      fg = "#D8B030"
    },
    ["@entity.name.section"] = {
      fg = "#D8B030"
    },
    ["@heading"] = {
      fg = "#D8B030"
    },
    ["@markup.bold"] = {
      fg = "#D8B030"
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
      fg = "#C0A8C8",
      italic = true
    },
    String = {
      fg = "#40C080"
    },
    SpecialChar = {
      fg = "#40C080"
    },
    Number = {
      fg = "#E88050"
    },
    Boolean = {
      fg = "#E88050"
    },
    Constant = {
      fg = "#E88050"
    },
    Keyword = {
      fg = "#E06098"
    },
    Operator = {
      fg = "#B04068"
    },
    Type = {
      fg = "#E88050"
    },
    StorageClass = {
      fg = "#B050D0"
    },
    Function = {
      fg = "#8050C8"
    },
    Normal = {
      fg = "#8050C8"
    },
    Identifier = {
      fg = "#2A1A30"
    },
    Tag = {
      fg = "#40C080"
    },
    Structure = {
      fg = "#D8B030"
    },
    Delimiter = {
      fg = "#2A1A30"
    },
    PreProc = {
      fg = "#E06098"
    },
    Underlined = {
      fg = "#8050C8"
    },
    Title = {
      fg = "#D8B030"
    },
    Bold = {
      fg = "#D8B030"
    },
    Italic = {
      fg = "#8050C8"
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
    "#36A26C",
    "#AD8B21",
    "#8050C8",
    "#D04080",
    "#289EA5",
    "#6B5A78",
    "#6B5A78",
    "#E04058",
    "#36A26C",
    "#AD8B21",
    "#8050C8",
    "#D04080",
    "#289EA5",
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
