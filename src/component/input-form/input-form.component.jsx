import "./input-form.style.scss"
const InputForm = ({label, htmlFor, ...otherProps}) => {
    return (
        <div className="from-group">
            <input
                {...otherProps}
                className="input-box"
            />
            {
                label?(
                    <label className="form-imput-label" htmlFor={htmlFor}>{label}</label>
                ):(
                    null
                )
            }
        </div>
    )

}
export default InputForm