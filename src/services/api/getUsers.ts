const getUsers = async () => {
    const response = await fetch('https://retoolapi.dev/iNtNmX/users')
    .then(res => res.json())
    return response
}

export default getUsers;