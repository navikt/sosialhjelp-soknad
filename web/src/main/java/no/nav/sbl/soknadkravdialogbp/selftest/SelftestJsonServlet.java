package no.nav.sbl.soknadkravdialogbp.selftest;

import no.nav.sbl.dialogarena.common.web.selftest.SelfTestJsonBaseServlet;
import no.nav.sbl.dialogarena.types.Pingable;

import java.util.Collection;

public class SelftestJsonServlet extends SelfTestJsonBaseServlet {

    @Override
    protected Collection<? extends Pingable> getPingables() {
        return null;
    }
}
