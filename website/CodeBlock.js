import React from 'react'
import { string } from 'prop-types'
import Highlight, { defaultProps } from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/github'

export default function CodeBlock({ code, language }) {
  return (
    <Highlight {...defaultProps} code={code.trim()} language={language} theme={theme}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={style}>
          {tokens.map((line, i) => (
            <div {...getLineProps({ line })} key={i}>
              {line.map((token, key) => (
                <span {...getTokenProps({ token })} key={key} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  )
}

CodeBlock.propTypes = {
  code: string,
  language: string
}

CodeBlock.defaultProps = {
  language: 'jsx'
}
