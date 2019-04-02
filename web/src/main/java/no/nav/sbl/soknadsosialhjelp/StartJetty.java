package no.nav.sbl.soknadsosialhjelp;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import no.nav.sbl.soknadsosialhjelp.duplicated.Jetty;

import java.io.File;

public class StartJetty {
    private static final int  PORT = isRunningOnHeroku() ? Integer.parseInt(System.getenv("PORT")) : 8080;
    private static final File overrideWebXmlFile = isRunningOnHeroku() ? new File("./web/target/classes/webapp/WEB-INF/heroku-web.xml") : null;

    private static final Logger logger = LoggerFactory.getLogger(StartJetty.class);

    public static void main(String[] args) {
        if (isRunningOnNais()) {
            mapNaisProperties();
        } else  {
            configureLocalConfig();
        }
        Jetty jetty = new Jetty.JettyBuilder()
                .at("/sosialhjelp/soknad")
                .overrideWebXml(overrideWebXmlFile)
                .port(PORT)
                .buildJetty();
        logger.info("http://127.0.0.1:" + PORT + "/sosialhjelp/soknad/informasjon");
        if (isRunningOnHeroku()){
            logger.info("Is running on Heroku, with port : " + PORT);
        }


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

    public static boolean isRunningOnHeroku(){
        return System.getenv("HEROKU") != null && Boolean.parseBoolean(System.getenv("HEROKU"));
    }

    private static String determineEnvironment() {
        final String env = System.getenv("FASIT_ENVIRONMENT_NAME");
        if (env == null || env.trim().equals("")) {
            return null;
        }
        return env;
    }
}
