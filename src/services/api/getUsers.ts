const getUsers = async () => {
    const response = await fetch('https://apigenerator.dronahq.com/api/P93xyegJ/users')
    .then(res => res.json())
    return response
}

export default getUsers;