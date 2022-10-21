
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

    //factory talvez que crie baseado na cidade
    impostos.calc(imovel)

    //..dezenas de linhas aqui

    // reserva de recursos
    //factory talvez que crie baseado na cidade
    reservation.calc(imovel)

    //.. dezenas de linhas aqui
}
```