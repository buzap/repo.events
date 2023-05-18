import { parse } from './parse'

describe('markdown parsing', () => {
    test('mention user', async () => {
        const content = `welcome @john to our comminuty`
        const out = await parse(content)
        console.log(out)
        expect(out).toMatchInlineSnapshot(`
            "<p>welcome <a class=\\"gh-mention\\" href=\\"https://github.com/john\\">@john</a> to our comminuty</p>
            "
        `)
    })

    test('comments removed', async () => {
        const content = `<!-- some comment --> 
# header

<!-- comment agagin, ant it's
multi-line
-->

some content

<!-- comment at the end -->
`
        const out = await parse(content)
        expect(out).toMatchInlineSnapshot(`
            "<p>header</p><p>some content</p>
            "
        `)
    })

    test('fold table', async () => {
        const content = `
| First Header  | Second Header |
| ------------- | ------------- |
| Content Cell  | Content Cell  |
| Content Cell  | Content Cell  |
        `
        const out = await parse(content)
        expect(out).toMatchInlineSnapshot(`"<p class=\\"gh-placeholder gh-placeholder-table\\">[table]</p>"`)
    })

    test('fold image', async () => {
        const content = `![This is an image](https://myoctocat.com/assets/images/base-octocat.svg)`
        const out = await parse(content)
        expect(out).toMatchInlineSnapshot(`
            "<p><span class=\\"gh-placeholder gh-placeholder-image\\">[image This is an image]</span></p>
            "
        `)
    })

    test('truncate long content', async () => {
        const content = `
# this is the title

and some random text, and some random text, and some random text,and some random text,
and some random text,and some random text.
        `
        const out = await parse(content, { maxLength: 100 })
        expect(out).toMatchInlineSnapshot(`
            "<p>this is the title</p><p>and some random text, and some random text, and some ra...</p>
            "
        `)
    })

    test('truncate at list', async () => {
        const content = `
* item A
* item B
* item C
* item D
* item F
        `
        const out = await parse(content)
        expect(out).toMatchInlineSnapshot(`
            "<ul>
            <li>item A</li>
            <li>item B</li>
            <li>...</li>
            </ul>
            "
        `)
    })

    //     test('truncate at HTML', async () => {
    //         const content = `
    // <p>this is the title</p><p>and some text</p>
    // <p><span class="gh-placeholder gh-placeholder-image">[image This is an image]</span></p>
    // <p class="gh-placeholder gh-placeholder-table">[table]</p>
    //         `
    //         const out = await parse(content, { maxLength: 50 })
    //         expect(out).toMatchInlineSnapshot(`
    //             "<p>this is the title</p><p>and some text</p>
    //             <p><span class=\\"gh-placeholder gh-placeholder-image\\">[image This is an image]</span></p>
    //             <p class=\\"gh-placeholder gh-placeholder-table\\">[table]</p>
    //                     "
    //         `)
    //     })
})
