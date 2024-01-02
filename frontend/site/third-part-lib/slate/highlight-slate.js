function decorationNode (node) {

  if (node.type !== 'code_block') return;

  let languageType = node.get('data').get('syntax');
  if (languageType === 'none') return;

  const grammer = Prism.languages[languageType];
  if (!grammer) {
    return [];
  }

  const texts = node.getTexts();
  const blockText = texts.map(t => t.text).join('\n');
  const tokens = Prism.tokenize(blockText, grammer);
  const decorations = [];
  let textLine = 0, text;
  let offset = 0;

  for (let token of tokens) {
    if (typeof token === 'string' && token.indexOf('\n') >= 0) {
      //the varialble enterNum is the num of \n in the token
      // get the number of \n buy split the token by '\n'
      let newlineTokens = token.split('\n');
      let enterNum = newlineTokens.length - 1;
      // get the next code_line which the content of is is not ' ' or null;
      textLine += enterNum;
      // get the initial offset of the code_line
      offset = newlineTokens.pop().length;
      continue;
    }
    text = texts.get(textLine);
    if (typeof token === 'string') {
      const decoration = Decoration.create({
        anchor: {
          key: text.key,
          offset: offset
        },
        focus: {
          key: text.key,
          offset: offset + token.length
        },
        mark: { type: 'code-highlight', data: { className:  'token' }}
      });
      decorations.push(decoration);
      offset += token.length;
    } else if (typeof token.content === 'string') {
      const decoration = Decoration.create({
        anchor: {
          key: text.key,
          offset: offset
        },
        focus: {
          key: text.key,
          offset: offset + token.content.length
        },
        mark: { type: 'code-highlight',data: { className: `token ${token.type}`} }
      });
      decorations.push(decoration);
      offset += token.content.length;
    }
  }
  return decorations;
}