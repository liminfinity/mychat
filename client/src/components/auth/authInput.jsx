import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext, useState } from 'react'
import { QueryContext } from '../../context/CommonContext'

export default function AuthInput({placeholder, type, icon, name}) {
    const {form, setForm} = useContext(QueryContext);
    const [isFocus, setFocus] = useState(false);

    function handleChange(e) {
        setForm((draftForm) => {
            draftForm[e.target.name] = e.target.value
        })
    }

    return (
        <label className={'px-4 flex items-center justify-center gap-1 input rounded-xl bg-myMessage ' + (isFocus ? ' outline-sendMessage ' : '')}>
            {icon && <FontAwesomeIcon icon={icon}/>}
            <input name={name} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} className='input focus:outline-none bg-myMessage' type={type} placeholder={placeholder} value={form[name]} onChange={handleChange}/>
        </label>
    )
}
