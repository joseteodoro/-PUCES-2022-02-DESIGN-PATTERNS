
design patterns:
========================

- criacionais: setup de objetos (new, criação de objetos), esconder complexidade e/ou reuso;
- estruturais: como as partes do seu software se encaixam;
- comportamentais: algoritmo pronto!

# Singleton

Reuso de objetos e reducao de carga de objetos.



```js

constructor(dbConnection) {
    dbConnection.query()
}


// precisa dos dados da conexao
new dbConnection(user, password, url)

//
DbConnection.getInstance().createConnection();

// carrega uma vez so o arquivo de configuracao
Configuration.getInstance()

new Configuration(configurationFilePath)


```


## objetos na memoria

- parte da memoria que define as classes (sobe no startup da aplicacao);
- parte da memoria que tem suas instancias;


Singleton facilita o acesso a instancias;
- Coloca uma instancia dentro do corpo da classe;

```js
Configuration.getInstance()
```

carga por demanda, nao seguro para concorrencia
```java
public class DbConnetion {
  private static DbConnetion instance = null;
  
  private DbConnetion() { }
  
  // tem problemas de concorrencia quando duas threads chegam juntas
  // na criacao da instance
  public static DbConnetion getInstance() {
    if (instance == null) {
      instance = new DbConnetion();
    }
    return instance;
  }
}

DbConnetion connection = DbConnetion.getInstance();
```

carga por demanda, seguro para concorrencia
```java
public class DbConnetion {
  private static DbConnetion instance = null;
  
  private DbConnetion() { }
  
  // tem problemas de concorrencia quando duas threads chegam juntas
  // na criacao da instance
  synchronized public static DbConnetion getInstance() {
    if (instance == null) {
      instance = new DbConnetion();
    }
    return instance;
  }
}

DbConnetion connection = DbConnetion.getInstance();
```



// modo eager seguro para concorrencia
```java
public class DbConnetion {
  public static DbConnetion instance = new DbConnetion();
  
  private DbConnetion() { }

  public static DbConnetion getInstance() {
    return instance;
  }
}
```

// é facil invocar o singleton, pode mascarar pratica ruim
DbConnection.getInstance()


```js
class HugeConfigFile {
  static HugeConfigFile instance = null;
  
  constructor () { }
  
  // tem problemas de concorrencia quando duas threads chegam juntas
  // na criacao da instance
  static HugeConfigFile getInstance() {
    if (instance == null) {
      instance = new HugeConfigFile();
      setTimeout(5_MINUTES, () => {
        instance = null;
      })
    }
    return instance;
  }
}

DbConnetion connection = DbConnetion.getInstance();
```

# factory

Esconder complexidade de criacao / setup de objetos

```js
// reportType = pdf exporter, xml exporter, 
// json exporter, docx exporter
public _export(items, reportType) => {
    let exporter = null;
    if (reportType === 'pdf') {
        exporter = new PdfExporter()
    }
    if (reportType === 'JSON') {
        exporter = new JSONExporter()
    }
    if (reportType === 'DOCX') {
        exporter = new DOCXExporter()
    }
    if (reportType === 'XML') {
        exporter = new XMLExporter()
    }
    if (reportType === 'txt') {
        exporter = new txtExporter()
    }
    return exporter.export(items);
}
```


```js
// reportType = pdf exporter, xml exporter, 
// json exporter, docx exporter

class Factory {

  private static Factory instance = null;
  
  private Factory() { }
  
    public static Factory getInstance() {
        if (instance == null) {
        instance = new Factory();
        }
        return instance;
    }

    create(reportType): Exporter => {
        if (reportType === 'pdf') {
            exporter = new PdfExporter()
        }
        if (reportType === 'JSON') {
            exporter = new JSONExporter()
        }
        if (reportType === 'DOCX') {
            exporter = new DOCXExporter()
        }
        if (reportType === 'XML') {
            exporter = new XMLExporter()
        }
        if (reportType === 'txt') {
            exporter = new txtExporter()
        }
        if (reportType === 'httpPost') {
            exporter = new httpPostExporter()
        }
        return exporter;
    }
}

class ItemReport {
    public _export(items, reportType) => {
        let exporter: Exporter = Factory.getInstance().createExporter(reportType);
        return exporter.export(items);
    }
}

```


# Template method

Baseado em herança

```js

class abstract BaseRepository<T> {
    // alto reuso dessa funcao
    public save(T) {
        this.dbConnection.persist(format(T))
    };

    // funcao especifica
    abstract format(T);
}

class UserRepository extends BaseRepository<User> {
    // um gerador do sql por exemplo
    format(User){
        
    }
}

class OrderRepository extends BaseRepository<Order> {
    format(Order){
        
    }
}

```

# Strategy

Baseado em composição

```js
class BaseRepository<T> {
    // formatter como dependencia ao inves de metodo abstrato
    constructor (formatter) {}
    // alto reuso dessa funcao
    public save(T) {
        this.dbConnection.persist(this.formatter.format(T))
    };
}

class UserFormatter {
    format(User){}
}

class OrderFormatter {
    format(Order){}
}
```



Usando template e strategy para refactories

exemplo ruim

```java
public Float custas(Imovel imovel, List<Person> interessados) {
    //.. dezenas de linhas aqui

    // levantamento de impostos
    if (isCartorioCuritiba) {
        //dezenas de linhas aqui
    } else if (isCartorioMaringa) {
        //dezenas de linhas aqui
    } else {
        //dezenas de linhas aqui
    }

    //..dezenas de linhas aqui

    // reserva de recursos
    if (isCartorioCuritiba) {
        //dezenas de linhas aqui
    } else if (isCartorioMaringa) {
        //dezenas de linhas aqui
    } else {
        //dezenas de linhas aqui
    }

    //.. dezenas de linhas aqui
}
```

exemplo um pouco melhor

```java

public interface Impostos {
    float calc(Imovel imovel);
}

public interface Reservation {
    float calc(Imovel imovel);
}

public Float custas(Imovel imovel, List<Person> interessados) {
    //.. dezenas de linhas aqui

    //factory talvez crie baseado na cidade
    impostos.calc(imovel)

    //..dezenas de linhas aqui

    // reserva de recursos
    //factory talvez crie baseado na cidade
    reservation.calc(imovel)

    //.. dezenas de linhas aqui
}
```

*Template method* e *Strategy* para promover reuso de partes do seu codigo.
Precisam de abstracao para gerar polimofismo.

classe {
    metodo {
        linha 1: reuso
        linha 2: reuso
        linha 3: reuso
        
        linha 4: especifico / delega
        // geralmente um bloco com varios IFs e ELSEs
        // cada condicao do IF / ELSE vira uma classe ou um strategy
        // invoca metodo abstrato

        linha 5: reuso
        linha 6: reuso
        linha 7: reuso

        linha 8: especifica / delega
        // geralmente um bloco com varios IFs e ELSEs
        // cada condicao do IF / ELSE vira uma classe ou um strategy
        // invoca metodo abstrato

        linha 9: reuso
        linha 10: reuso
        linha 11: reuso
    }
}


# Decorator

classe {
    metodo {
        linha 1: reuso
        linha 2: reuso
        linha 3: reuso
        
        linha 4: especifico / delega
        // geralmente um bloco com varios IFs e ELSEs
        // cada condicao do IF / ELSE vira uma classe ou um strategy
        // invoca metodo abstrato
    }
}

classe {
    metodo {

        linha 1: especifico / delega
        // geralmente um bloco com varios IFs e ELSEs
        // cada condicao do IF / ELSE vira uma classe ou um strategy
        // invoca metodo abstrato

        linha 2: reuso
        linha 3: reuso
        linha 4: reuso
    }
}

```java

class Pedido {

    loat valorTotalDoPedido(Customer customer, List<Item> items, Cupom desconto) {
        Float total = sum(items);
        if (!customer.isParceiro()) {
            total += frete(items);
        }
        if (desconto != null) {
            total = desconto.apply(total);
        }
        // feature adicionada depois
        // viola nosso OPEN CLOSED
        if (clientePossuiImpostoAdicional(customer) != null) {
            total = impostoAdicional.apply(total);
        }
        return total;
    }

}
```

```java

interface Pedido {
    loat valorTotalDoPedido(Customer customer, List<Item> items, Cupom desconto);
}

class PedidoSimples implements Pedido {

    float valorTotalDoPedido(Customer customer, List<Item> items, Cupom desconto) {
        return sum(items);
    }

}

class PedidoComFrete implements Pedido {

    Pedido delegate;

    loat valorTotalDoPedido(Customer customer, List<Item> items, Cupom desconto) {
        return delegate.valorTotalDoPedido(customer, items, desconto) + frete(items);
    }

}

class PedidoComDesconto implements Pedido {

    Pedido delegate;

    loat valorTotalDoPedido(Customer customer, List<Item> items, Cupom desconto) {
        return desconto.apply(delegate.valorTotalDoPedido(customer, items, desconto))
    }

}

class PedidoComImpostoAdicional implements Pedido {

    Pedido delegate;

    loat valorTotalDoPedido(Customer customer, List<Item> items, Cupom desconto) {
        return impostoAdicional.apply(delegate.valorTotalDoPedido(customer, items, desconto))
    }

}

// usage
Pedido meuPedido = new PedidoComFrete(new PedidoSimples(/** */)); // pedido sem parceria sem desconto
Pedido meuPedido = new PedidoSimples(/** */); // pedido com parceria sem desconto
Pedido meuPedido = new PedidoComDesconto(new PedidoComFrete(new PedidoSimples(/** */)));
Pedido meuPedido = new PedidoComFrete(new PedidoComDesconto(new PedidoSimples(/** */)));

// factory
// factory para criacao das camadas de chamada do decorator
Pedido create(Customer customer, Cupom desconto) {
    Pedido pedido = new PedidoSimples(/** */);
    if (!customer.isParceiro()) {
        pedido = new PedidoComFrete(pedido);
    }
    if (desconto != null) {
        pedido = new PedidoComDesconto(pedido);
    }
    if (clientePossuiImpostoAdicional(customer) != null) {
        pedido = new PedidoComImpostoAdicional(pedido);
    }
    return pedido;
}

```

pedido de cliente parceiro com desconto

pedido de cliente parceiro com desconto

pedido de cliente não parceiro sem desconto

pedido de cliente não parceiro sem desconto

## Decorator vs template method vs strategy

- decorator pra reuso de algoritmo que muda nas pontas;
- template e strategy reuso de algoritmo com partes intercaladas;

# Adapter (wrapper)

- decorator é um padrão de longa duração
- adapter é short lived
- durante refactories ou mudanças de versões de codigo pra gerar retrocompatibilidade

```java
class Login {
    // v1
    boolean login(username, password) {
        // so tenho um grupo de usuarios (admin)
        // varias linhas de codigo da v1
    }
}

// v2
// que possui multiplos grupos de usuarios
class LoginV2 {
    // v2
    boolean login(username, password, healm) {
        // so tenho um grupo de usuarios (admin, guests, owners)
        // varias linhas de codigo da v1
    }
}

// a v2 se passa pela v1
class Loginv2Adapter extends Login {

    LoginV2 delegateLoginV2 = new LoginV2();

    // temporario
    boolean login(username, password) {
        return delegateLoginV2.login(username, password, 'admin')
    }

}

// usage
// ja comecei a usar a v2 com codigo que so funcionaria com a v1
Login loginv1 = new Loginv2Adapter();

// refactoring todo o sistema
// a v1 se passa pela v2
class Loginv1Adapter extends LoginV2 {

    Login delegateLoginV1 = new Login();

    // temporario
    boolean login(username, password, healm) {
        return delegateLoginV1.login(username, password)
    }

}

// feature flags
// liga v2 para 10% dos usuarios

interface Login {
    boolean login(username, password)
}

// v1
class LoginRedis implements Login {
    boolean login(username, password) {
        // bate no redis pra logar
    }
}

// v2
class LoginGoogle implements Login {
    
    boolean login(username, password) {
        // login com usuario no google
    }
}

// 10% de usuarios vao pra login v2
class LoginFF implements Login {

    private float DEZ_PORCENTO = 0.10

    private float ZERO = 0

    // temporario
    boolean login(username, password) {
        if (random() < DEZ_PORCENTO) { // 10% primeira semana, 20% 2a semana, ... 100% na v2
            return new LoginGoogle(user, password);
        }
        return new LoginRedis(use, password);
    }

}


// usage
// v1
Login login = new LoginRedis().login(username, password)
// ff
Login login = new LoginFF().login(username, password)
//depois de 100%
//
Login login = new LoginGoogle().login(username, password)

```

proxy vs decorator vs adapter

- todos os tres tem um delegate la dentro

- adapter - retrocompatibilidade
- decorator - compor ( de composição) comportamento e substituir IFs / Elses gerando reuso
- proxy - lazy loading

# Proxy

- ORM (ferramentas que mapeiam objetos para banco relacional)

```java
class User {
    Long id;
    String name;
    String nasc;
    list<Login> logins; // lazy - no loading vc recebe uma lista de mentira
}

class LoginsProxy extends List<Login> {

    List<Login> delegate = null;

    @override
    Login get(int pos) {
        if (delegate == null) {
            delegate = carregaAsEntradasDeVerdade();
        }
        return delegate.get(pos);
    }

}
```

# Observer  - event listeners / pubsub  - mensageria / event driven

- alguem esta notificando as mudancas e alguem esta ouvindo as mudancas;
- desacoplar partes do codigo // fazer isso demais gera problema

```java
// enviando mensagem

// possivelmente sera chamado num repositorio
user.save()
EventBus.getInstance().sendMessage('new-user-created', user);
// update da tela?
// auditoria?


EventBus.getInstance().sendMessage('config-reloaded', config);

// registra  a home como ouvinte de eventos de criacao de usuarios
HomePage home = new HomePage()
EventBus.getInstance().register('new-user-created', home)

// registro audit trail escuta eventos de criacao de usuarios
AuditTrail audit = new AuditTrail()
EventBus.getInstance().register('new-user-created', audit)


interface Listener<User> {
    notify(User us);
}

// eh uma tela
class HomePage implements Listener<User> {
    notify(User us) {
        popup(us)
    }
    //
}


// eh um servico de auditoria
class AuditTrail implements Listener<User> {
    notify(User us) {
        log(us)
    }
    //
}

// mesma coisa com o mouse listener que ja conversamos
MouseListener {

}

// codigo do barramento para created user only
class EventBus<User> {
    EventBus instance = null;

    public static EventBus getInstance() {
        if (instance == null) {
            instance = new EventBus()
        }
        return instance;
    }

    Map<String, List<Listener<User>>> listeners = new List<>();

    void register(String action, Listener<User> listener) {
        this.listeners.get(action).add(listener);
    }

    void sendMessage(String action, User event) {
        for (Listener l : this.listeners.get(action)) {
            l.notify(event);
        }
    }
}

```

# Composite

- Esse pattern força a estrutura de código

- raiz (objeto)
  --- filho 1 (objeto)
     ---- neto 1 (objeto)
     ---- neto 2 (objeto)

  --- filho 2 (objeto)

```java
class Observer {
    List<Listener> listeners;

    // itera os itens pra enviar notificao (return void)
}

// likely

class Noh {
    List<Noh> filhos;

    // itera os itens, pra acessar valor ou comportamento
}

// mas o composite é uma arvore

Noh gerente = new Noh('CTO')
gerente.add(new Noh('superintendente'))
...
...
...
techlead.add(new Noh('dev'))

```

- Linguagens compiladas usam uma estrutura em composite para carregar XML;
- utiliza algoritmos conhecidos para percorrer grafos;

### Composite vs Observer
 - composite te força organizar seus objetos de maneira hierarquica;
 - observer noticar eventos;
 - ambos percorrem as listas de items;

### Composite vs decorator
 - decorator é sempre sobre comportamento, com reuso como objetivo final
 - composite tem comportamento e dados; Forçar uma hierarquia; Com objetivo de usar algoritmos conhecidos para percorrer os itens;


# Iterator / Generator


## Iterator

- trata-se apenas de iterar sobre os itens da lista;

```java
   // old fashion C like for
   List<FileContent> files = listFiles(); 
   for (int i = 0; i < list.size(); i++) {
      FileContent content = IOUtils.readFile(files.get(i));
      pushToFTPServer(content);
   }

   // forEach
   // iterators = list
   iterator.hasNext()
   iterator.next()
   while (iterator.hasNext()) {

   }
```

## Generator
 - nao falamos apenas de iterar os itens da lista;
 - a lista consuma pouca memoria, mas o conteudo possa ser carregado por demanda;
 - backpressure - pressão reversa
 - seguro para se usar com concorrencia

```
Generator gen = new Generator(listFiles)
String ContudoDoArquivo = gen.next().value
```

```
Generator gen = uuid({seed: 1})
gen.next() -> 1;

Generator gen = uuid({seed: 1})
gen.next() -> 1;
```

// criamos um jogo online, compartilhando o menor trecho de memoria 
possivel entre os players. Mas todos recebem os mesmo montros.
// distribuir apenas a seed para os generators


```python
activeUsers = ([x.name for x in users])
```

```js
users.map(us => us.name)


// cria generator
function* gen(target = []) {
    let index = 0;
    
    while (index < target.length) {
        yield target[index++]; // cada chamada do generator para aqui
    }
}

const generator = gen();
gen().next().value // retorna proximo valor

```


# Command
 - {action: '', parameters: []}

```sh
> GET /banana HTTP/1.1
> Host: google.com.br

{
    action: 'GET',
    params: ['/banana', 'HTTP/1.1']
}
```

```js
[
    {user: 'jose', action: 'update', params: 'userId: 1; update de active para inativo;'}
]
```

// event-driven-design | event sourcing design

[
    {error},
    {id: 2, quantity: 1, price: 1.2},
    {id: 25, quantity: 10, price: 1.2},
    {id: 1023, quantity: 10, price: 0.3}
]

// trazer exemplo rodando o saga

event-driven design
vs
event sourcing desing

// reuso de recurso Object pool, Flyweight, Prototype
# Object pool

- objeto custoso em tempo de carga ou escasso;
- na subida da aplicacao, carregamos varios e deixamos ociosos aguardadndo uso;
- configs
    ```json
    {
        max: 10,
        min: 2,
        ttl: 300 sec,
    }
    ```


# Flyweight
- objeto custoso em tempo de carga;

```js
const repo = {
    // somente leitura
    logoEmpresa: PNG('200MB');
}
// problema do singleton, seguro para concorrencia
// tal como singleton dá pra fazer carga por demanda,
// tal como singleton dá pra fazer syncronized
// 
const userJose = {
    logoEmpresa: repo.logoEmpresa;
}
const userCarlos = {
    logoEmpresa: repo.logoEmpresa;
}
const NF = {
    logoEmpresa: repo.logoEmpresa;
}
```

# Prototype
- objeto custoso em tempo de carga;
- sempre do mesmo tipo que a gente clona;
  
```js
const userEmpresaX = {
    // somente leitura
    logoEmpresa: PNG('200MB');
}
// problema do singleton, seguro para concorrencia
// tal como singleton dá pra fazer carga por demanda,
// tal como singleton dá pra fazer syncronized
// 

// readonly reusa
const userJoseEmpresaX = userEmpresaX.clone()
userJoseEmpresaX.name = 'josé'

// readonly reusa
const userCarlosEmpresaX = userEmpresaX.clone()
userCarlosEmpresaX.name = 'Carlos'

// read/write copy on write
const userCarlaEmpresaX = userEmpresaX.clone()
userCarlaEmpresaX.name = 'Carla'
userCarlaEmpresaX.logoEmpresa = grayScale(userCarlaEmpresaX.logoEmpresa)

// prototype -> PNG poderia ser read/write
```

```java
class X {

    Object clone() {

    }
}
```

```js

// considerando que esses caras nao sao seguros pra concorrencia
const user = new admin();
const user = new guest();
const user = new customer();

//

// mas vc souber que a funcao que vc vai usar o user é somente leitura
// codigo concorrente usa as copias do user
// demora 20 segundos pra rodar
addresses.map( address => address(user.clone()) )

// faz outras mudancas no user
user.name = 'batata'
user.address.push('c')

// criamos um closure usando o clone pra garantir concorrencia

// deep copy //funda
{
    name: 'jose'(ref1),
    addresses: ['a'(ref2), 'b'(ref3)],
}
// clone
{
    name: 'jose'(ref10),
    addresses: ['a'(ref11), 'b'(ref15)],
}
clone.address.push('c')
// afeta apenas o clone

// shalow copy // rasa
{
    name: 'jose'(ref1),
    addresses: ['a'(ref2), 'b'(ref3)](ref5),
}
// clone
{
    name: 'jose'(ref10),
    addresses: ['a'(ref2), 'b'(ref3)](ref5),
}
clone.push('c')
// afeta o original e o clone

```
## Prototype vs Flyweight vs Object Pool

- prototype: sempre funciona com o mesmo tipo;
- prototype: pode ser read/write (copy on write);
- Flyweight: funciona quaiquer tipos que precisem reusar o recurso;
- Flyweight: readonly;
- prototype e Flyweight: deixam vc usar o recurso ao mesmo tempo;
- Object Pool: controla o acesso simultaneo. Pq a ideia é gerenciar recursos escassos ou finitos; Reusar o mesmo recurso que esta em memoria, mas cada um usa na sua vez;

// abstracao e modularizacao
# Bridge

formatter {
    format(object t) {
        json.toJson(t)
    }
}

connectionFactory {
    connect() {

    }
}

user {
    
    save() {
        con = this.factory.connect()
        // de como salvar
    }   
}


jdbc (conexão de db do java)
    - um monte de interfaces

```java
public Connection getConnection() throws SQLException {

    Connection conn = null;
    Properties connectionProps = new Properties();
    connectionProps.put("user", this.userName);
    connectionProps.put("password", this.password);

    if (this.dbms.equals("mysql")) {
        conn = DriverManager.getConnection(
                   "jdbc:" + this.dbms + "://" +
                   this.serverName +
                   ":" + this.portNumber + "/",
                   connectionProps);
    } else if (this.dbms.equals("derby")) {
        conn = DriverManager.getConnection(
                   "jdbc:" + this.dbms + ":" +
                   this.dbName +
                   ";create=true",
                   connectionProps);
    }
    System.out.println("Connected to database");
    return conn;
}

```
    - codificar pra abstração (SPI)
    - conjunto de interfaces que definem nosso contrato exposto
    
    - no caso do jdbc:
      - oracle codifica o jdbc da oracle
      - postgres o jdbc deles
      - mysql

Connection c = this.connect() // <--- PGConnection()


express:
```js
    function (req, res, next) {};
```

jdbc --- oracle
     --- pg
     --- mysql



// exposicao do contrato
# Facade
    - tenta facilitar o uso / esconder coisas / escondendo complexidade
    - user/
      - facade.js
      - repository/
        - userRepository.js
        - ...
      - services/
        - userService.js
        - ..
      - formatter/
        - jsonExporter.js
        - ..


// usage
facade.createNewUser(username, password)
facade.createNewUser(username, password, name)
facade.createNewUser(username, password, cep)
facade.toJson(user)
facade.delete()
facade.updatePassword()

// facade tende a violar o SRP
// god classes (classes que fazem tudo)

- sem usar o facade, a gente precisa controlar quais classes serao expostas pelo modulo
  - module.exports = {}
  - module (2018+)
  - Capital Letters



// estados interno de aplicao
# Memento

    - criar snapshots do estado e ser capaz de voltar no tempo
      - control + Z
      - ponto de restauração
      - backup de db é diferente
      - memento é sobre estado interno da aplicacao
      - undo() desfazer()
      - redo() refazer()

# State

    - install shield (next next next finish)
    - um unico bloco de codigo
    - o estado / o que o usuario selecionou / o que o usuario define qual ser ao comportamento;
    - como é um unico codigo, quantos IFs vc precisa?
  