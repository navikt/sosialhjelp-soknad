package no.nav.sbl.soknadsosialhjelp;

import no.nav.modig.testcertificates.TestCertificates;
import no.nav.sbl.dialogarena.common.jetty.Jetty;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;

import static no.nav.modig.lang.collections.FactoryUtils.gotKeypress;
import static no.nav.modig.lang.collections.RunnableUtils.first;
import static no.nav.modig.lang.collections.RunnableUtils.waitFor;
import static no.nav.sbl.dialogarena.common.jetty.Jetty.usingWar;

public class DevStartJetty {
    public static final int PORT = 8080;
    private static final Logger logger = LoggerFactory.getLogger(DevStartJetty.class);

    public static void main(String[] args) throws Exception {
        TestCertificates.setupKeyAndTrustStore();
        configureLocalConfig();
        Jetty jetty = usingWar(new File("web/src/main/resources/webapp"))
                .at("/soknadsosialhjelp")
                .port(PORT)
                .buildJetty();
        logger.info("http://127.0.0.1:" + PORT + "/soknadsosialhjelp/app/start");
        jetty.startAnd(first(waitFor(gotKeypress())).then(jetty.stop));
    }

    private static void configureLocalConfig() {
        System.setProperty("dialogarena.cms.url", "https://appres-t10.nav.no");
        System.setProperty("soknadsapi.url", "http://localhost:8181/sendsoknad");
        System.setProperty("feature.frontend.sosialhjelp.live", "true");
        System.setProperty("suspender.username", "user");
        System.setProperty("suspender.password", "pass");
    }

}
