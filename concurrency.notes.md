concorrente - a gente nao sabe quando A e B vão rodar;
paralelo - a gente tem certeza de que A e B rodam ao mesmo tempo;

```js
// programação imperativa
const user = loadUser(request);
user.save();
return 201; // created
```

// reativo
```js
return Promise.resolver({})
    .then(() => {
        return loadUser(request)
    })
    .then((user) => {
        user.save();
        return user;
    })
    .then((user) => {
        return 201;
    })
```

```js
return Promise.resolver({})
    .then(loadUser)
    .then(saveUser)
    .then(returnStatusCreated)
```

// reativo
```js
const user = await loadUser(request);
await user.save();
return 201; // created
```

// tentam rodar de modo paralelo
// map filter, but not for each, for of, reduce
```js
const users = loadUsersFromDatabase();
const activeUsers = users.filter((us) => us.active === true)
return activeUsers;
```

```js
const activeCount = 0;
const users = loadUsersFromDatabase();
const activeUsers = users.map((us) => {
    if (us.active === true) {
        activeCount = activeCount + 1;
    }
})
return activeCount;
```
[
    us1,
    us2,
    us3,
    us4,
    us5,
] => array de funcoes pra serem executadas em qualquer ordem. o resultado mantem a ordem
chamadas concorrentes;




// deadlock

// peco o token
{
user = loadUser(id) // db
applyProfileChances(user) // update valores
saveProfile(user) // db
}
// libero o token


req 1
// peco o token de usuario
{
    user = loadUser(id) // db 
}
// libero o token de usuario

applyProfileChances(user) // update valores

// peco o token de profile
{
saveProfile(user) // db
}
// libero o token de profile
final da req 1

req 2
// peco o token de profile, usuario
{
profile = loadProfile(user) // db profile
resetUserFromProfile(profile) // db user
}
// libero o token de profile, usuario
final da req 2





// mutavel
singleton

LogFile.getInstance().append()




controles de concorrencia (todo mundo executa em algum momento com os recursos que ele precisa)
============================

semaphoro
    - direito de passada;


const token = false;

const run = (operation) => {
    while (token == true) {
        await sleep(X_seconds);
    }
    token = true;
    await operation();
    token = false;
}

// com notificacao
const token = false;
const waitingList = [];

const run = (operation) => {
    if (token === true) {
        waitingList.append(operation);
    } else {
        token = true;
        await operation();
        token = false;
        run(waitingList.shift());
    }
}



barreiras = vc esta esperando algo pra continuar

```js
const users = [...100]
user.map(updateUser)
return updatedUsers
```


================== barreira

Promise.all(
    [
        loadUser(),
        loadRoles(),
        loadPermission()
    ]
).then(
    ([user, roles, permissions]) => {
        profile = { user, role, permission }
        save(profile)
    }
)


mutex (multiplexer)


