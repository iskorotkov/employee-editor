import React from 'react'

export const Floating = (props: { children: React.ReactNode, className?: string }) => {
  return (<div className={'form-floating ' + props.className}>
    {props.children}
  </div>)
}
