import { marked } from 'marked'

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

marked.use({
    async: true,
    gfm: true,
    extensions: [ghMetionExtension],
})

export async function parse(src: string): Promise<string> {
    const tokens = marked.lexer(src)
    const selected: marked.Token[] = []
    let truncateIndex = -1
    for (const [index, token] of tokens.entries()) {
        if (token.type === 'paragraph') {
            selected.push(token)
            truncateIndex = index
            break
        }
        if (token.type === 'blockquote') {
            const nextToken = tokens[index + 1]
            if (nextToken && nextToken.type === 'paragraph') {
                selected.push(token, nextToken)
                truncateIndex = index
                break
            }
        }
    }
    const truncated = truncateIndex !== -1 && truncateIndex < tokens.length - 1
    if (selected.length === 0 || truncated) {
        selected.push(makeEllipsisToken())
    }
    return marked.parser(selected)
}

function makeEllipsisToken(): marked.Token {
    return {
        type: 'paragraph',
        raw: '...',
        text: '...',
        tokens: [{ type: 'text', raw: '...', text: '...' }],
    }
}
