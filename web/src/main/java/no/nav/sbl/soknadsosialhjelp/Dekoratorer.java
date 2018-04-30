package no.nav.sbl.soknadsosialhjelp;

import no.nav.innholdshenter.common.EnonicContentRetriever;
import no.nav.innholdshenter.filter.DecoratorFilter;

import java.util.ArrayList;
import java.util.List;

import static java.util.Arrays.asList;

public class Dekoratorer extends DecoratorFilter {

    private static final String FRAGMENTS_URL = "common-html/v4/navno";
    private static final List<String> NO_DECORATOR_PATTERNS = new ArrayList<>(asList(".*/img/.*", ".*/css/.*", ".*/js/.*", ".*/font/.*", ".*selftest.*"));

    public Dekoratorer() {
        super();
        setFragmentsUrl(FRAGMENTS_URL);
        setContentRetriever(appresContentRetriever());
        setApplicationName("Sosialhjelp");
        setNoDecoratePatterns(NO_DECORATOR_PATTERNS);
        setFragmentNames(asList(
                "webstats-ga-notrack",
                "header-withmenu",
                "footer",
                "scripts",
                "styles",
                "megamenu-resources"
        ));
    }

    private EnonicContentRetriever appresContentRetriever() {
        EnonicContentRetriever contentRetriever = new EnonicContentRetriever(10000);
        contentRetriever.setBaseUrl(System.getProperty("dialogarena.cms.url"));
        contentRetriever.setRefreshIntervalSeconds(1800);
        return contentRetriever;
    }
}
