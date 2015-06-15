package no.nav.sbl.soknadbilstonad;

import no.nav.innholdshenter.common.EnonicContentRetriever;
import no.nav.innholdshenter.filter.DecoratorFilter;

import java.util.ArrayList;
import java.util.List;

import static java.util.Arrays.asList;

public class BilstonadDekorator extends DecoratorFilter {

    private static final String FRAMENTS_URL = "common-html/v2/navno";
    private static final String APPLICATION_NAME = "Bilstonad";
    private static final List<String> NO_DECORATOR_PATTERNS = new ArrayList<>(asList(".*/img/.*", ".*/css/.*", ".*/js/.*", ".*/font/.*", ".*selftest.*"));
    private static final List<String> FRAGMENT_NAMES= new ArrayList<>(asList("webstats-ga-notrack", "header", "footer", "styles", "scripts"));

    public BilstonadDekorator() {
        super();
        setFragmentsUrl(FRAMENTS_URL);
        setContentRetriever(setUpContentRetriever());
        setApplicationName(APPLICATION_NAME);
        setNoDecoratePatterns(NO_DECORATOR_PATTERNS);
        setFragmentNames(FRAGMENT_NAMES);
    }

    private EnonicContentRetriever setUpContentRetriever() {
        EnonicContentRetriever contentRetriever = new EnonicContentRetriever(APPLICATION_NAME);
        contentRetriever.setBaseUrl(System.getProperty("dialogarena.cms.url"));
        contentRetriever.setRefreshIntervalSeconds(1800);
        contentRetriever.setHttpTimeoutMillis(10000);
        return contentRetriever;
    }
}
