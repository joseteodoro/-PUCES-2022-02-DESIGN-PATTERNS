
// delegate ==== reuso

// chain of responsability
// decorator
// proxy  ==== // economia de recurso
// adapter


i(b(p('josé')))

interface Item {
    String content();
}

class P extends Item {
    String content;
    String content() {
        return this.content;
    }
}

class abstract Element extends Item {

    Item delegate;

    abstract String apply();

    String content() {
        // do something
        String tmp = this.content;
        return // do something
    }

}

Element('<i>')

B(I(P('jose')))
'<B><i>josé</i></B>'

Discount(Fees(Order()))

if (discount) {
    if (fees()) {
        // order
    }
    // order
}
if (fees()) {
    // order
}
// order

getByClient()

order = order()
// order = Tax(order)
// order = discount(order)

return order

//
//
//
this.abstractMethod()
//
//
//

public class ScannerKodakV0 {
    Image [] scan(){
        singleton
    };
}

public class ScannerKodakV1 {
    Image [] scan(Config cfg){
        //
    };
}

// temporario
public class Adapter extends ScannerKodakV0  {

    ScannerKodakV1 delegate;

    Config cfg;

    Image [] scan(){
        return this.delegate(cfg);
    };

}

// proxy


public class ScannerKodakV1 {

    // inicializa o scanner

    Image [] scan(Config cfg){
        //
    };
}


// mock, stub
public class ScannerKodakProxy extends ScannerKodakV1 {

    // do nothing
    Image [] scan(Config cfg){
        // delegate
        return new ScannerKodakV1().scan(cfg)
    };
}



const debit = [
    (req, resp, next) => {
        if(login()) {
            return next(req, resp)
        }
        return unauthorized;
    },
    (req, resp, next) => {
        if (blocked()) {
            return denied;
        }
        return next(req, resp);
    },
    (req, resp, next) => {
        if (hasBalance()) {
            return next(req, resp);
        }
        return insufficientFunds;
    },
    (req, resp, next) => {
        if (..) {
            return debit()
        }
        ...
    }
    terminador...
]


const withdraw = [
    (req, resp, next) => {
        if(login()) {
            return next(req, resp)
        }
        return unauthorized;
    },
    (req, resp, next) => {
        if (blocked()) {
            return denied;
        }
        return next(req, resp);
    },
    (req, resp, next) => {
        if (hasBalance()) {
            // delegate
            return next(req, resp);
        }
        return insufficientFunds;
    },
    (req, resp, next) => {
        if (..) {
            return withdraw()
        }
        ...
    }
    terminador...
]


const debit = [isLoginValid, isUserBlocked, hasFunds, debit, error500]
const withdraw = [isLoginValid, hasFunds, isUserBlocked, withdraw, error500]


interface Step {
    Result process(Config cfg);
}

class Login implements Step {

    Step delegate; 

    Result process(Config cfg) {
        // login
        return this.delegate.process(cfg)
    }

}


if () {
    if () {
        if () {
            if () {
    
            }
        }
        if () {
    
        }
        if () {
            if () {
    
            }
        }
    }    
}


if (login()) {
    
}
if (isUserBlocked()) {
    
}
if (hasBalance()) {
    
}
if () {
    
}
if () {
    
}
if () {
    
}

// reuso
// proxy == lazy loading

// =================================================

// delegate ==== reuso

// chain of responsability
// decorator
// proxy  ==== // economia de recurso
// adapters

// configuração de objetos
// ## Builder (esconder complexidade, valores default, evitar 
// construtores telescopicos)
// ## copy on constructor
// ## prototype
// ## factory 

// lombok lib java

@lombok
class User {
    id;
    name;
    email;
    city = 'spo';
    country = 'br';

    User(int id, string email, string name, string country, string city)
    
    User(User existentUser) {
        for(field in existentUser if field is not null) {
         // atribui no novo user   
        }
    }

    // need
    (id, email, name)

    //
    setCountry
    setCity

}

class UserBuilder {

    id = 1000;
    name;
    email = "--";

    withId(int){
        //
        return this;
    }
    withName(String){
      //
        return this;
    }
    withEmail(Strng){
        //
        return this;
    }

    User build(){

        // setup
    };
}


User(int id, string email, string name, country = 'br', city = 'spo')

new UserBuilder()
    .withEmail(someemail)
    .withId(someid)
    .build()

constructor({id, name, email})

let id = 100
let name = "jose"
let email = "jts@pucsp.br"

new User(id, name, email, 'br', 'ctba') // br, spo

// aridade

fn({})


class ImovelBuilder {

    id = 1000;
    name;
    
    withId(int){
        //
        return this;
    }
    withName(String){
      //
        return this;
    }
    withEmail(Strng){
        //
        return this;
    }

    Imovel build(){

        // setup
    };
}

// factory method
UserFactory {

    User of(type) {
        BuilderGuest
        BuilderAdmin
        BuilderCustomer
    }
}

BuilderGuest implements Builder<User>
BuilderAdmin implements Builder<User>
BuilderCustomer implements Builder<User>

BuilderGuest {
    build {
        return new Guest()
    }
}

interface Builder<>

BuilderImovel


KYC

abstract factory

User(DB)

PlainUser(front, back)

plainUser.setName(user.name)
plainUser.setid(user.id)
plainUser.setid(user.id)

class PlainUser {
    constructor(User us) {

    }
}

new PlainUser(db.loadById(1001))


// Imovel
// copy-on-constructor (prototipo, reuso de recursos custosos de instanciar)

// prototype

class User {

    image byte[] 10MB

    list<address> addresses

    constructor(User existentOne) {
        for each
    }

    User clone() {
        new list(this.addresses)
        return User(this)

    }
    // shallow copy
    // deep copy
}


this.addresses[1].city = ''



validations

// user not thread safe

validations.map(v => {validation: v, user: existentUser.clone()})
// [{v1, u1}, {v2, u1.b}]
    .map((validation, user) => validation(user))



User
Guest -- clone
Admin -- clone
Customer -- clone

// new User(Admin)
User us = user.clone() // guest, admin, customer

// prototype, abstracao, reuso de recurso, te ajuda a conquistar concorrencia


// prototype = abstracao, reuso de recurso, te ajuda a conquistar concorrencia
// builder = codigo fluente, esconde complexidade, campos opcionais / default, evita construtor telescopico
// copy on constructor = esconde complexide, conquista concorrencia, de-para entre objetos e banco
// factory => volta mais de um tipo concreto, ganha em abstracao

// Structural Patterns / Flyweight
// Creational Patterns / Object pool
// Creational Patterns / Prototype

mais sobre reuso de dados (array 1GB, custoso de carregar) e reuso de recursos escassos
 (smartphone, impressora, usb modem 4G)


// Object pool -- recursos escassos
 - pool de conexoes de banco de dados relacionais (custoso)
 - pool de impressao (spool)
 - pool de smartphones (jenkins)
 - pool scanners

pool = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] -> [1 ...

minConnection = 5
maxConnection = 20
timeout = 10sec

connection = pool.acquire() // existente ou uma nova

query
insert

connection.release()

printers = [epson1, epson2] -> [epson1 ...

lista circular de objetos que sao reusaveis


// Prototype

clone() // reuso de recurso so quando nao é deepclone


//shallow copy
user1 {
    photo: byte[1gb] -> 0x1 // pode ser mutavel
}

user2 {
    photo: byte[1gb] -> 0x1
}

pdf-printer {
    // photo: byte[1gb] -> 0x1
    user: user2
}

// Flyweight
singleton
regions = [1: [1gb], 2: [1gb], 3: [1gb], 4: [1gb], 5: [1gb], 6: [1gb]] // imutavel

rep1 {
    regions: regions.getInstance().get(1)
}

rep2 {
    regions: regions[2]
}

rep3 {
    regions: regions[1]
}

trace {
    regions: regions[1]
}

//

// cola temporaria
adapter implements v1, v2 {

    printv1(boolean)

    printv2()

}

adapter extends v2 implements v1 {

    printv1() {
        return this.printv2()
    }

    // inherited
    // printv2()

}


normalizacao de contrato distinto



printerv1 = new AdapterV2toV1(printerV2)

//




textExtractor {
    array<string> getParagraphs(book) {
        if() {
            mobi
        }
        if() {
            pdf2text
        }
    }
}

mobi                           pdf2text       ebooks                  fs.open
.mobi  (html zipado vAmazon), .pdf, .epub (html zipado vOpenSource), .txt

mobitextExtractor
mobi.getText

pdftextExtractor
pdf2text.getContent

epubtextExtractor
ebooks.toText


array<string> = [...]
array<string> = ['....']

// temporario
visitor {
    // overloading
    array<string> visit(ebook)
    array<string> visit(mobi)
    array<string> visit(pdf)
}

factory.of(type [mobi, epub, pdf]) {
    new visitor
}

array<book> books = fs.ls('*.epub, *.mobi, *.pdf')

books.map(book => {
    // visitor.updatePublishYear(book, new Date())
    array<string> ps = visitor.visit(book)
    extractParagraphs(ps)
    PNLText(ps)
    indexBibtex(ps)
    saveSQLITE()
})

visitor para ajudar no traverse de varios tipos distintos

o visitor tende a se transformar uma god classe por conhecer como todos os diferentes tipos de se comportam. Uma vez que ele que normaliza a chamada para que o traverser encare sempre o mesmo contrato

adapter vs visitor

o adapter faz adaptacao direcionada entre duas assinaturas
o visitor é uma festa onde todo mundo passa pela mesma assinatura (memso que nao sejam da mesma hierarquia de classes). Entao, ou criamos uma estrutura simples que FAZ TUDO ou criamos varias implementacoes e ligamos tudo por factories baseados no tipo do destino. Veja que aqui estamos indo para algo como um adapter, mas em que o destino do adapter é comum a todos os items a serem visitados.






microservices and distributed systems


orquestracao {
    account = createUserAccount() 30 sec // web service de accounts 
    profile = createProfile(account) 20  sec // web service de profile
    sendPasswordReset(profile)  // pop3
}

createProfile {
    onMessage (account) {
        profile = createProfile(account)
        messages.send('profile-created', profile)
    }
}

coreografia {
    messages.on('new-account', new createUserAccount())
    messages.on('account-created', new createProfile())
    messages.on('profile-created', new sendPasswordReset())
}

orquestracao vs coreografia
imperativo vs declarativo / reativo
blocking e non-blocking cabem aqui?


mediator vs observer | eventbus

mediator orquestra, observer reage
mediator é mais imperativo, observer é mais reativo
blocking e non-blocking cabem aqui?


generator
iterator


Dependency injection

class repository {
    set(dbClient)
}

lib context manager => spring, .netcore, next

context:
{
    repository(postgres)
}

context:
{
    repository(driver)
}

jdbc
SPI (specification // classe abstrata e interfaces)
v1
v2
abstracao

oracle => libv1,                           libv2
postgres = libv1, libv2
mysql => libv1,                   libv2

Bridge


manutencao de estado  / historico

// Behavioral Patterns / Memento

control + Z

const history = [
    {action: 'append', value: 'abc' },
    {action: 'append', value: 'abc' },
]

const last = history.pop()
compensate(last)

SPA

mobx
redux

install shield

{
    next, next, next, install(args)
}

// Behavioral Patterns / State

// state vs memento

// state & memento using command

==== design patterns do gof

Feature Flag

gateway / load balancer

get api/v1/users/
get api/v2/users/
get api/v3/accounts/


// v1 <-- estavel
v2 <-- canary ([5, 10, 25, 50], 100)
v3 <-- canary ([5, 10, 25, 50], 100)
v4 <-- canary ([5, 10, 25, 50], 100)
v5 <-- canary ([5, 10, 25, 50, 100]) <--- versao estavel

rollback

> automatic promotion
automatic rollback