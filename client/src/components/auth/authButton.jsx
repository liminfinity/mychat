
export default function AuthButton({children}) {
  return <button type="submit" className={"button px-12 py-2 flex justify-center items-center gap-2 bg-sendMessage text-mainColor hover:bg-sendMessageHover rounded-xl"}>{children}</button>
}
