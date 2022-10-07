// Singleton, Factory (factory method)

enum ReportType { PDF, HTML }

class ReportEngine {}

class CompanyInfo {}

class HttpResponse {}

class Order {}

class List<T> {}

class Header {}

class Report {

   private ReportEngine engine;

   public HttpResponse generateFrom(CompanyInfo info, List<Order> orders, ReportType type) {
      try (
         Header header = engine.buildHeader(info);
         Items items = engine.buildItems(orders);
         Sumup sumup = engine.buildSummary(orders);
         Content content = new EmptyContent();
         // mais de um tipo de relatorio
         if (ReportType.PDF.equals(type)) {
            PDFWriter writer = new PDFWriter();
            writer.add(header, items, sumup);
            content.append(writer.export());
         } else {
            HTMLWriter writer = new PDFWriter();
            writer.add(header, items, sumup);
            content.append(writer.export());
         }
         return HttpResponse.withStatus(200).withContent(content);
      ) catch (RuntimeException ex) {
         return HttpResponse.withStatus(500).withContent(ex.getMessage());
      }
   }
}

//... usage

public HttpResponse doRequest(Resquest req) {
   CompanyInfo info = infoDao.load();
   List<Order> orders = orderDao.load();
   ReportType type = typeFromRequest(type);
   return new Report(engine).generateFrom(info, orders, type);
}



// template method (herança)
// (composicao)
abstract class Protocolador {

    public boolean checkPartesEnvolvidas(Pessoa proprietario, Pessoa contraparte) {
        return checkNaReceitaFederal(pedido.proprietarios()) &&
            checkNaReceitaFederal(pedido.contraparte()) &&
            checkNaSTF(pedido.proprietarios()) &&
            checkNaSTF(pedido.contraparte());
    }

    abstract boolean checkDocuments(Pedido pedido);

    Protocolo abstract protocolo(Pedido pedido) {
        // demandas legais
        if (!checkPartesEnvolvidas(pedido.proprietarios(), pedido.contraparte())) {
            return null; // voltar mensagem de erro ao inves de null
        }

        // varias linhas

        checkDocuments(pedido);
        
        // varias linhas
        save()
        notify()
    }

}

class ProcoladorA extends Protocolador {

    boolean checkDocuments(Pedido pedido) {
        // modo A
        checkDOCABC(pedido);


        ///
    }

}

class ProcoladorB  extends Protocolador {

    boolean checkDocuments(Pedido pedido) {
        // modo B
        checkDOCXYZ(pedido);
    }

}

class ProcoladorC  extends Protocolador {

    boolean checkDocuments(Pedido pedido) {
        // modo C
        checkDOCBRZ(pedido);
    }

}

class ProtocoladorFactory {

    Procolador from(String type) {
        if (type == 'A') return new ProcoladorA();
        if (type == 'B') return new ProcoladorB();
        if (type == 'C') return new ProcoladorC();
    }
}

interface DocumentChecker {
    boolean checkDocuments(Pedido pedido);
}

// strategy (composicao)
class Protocolador {

    private DocumentChecker checker;

    public boolean checkPartesEnvolvidas(Pessoa proprietario, Pessoa contraparte) {
        return checkNaReceitaFederal(pedido.proprietarios()) &&
            checkNaReceitaFederal(pedido.contraparte()) &&
            checkNaSTF(pedido.proprietarios()) &&
            checkNaSTF(pedido.contraparte());
    }

    Protocolo abstract protocolo(Pedido pedido) {
        // demandas legais
        if (!checkPartesEnvolvidas(pedido.proprietarios(), pedido.contraparte())) {
            return null; // voltar mensagem de erro ao inves de null
        }

        // varias linhas

        this.checker.checkDocuments(pedido);
        
        // varias linhas
        save()
        notify()
    }

}

class DocumentCheckerA implements DocumentChecker {

    boolean checkDocuments(Pedido pedido) {
        // modo A
        checkDOCABC(pedido);
    }

}

class DocumentCheckerB  implements DocumentChecker {

    boolean checkDocuments(Pedido pedido) {
        // modo B
        checkDOCXYZ(pedido);
    }

}

class DocumentCheckerC  implements DocumentChecker {

    boolean checkDocuments(Pedido pedido) {
        // modo C
        checkDOCBRZ(pedido);
    }

}

class ProtocoladorFactory {

    Procolador from(String type) {
        if (type == 'A') return new Procolador(new new DocumentCheckerA());
        if (type == 'B') return new Procolador(new new DocumentCheckerB());
        if (type == 'C') return new Procolador(new new DocumentCheckerC());
    }

}

new ProtocoladorFactory().from(pedido.cartorio.type).protocolo(pedido)



class ProtocoladorBase {

    public boolean checkPartesEnvolvidas(Pessoa proprietario, Pessoa contraparte) {
        return checkNaReceitaFederal(pedido.proprietarios()) &&
            checkNaReceitaFederal(pedido.contraparte()) &&
            checkNaSTF(pedido.proprietarios()) &&
            checkNaSTF(pedido.contraparte());
    }

    boolean checkDocuments(Pedido pedido);

    // decorator
    Protocolo protocolo(Pedido pedido) {

        // if(A || B) {
        //     //
        //     if (B) {

        //     }
        //     ///
        // }

        // if (B || C) {
        //     if (B) {

        //     }
        //     //
        // }

        // new LocationChecker( new CPFChecker ( new protocoloBase( ))  <-- A
        // new RGChecker(new LocationChecker( new CPFChecker ( new protocoloBase( ))) <-- B

        if (pedido.cartorio.type == 'A') {
            F()
            G()
        }

        if (pedido.cartorio.type == 'B') {
            F()
            Z()
            Y()
        }

        if (pedido.cartorio.type == 'C') {
            Y()
            Z()
        }
        
        // demandas legais
        if (!checkPartesEnvolvidas(pedido.proprietarios(), pedido.contraparte())) {
            return null; // voltar mensagem de erro ao inves de null
        }

        // varias linhas
        
        // varias linhas
        save()
        notify()

        if (pedido.cartorio.type == 'A') {
            O()
            P()
        }

        if (pedido.cartorio.type == 'B') {
            P()
            U()
            R()
        }

        if (pedido.cartorio.type == 'C') {
            U()
            R()
        }
    }

}


interface Protocolador {
    Protocolo protocolo(Pedido pedido);
}

class F implements Protocolador {

    Protocolador delegate;

    Protocolo protocolo(Pedido pedido) {
        f();
        return delegate.protocolo(pedido);
    }

}

class G  implements Protocolador {

    Protocolador delegate;

    Protocolo protocolo(Pedido pedido) {
        g();
        return delegate.protocolo(pedido);
    }

}

factory {

    getBy(String type) {
        if() return new A(new B(new C))
        if() return new A(new B(new C))
        if() return new A(new B(new C))
    }

}


Protocolo protocolo = factory.getBy(type).protocolo(pedido)






Pedido checkout(Client client, List<Product> items) {

    if (!ehParceiro(client)) {
        cobraFrete()
    }

    if (!ehMoraEmDF(client)) {
        cobraImpostoDoDF()
        cobraFrete()
    }

    cobraProdutos(items, client)
}


checkoutItems
checkoutCobraFrete
checkoutCobraImpostoDF
checkoutDaDesconto


factory {
    Checkout byClient (Client client) {
        Checkout compose = new checkoutItems();
        compose = new checkoutItems(compose);
        if (!ehParceiro(client)) {
            compose = new checkoutCobraFrete(compose)
        }
        if (!ehDF(client)) {
            compose = new checkoutCobraImpostoDF(compose)
            compose = new checkoutCobraFrete(compose)
        }

        //
        return compose;
    }
}

// adapter

class G  implements Protocolador {

    Protocolador delegate;

    Protocolo protocolo(Pedido pedido) {
        g();
        return delegate.protocolo(pedido);
    }

}

class DBConnectionV1 {

    Connection connect(String host, String user, String password) {
        //
    }

}

class DBConnectionV2 {

    Connection connect(String stringConnection) {
        //
    }

}

// temporario
class DBConnectionAdapter extends DBConnectionV1 {

    DBConnectionV2 delegate;

    @Override
    Connection connect(String host, String user, String password) {
        return this.delegate.connect(user+":"+password+"@"+host);
    }

}

// new DBConnectionV1(host, user, password)
// new DBConnectionV2(user+":"+password+"@"+host)

connectionFactory {

    DBConnectionV1 get() {
        return new DBConnectionAdapter(new DBConnectionV2());
    }

}

// usage
connectionFactory.get().connect(host, user, password)


// temporario
class DBConnectionAdapter extends DBConnectionV2 {

    DBConnectionV1 delegate;

    @Override
    Connection connect(String stringConnection) {
        String[] parts = parse(stringConnection)
        return this.delegate.connect(parts[0], parts[1], parts[2]);
    }

}








Datasource ds;

Connection cn;

// temporario ... medio prazo
class Adapter implements Connection {
    Transation startTransaction() {
        return ds.startTransaction()
    }
}

thirdPartyLib(new Adapter(ds));

interface Report {
    File report(items);

    // tratamento dos items
    
}

class XMlReport implements Report {
    File report(items) {

    }
}

// movimento rapido, temporario V0
class PDFReport implements Report {
    Report xml = new XMlReport()

    File report(items) {
        return new CompilePDF(this.xml(items))
    }
}