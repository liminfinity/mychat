import User from './user'

export default function UsersContainer({users}) {
    
  return (
    <div className='scrollGlass absolute w-screen sm:w-full mt-4 -left-3 sm:left-0 top-full z-50 h-71 overflow-y-auto glass py-3 px-4 rounded-b-xl rounded-t-md bg-mainColor'>
        {!users.length && <span className='text-lg py-2 px-4'>Пользователей нет</span>}
        {users && 
        <ul className='flex flex-col gap-4'>
            {users.map(user => {
                return <User key={user.id} user={user}/>
            })}
        </ul>}
    </div>
    
  )
}
