package no.nav.sbl.soknadsosialhjelp;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

public class FeatureServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        Map<String, String> toggles = hentFrontendFeatureToggles();
        String jsonOutput = mapTilJsonString(toggles);

        resp.setContentType("application/json");
        resp.getWriter().print(jsonOutput);
    }


    private Map<String, String> hentFrontendFeatureToggles() {
        Map<String, String> features = new HashMap<>();

        Set<String> props = System.getProperties().stringPropertyNames();

        for (String prop : props) {
            if (prop.startsWith("feature.frontend.")) {
                features.put(prop, System.getProperty(prop));
            }
        }

        return features;
    }

    private String mapTilJsonString(Map<String, String> map) {
        StringBuilder sb = new StringBuilder();
        sb.append("{\n");

        int items = 0;
        for (Map.Entry<String, String> entry : map.entrySet()) {
            sb.append("\"").append(entry.getKey()).append("\": ");
            sb.append("\"").append(entry.getValue()).append("\"");
            if (++items < map.size()) {
                sb.append(",\n");
            }
        }

        sb.append("\n}");

        return sb.toString();
    }
}
