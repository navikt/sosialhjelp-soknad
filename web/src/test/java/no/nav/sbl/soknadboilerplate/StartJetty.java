package no.nav.sbl.soknadboilerplate;

import no.nav.sbl.dialogarena.common.jetty.Jetty;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import static no.nav.modig.lang.collections.FactoryUtils.gotKeypress;
import static no.nav.modig.lang.collections.RunnableUtils.first;
import static no.nav.modig.lang.collections.RunnableUtils.waitFor;
import static no.nav.sbl.dialogarena.common.jetty.Jetty.usingWar;
import static no.nav.sbl.dialogarena.test.path.FilesAndDirs.WEBAPP_SOURCE;

public class StartJetty {
    public static final int PORT = 8185;
    private static final Logger logger = LoggerFactory.getLogger(StartJetty.class);

    public static void main(String[] args) throws Exception {
        configureLocalConfig();
        Jetty jetty = usingWar(WEBAPP_SOURCE)
                .at("/soknadboilerplate")
                .port(PORT)
                .buildJetty();
        logger.info("http://127.0.0.1:" + PORT + "/soknadboilerplate/app/start");
        jetty.startAnd(first(waitFor(gotKeypress())).then(jetty.stop));
    }

    private static void configureLocalConfig() {
        System.setProperty("dialogarena.cms.url", "https://appres-t10.nav.no");
        System.setProperty("soknadsapi.url", "http://localhost:8181/sendsoknad");
    }

}
