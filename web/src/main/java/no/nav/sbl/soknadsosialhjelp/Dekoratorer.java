package no.nav.sbl.soknadsosialhjelp;

import no.nav.innholdshenter.common.EnonicContentRetriever;
import no.nav.innholdshenter.filter.DecoratorFilter;

import java.util.ArrayList;
import java.util.List;

import static java.util.Arrays.asList;

public class Dekoratorer extends DecoratorFilter {

    private static final String FRAGMENTS_URL = "common-html/v4/navno";
    private static final String APPLICATION_NAME = "Sosialhjelp";
    private static final List<String> NO_DECORATOR_PATTERNS = new ArrayList<>(asList(".*/img/.*", ".*/css/.*", ".*/js/.*", ".*/font/.*", ".*selftest.*"));
    private static final List<String> FRAGMENT_NAMES= new ArrayList<>(asList("webstats-ga-notrack", "styles", "scripts", "footer", "header"));
    private static final EnonicContentRetriever ENONIC_CONTENT_RETRIEVER = new EnonicContentRetriever(10000, System.getProperty("dialogarena.cms.url"), 1800);

    public Dekoratorer() {
        super(FRAGMENTS_URL, ENONIC_CONTENT_RETRIEVER, FRAGMENT_NAMES, APPLICATION_NAME);
        setNoDecoratePatterns(NO_DECORATOR_PATTERNS);
    }
}
