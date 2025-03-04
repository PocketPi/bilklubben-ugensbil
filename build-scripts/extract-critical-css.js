// New file to extract critical CSS
const criticalCss = require('critical');

async function extractCriticalCSS() {
    await criticalCss.generate({
        base: 'dist/',
        src: 'index.html',
        target: {
            css: 'critical.css',
            html: 'index.html',
            inline: true
        },
        width: 1300,
        height: 900
    });
}

extractCriticalCSS();