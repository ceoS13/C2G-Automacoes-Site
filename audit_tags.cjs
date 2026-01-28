
const fs = require('fs');
const path = require('path');

function auditFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    const stack = [];

    // Regex simple for tags. Doesn't handle everything but good for motion.*
    const tagRegex = /<\/?(motion\.[a-zA-Z0-9]+|section|article|header|footer|main|div)([^>]*?)(\/?)>/g;

    let match;
    while ((match = tagRegex.exec(content)) !== null) {
        const fullTag = match[0];
        const tagName = match[1];
        const isClosing = fullTag.startsWith('</');
        const isSelfClosing = match[3] === '/' || fullTag.endsWith('/>');

        // Calculate line number
        const lineNumber = content.substring(0, match.index).split('\n').length;

        if (isClosing) {
            if (stack.length === 0) {
                console.error(`[ERROR] ${filePath}:${lineNumber} - Closing tag </${tagName}> found but no opening tag.`);
                return;
            }
            const last = stack.pop();
            if (last.tagName !== tagName) {
                console.error(`[ERROR] ${filePath}:${lineNumber} - Expected </${last.tagName}> (opened at ${last.line}) but found </${tagName}>.`);
                return;
            }
        } else if (!isSelfClosing) {
            stack.push({ tagName, line: lineNumber });
        }
    }

    if (stack.length > 0) {
        const last = stack[stack.length - 1];
        console.error(`[ERROR] ${filePath}:${last.line} - Tag <${last.tagName}> is never closed.`);
    } else {
        console.log(`[OK] ${filePath}`);
    }
}

function walkDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            walkDir(filePath);
        } else if (file.endsWith('.tsx')) {
            auditFile(filePath);
        }
    }
}

walkDir('./components');
