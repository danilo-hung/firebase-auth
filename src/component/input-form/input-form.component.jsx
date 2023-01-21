
const InputForm = ({label, htmlFor, ...otherProps}) => {
    return (
        <div>
            <label htmlFor={htmlFor}>{label}</label>
            <input
                {...otherProps}
                required
            />
        </div>
    )

}

export default InputForm