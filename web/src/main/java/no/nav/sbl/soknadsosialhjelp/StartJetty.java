package no.nav.sbl.soknadsosialhjelp;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import no.nav.sbl.soknadsosialhjelp.duplicated.Jetty;

public class StartJetty {
    private static final int PORT = 8080;
    private static final Logger logger = LoggerFactory.getLogger(StartJetty.class);

    public static void main(String[] args) throws Exception {
        if (isRunningOnNais()) {
            mapNaisProperties();
        } else  {
            configureLocalConfig();
        }
        Jetty jetty = new Jetty.JettyBuilder()
                .at("/sosialhjelp/soknad")
                .port(PORT)
                .buildJetty();
        logger.info("http://127.0.0.1:" + PORT + "/sosialhjelp/soknad/informasjon");

        Runtime.getRuntime().addShutdownHook(new ShutdownHook(jetty));

        jetty.start();
    }

    private static void configureLocalConfig() {
        System.setProperty("dialogarena.cms.url", "https://appres-t10.nav.no");
        System.setProperty("soknadsapi.url", "http://localhost:8181/sendsoknad");
        updateFeatureToggles();
        System.setProperty("suspender.username", "user");
        System.setProperty("suspender.password", "pass");
    }

    private static void mapNaisProperties() {
        System.setProperty("dialogarena.cms.url", System.getenv("APPRES_CMS_URL"));
        System.setProperty("soknadsapi.url", System.getenv("SOKNADSAPI_URL"));
        updateFeatureToggles();
        System.setProperty("suspender.username", "user");
        System.setProperty("suspender.password", "pass");
    }

    private static void updateFeatureToggles() {
        // TODO: Flytt til Fasit (må være egne properties og ikke applicationProperties):
        System.setProperty("feature.frontend.sosialhjelp.kontonummer", "true");
        System.setProperty("feature.frontend.sosialhjelp.live", "true");
        System.setProperty("feature.frontend.visvelgbosted", "true");
        System.setProperty("feature.frontend.sosialhjelp.personalia", "true");
        System.setProperty("feature.frontend.arbeidsforhold", "true");
        System.setProperty("feature.frontend.ettersendvedlegg", "true");
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
