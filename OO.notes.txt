bases da orientação a objetos

=============================

dados + comportamento

const int typeAdmin = 0;
const int typeGuest = 1;
const int typeCustomer = 2;

[
    us0,
    us1,
    us2,
    us3,
]

// dados
user.cpp
struct user {
    int id;
    char[] name;
    int type;
    int role;
    int permission;
    *add;
}

//comportamento
function add(*user us) {};

function delete(*user us) {};

function adminLogin(*user us) {

}
function guestLogin(*user us) {

}
function customerLogin(*user us) {

}

function genericLogin(*user us) {
    if (typeAdmin) {

    }
    else if (typeCustomer) {

    }
    else if (typeGuest) {

    }
}

function login(request req) {
    *user us = userFrom(req)
    us.login()

    int type = getUserType(req)
    if (guest) {
        return guestLogin()
    }
    if (admin) {
        return adminLogin()
    }
    if (customer) {
        return customerLogin()
    }

    ..
    ..
    ..
}


function main(*args) {}

========================

//"comportamento + dados == O.O.P."

type admin {
    int id;
    string name;
    add();
    delete();
}

// Abstraction, Polymorphism, Encapsulation and Inheritance
// reuso, expressividade, manutenção, facil adicionar coisas

admin ~ guest ~ customer ~ batatinha ~ <user>
// erlang "se vc nao sabe o que chega pra vc, vc nao
// deveria interceptar"


// abstração pra reuso // type
user us = userFrom(req) //batatinha
delete(us)
create(us)

admin.login() ~ user.login() ~ guest.login() ~ customer.login()

user = admin
user = guest
user = customer
user.login() 

// herança
admin <-- user

// poli - morfismo

liskov => L (SOLID)

fundamentos que se reforçam em torno dos tipos: herança, polimorfismo, abstração e encapsulamento;

programaçao orientada a tipos!

para que tudo isso? reuso, facilidade de mudança, manutenção!

reuso,
facilidade de mudança,
isole o que varia


isole / esconde o que muda muito;
esconda tudo q nao precisa ser exposto;

// interface exposta
// interface, REST, exposed function
// contrato
interface UserService {
    Boolean login(Request req);
    void save(User user);
    void delete(User user);
}

// mudanças de contrato / assinatura propam
// software a fora
Boolean login(Request req, Context ctx) {
    XML body = extract(req)
    User loadUserFrom(body)
    return user.login()
        ? user
        : null;
}

nossas boas praticas de programação
===================================

reuso, facilitar manutenção, evitar erros ou propagação de bugs, etc

* DRY;

* KISS nao é fazer a primeira coisa que funciona;
por exemplo: tenho um usuario (no futuro eu POSSO ter, eu nao sei se terei outras implementações). Então porque preciso de uma interface;

* Isole / esconda o que varia;

* Codifique para contratos;
codifique pra interface ou classes abstratas;

// contrato / interface exposta
interface UserService {
    Boolean login(Request req);
    void save(User user);
    void delete(User user);
}

* Composition over inheritance

na herança voce herda tudo da classe mãe.

// herança nos proporciona
class MouseEventListener {

    protected _doClick()

    public onClick() {
        //..
        _doClick()
    }

    public mouseMove(event evt) {
        // ...
    }

}

class MouseListener extends MouseEventListener {

    protected _doClick()

    public onClick() {
        _doClick()
    }

    @override
    public mouseMove(event evt) {
        // do nothing
    }

}

// composicao nos proporciona

class click {
    void _doClick() {
        //
    }
}

class MouseListener implements EventListener {

    private click;

    public onClick() {
        this._doClick();
    }
}

class MouseEventListener implements EventListener {

    private click;

    public onClick() {
        this._doClick();
    }
}

* código com mesma granularidade;
  detalhes na historia ficam dentro dos capitulos;

por exemplo:

class OrderReport {

    // pdf com os pedidos do cliente
    PDF export(CustomerInfo info) {
        PDF pdf = new PDF();
        // cabecalho
        Header header = new Header();
        header.append(info.clientName());
        header.append(info.clientAddress());
        pdf.add(header);

        List<Orders> orders = dbInstance.listOrders(info.clientId);
        Content content = new Content();
        for(Order o: orders) {
            content.append(formatOrder(o));
        }
        pdf.add(content);

        // rodape
        Footer footer = new Footer();
        footer.append(new Date());
        pdf.add(footer);
        return pdf;
    }

}

class OrderReport {

    Header createHeaderFrom(CustomerInfo info) {
        Header header = new Header();
        header.append(info.clientName());
        header.append(info.clientAddress());
        return header;
    }

    Content createContentFrom(CustomerInfo info) {
        List<Orders> orders = dbInstance.listOrders(info.clientId);
        Content content = new Content();
        for(Order o: orders) {
            content.append(formatOrder(o));
        }
        return content;
    }

    Footer createFooterFrom(CustomerInfo info) {
        Footer footer = new Footer();
        footer.append(new Date());
        return footer;
    }

    // pdf com os pedidos do cliente
    public PDF export(CustomerInfo info) {
        Header header = createHeaderFrom(info);
        Footer footer = createFooterFrom(info);
        Content content = createContentFrom(info)
        
        PDF pdf = new PDF();
        pdf.add(header);
        pdf.add(content);
        pdf.add(footer);
        return pdf;
    }

}


class Factory {

    User from(String type) {
        if (userType.equals("admin")) {
            return new Admin(req.body);
        }
        if (userType.equals("guest")) {
            return new Guest(req.body);
        }
        if (userType.equals("customer")) {
            return new Customer(req.body);
        }
    }

}

class UserService {

    public User login(Request req) {
        String userType = req.body.userType;
        User loadedUser = new Factory().from(userType);
        return loadedUser.login();
    }

}

fazendo isso a nivel de pacotes e modulos gera a arquitetura de camadas. Onion model.

* SOLID

receitas / diretivas pra quem ta começando;

