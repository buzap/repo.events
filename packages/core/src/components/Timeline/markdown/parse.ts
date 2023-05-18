import { marked } from 'marked'

const MAX_CONTENT_LENGTH = 1000
const DEFAULT_PREVIEW_MAX_LENGTH = 200

const ghMetionExtension: marked.TokenizerAndRendererExtension = {
    name: 'gh-mention',
    level: 'inline',
    start: (src) => {
        return src.match(/@/)?.index
    },
    tokenizer: (src) => {
        const match = src.match(/^@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9])/)
        if (!match) {
            return
        }
        return {
            type: 'gh-mention',
            raw: match[0],
            user: match[1],
        }
    },
    renderer: (token) => {
        return `<a class="gh-mention" href="https://github.com/${token.user}">@${token.user}</a>`
    },
}

const ghPlaceholderExtension: marked.RendererExtension = {
    name: 'gh-placeholder',
    renderer: (token) => {
        let content = token.kind
        if (token.text) {
            content += ' ' + token.text
        }
        let tag = 'p'
        if (token.kind === 'image') {
            tag = 'span'
        }
        return `<${tag} class="gh-placeholder gh-placeholder-${token.kind}">[${content}]</${tag}>`
    },
}

const destyledRenderer: marked.RendererObject = {
    html: (src) => {
        // exclude html comment from output
        if (src.trimStart().startsWith('<!--')) {
            return ''
        }
        return false
    },
    heading: (text) => {
        return `<p>${text}</p>`
    },
}

marked.use({
    async: true,
    gfm: true,
    extensions: [ghMetionExtension, ghPlaceholderExtension],
    renderer: destyledRenderer,
})

export interface ParseOptions {
    maxLength?: number
}

function ensureParseOptions(opts?: ParseOptions): Required<ParseOptions> {
    const options = { ...opts }
    options.maxLength = options.maxLength ?? DEFAULT_PREVIEW_MAX_LENGTH
    return options as Required<ParseOptions>
}

export async function parse(content: string, opts?: ParseOptions): Promise<string> {
    if (content.length > MAX_CONTENT_LENGTH) {
        content = content.substring(0, MAX_CONTENT_LENGTH)
    }
    const options = ensureParseOptions(opts)
    let textCount = 0
    let truncated: boolean = false
    const walkTokens = (token: marked.Token) => {
        if ((token as any).truncateHere) {
            truncated = true
            return
        }
        if (!truncated && textCount > options.maxLength) {
            const t = token as marked.Tokens.Paragraph
            t.type = 'paragraph'
            t.text = '...'
            t.raw = '...'
            t.pre = false
            truncated = true
            return
        }
        if (truncated) {
            const t = token as marked.Tokens.HTML
            t.type = 'html'
            t.raw = ''
            t.text = ''
            return
        }

        if (token.type === 'table' || token.type === 'image') {
            const t = token as marked.Tokens.Generic
            t.kind = token.type
            t.type = 'gh-placeholder'
            textCount += 5
            return
        }

        if (token.type === 'list') {
            if (token.items.length > 3) {
                token.items = token.items.slice(0, 3)
                const lastItem = token.items[2]
                lastItem.tokens = [{ type: 'text', text: '...', raw: '...', truncateHere: true } as any]
            }
            return
        }

        if (token.type === 'text') {
            const len = token.text.length
            textCount += len
            if (textCount > options.maxLength) {
                token.text = token.text.substring(0, textCount - options.maxLength) + '...'
                truncated = true
            }
            return
        }
    }
    const out = marked.parse(content, { walkTokens })
    return out
}
