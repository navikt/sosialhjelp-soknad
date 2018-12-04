package no.nav.sbl.soknadsosialhjelp;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import no.nav.sbl.soknadsosialhjelp.duplicated.Jetty;


public class ShutdownHook extends Thread {

    private static final Logger LOGGER = LoggerFactory.getLogger(ShutdownHook.class);

    public ShutdownHook(Jetty jetty) {
        super(new Hook(jetty));
    }

    private static class Hook implements Runnable {
        private final Jetty jetty;

        public Hook(Jetty jetty) {
            this.jetty = jetty;
        }

        @Override
        public void run() {
            try {
                LOGGER.info("shutdown initialized, allowing incoming requests for 5 seconds before continuing");
                Thread.sleep(5000L);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }

            LOGGER.info("shutting down server");
            jetty.stop.run();
            LOGGER.info("shutdown ok");
        }
    }

}