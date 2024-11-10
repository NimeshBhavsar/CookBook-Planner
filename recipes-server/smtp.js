import smtp from 'smtp-client'
const credentials = {
    host: 'smtp.host.com',
    port: 465,
    secure: true,
    auth: {
        user: 'username',
        pass: 'password'
    }
}

smtp.connect(credentials)
    .then(info => {
        // connected, credentials OK 
    }
    )