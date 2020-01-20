import React from 'react'
import { any, string } from 'prop-types'
import CodeBlock from '../CodeBlock'

export default function Example({ children, code }) {
  return (
    <div className='example'>
      <div className='example_preview'>
        {children}
      </div>

      <CodeBlock code={code} />
    </div>
  )
}

Example.propTypes = {
  code: string,
  children: any
}
