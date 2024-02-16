import { useContext } from "react"
import { UserContext } from "../../../context/ChatContext"
export default function MessageContent({content, sender}) {
    const user = useContext(UserContext);
    const isFriend = user.id != sender;
    return (
        <span className={'message 550:px-6 550:py-3 text-sm 550:text-base' + (isFriend ? ' bg-friendMessage rounded-bl-none' : ' rounded-br-none')}>{content}</span>
    )
}
