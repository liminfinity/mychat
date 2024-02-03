import { useContext } from "react"
import { UserContext } from "../../../Context/ChatContext"
export default function MessageContent({content, sender}) {
    const user = useContext(UserContext);
    const isFriend = user.id != sender;
    return (
        <span className={'message' + (isFriend ? ' bg-friendMessage rounded-bl-none' : ' rounded-br-none')}>{content}</span>
    )
}
