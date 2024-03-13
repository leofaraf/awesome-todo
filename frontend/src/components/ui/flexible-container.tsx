type Props = {
    children: React.ReactNode,
    is_fixed?: boolean
}

export default function FlexibleContainer({children, is_fixed, ...props}: Props) {
    return (
        <div className={`${is_fixed && "fixed"} flex w-full justify-center`}>
            <div className="flex w-full p-4 sm:p-8 sm:px-14 justify-between items-center max-w-[1440px]" {...props}>
                {children}
            </div>
        </div>
    )
}