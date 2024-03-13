type TypographyProps = {
  children: React.ReactNode
}

export function TypographyH1({children, ...props}: TypographyProps) {
    return (
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl" {...props}>
        {children}
      </h1>
    )
}

export function TypographyH2({children, ...props}: TypographyProps) {
    return (
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0" {...props}>
        {children}
      </h2>
    )
}

export function TypographyH3({children, ...props}: TypographyProps) {
    return (
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight" {...props}>
        {children}
      </h3>
    )
}

export function TypographyH4({children, ...props}: TypographyProps) {
    return (
      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight" {...props}>
        {children}
      </h4>
    )
}

export function TypographyP({children, ...props}: TypographyProps) {
    return (
      <p className="leading-7 [&:not(:first-child)]:mt-6" {...props}>
        {children}
      </p>
    )
}

export function TypographyBlockquote({children, ...props}: TypographyProps) {
    return (
      <blockquote className="mt-6 border-l-2 pl-6 italic" {...props}>
        {children}
      </blockquote>
    )
}

export function TypographyList({children, ...props}: TypographyProps) {
  return (
    <ul className="my-6 ml-6 list-disc [&>li]:mt-2" {...props}>
      {children}
    </ul>
  )
}

export function TypographyInlineCode({children, ...props}: TypographyProps) {
  return (
    <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold" {...props}>
      {children}
    </code>
  )
}

export function TypographyLead({children, ...props}: TypographyProps) {
  return (
    <p className="text-xl text-muted-foreground" {...props}>
      {children}
    </p>
  )
}

export function TypographyLarge({children, ...props}: TypographyProps) {
  return (
    <div className="text-lg font-semibold" {...props}>
      {children}
    </div>
  )
}

export function TypographySmall({children, ...props}: TypographyProps) {
  return (
    <small className="text-sm font-medium leading-none" {...props}>
      {children}
    </small>
  )
}

export function TypographyMuted({children, ...props}: TypographyProps) {
  return (
    <p className="text-sm text-muted-foreground" {...props}>
      {children}
    </p>
  )
}