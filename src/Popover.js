import React from 'react'
import { bool, node } from 'prop-types'
import classNames from 'classnames'

const Popover = React.forwardRef(({ children, open }, ref) => (
  <div className={classNames('nice-dates-popover', { '-open': open })} ref={ref}>
    {children}
  </div>
))

Popover.displayName = 'Popover'

Popover.propTypes = {
  children: node,
  open: bool
}

export default Popover
