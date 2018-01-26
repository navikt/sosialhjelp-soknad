package no.nav.sbl.soknadsosialhjelp.selftest;

import no.nav.sbl.dialogarena.common.web.selftest.SelfTestBaseServlet;
import no.nav.sbl.dialogarena.types.Pingable;
import org.slf4j.Logger;

import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Collection;

import static java.lang.System.getProperty;
import static java.net.HttpURLConnection.HTTP_OK;
import static java.util.Arrays.asList;
import static org.slf4j.LoggerFactory.getLogger;

public class SelftestServlet extends SelfTestBaseServlet {

    private static final Logger logger = getLogger(SelftestServlet.class);

    @Override
    protected String getApplicationName() {
        return "Soknadsosialhjelp";
    }

    @Override
    protected Collection<? extends Pingable> getPingables() {
        return asList(
                pingUrl("REST_API", getProperty("soknadsapi.url") + "/internal/isAlive"),
                pingUrl("ENONIC_APPRES", getProperty("dialogarena.cms.url") + "/common-html/v4/navno")
        );
    }

    private Pingable pingUrl(final String name, final String url) {
        return new Pingable() {
            @Override
            public Ping ping() {
                HttpURLConnection connection;
                try {
                    connection = (HttpURLConnection) new URL(url).openConnection();
                    connection.setConnectTimeout(10000);
                    connection.setInstanceFollowRedirects(false);
                    if (connection.getResponseCode() == HTTP_OK) {
                        return Ping.lyktes(name);
                    } else {
                        return Ping.feilet(name, new RuntimeException(connection.getResponseCode() + " " + connection.getResponseMessage()));
                    }
                } catch (Exception e) {
                    logger.warn("<<<<<< Could not connect to {} on {}", name, url, e);
                    return Ping.feilet(name, e);
                }
            }
        };
    }
}
