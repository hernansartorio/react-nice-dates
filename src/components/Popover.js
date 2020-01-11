import React from 'react'
import { bool, node } from 'prop-types'
import classNames from 'classnames'

export default function Popover({ open, children }) {
  return <div className={classNames('nice-dates-popover', { '-open': open })}>{children}</div>
}

Popover.propTypes = {
  children: node,
  open: bool
}
