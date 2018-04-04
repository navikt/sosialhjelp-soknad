package no.nav.sbl.soknadsosialhjelp;

import no.nav.sbl.dialogarena.common.jetty.Jetty;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.io.IOException;
import java.net.URISyntaxException;

import static no.nav.modig.lang.collections.FactoryUtils.gotKeypress;
import static no.nav.modig.lang.collections.RunnableUtils.first;
import static no.nav.modig.lang.collections.RunnableUtils.waitFor;
import static no.nav.sbl.dialogarena.common.jetty.Jetty.usingWar;

public class StartJetty {
    public static final int PORT = 8080;
    private static final Logger logger = LoggerFactory.getLogger(StartJetty.class);

    public static void main(String[] args) throws Exception {
        File WEBAPP_SOURCE = getWebAppSource();
        if (isRunningOnNais()) {
            mapNaisProperties();
        } else  {
            configureLocalConfig();
        }
        Jetty jetty = usingWar(WEBAPP_SOURCE)
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

    private static void mapNaisProperties() {
        System.setProperty("dialogarena.cms.url", System.getenv("APPRES_CMS_URL"));
        System.setProperty("soknadsapi.url", System.getenv("SOKNADSAPI_URL"));
        System.setProperty("feature.frontend.sosialhjelp.live", "true");
        System.setProperty("suspender.username", "user");
        System.setProperty("suspender.password", "pass");
    }

    private static File getWebAppSource() {
        File PROJECT_BASEDIR;
        try {
            File classesDir = new File(StartJetty.class.getResource("/").toURI());
            PROJECT_BASEDIR = (new File(classesDir, "../../")).getCanonicalFile();
        } catch (IOException | URISyntaxException var1) {
            throw new RuntimeException(var1.getMessage(), var1);
        }
        File MAIN_DIR = new File(PROJECT_BASEDIR, "src/main");
        return new File(MAIN_DIR, "webapp");
    }

    private static boolean isRunningOnNais() {
        return determineEnvironment() != null;
    }

    private static String determineEnvironment() {
        final String env = System.getenv("FASIT_ENVIRONMENT_NAME");
        if (env == null || env.trim().equals("")) {
            return null;
        }
        return env;
    }
}
