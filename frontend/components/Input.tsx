const Input = ({ className, ...rest }: React.InputHTMLAttributes<HTMLInputElement>) => {
    const classes = `input input-bordered w-full ${className}`
    return <input {...rest} className={classes} />
}

export default Input