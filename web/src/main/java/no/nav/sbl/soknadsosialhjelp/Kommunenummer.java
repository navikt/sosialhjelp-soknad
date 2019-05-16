package no.nav.sbl.soknadsosialhjelp;

import org.apache.commons.io.IOUtils;

import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLSocketFactory;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;

public class Kommunenummer extends HttpServlet {

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        HttpsURLConnection urlConnection = (HttpsURLConnection) new URL("https://www.google.com").openConnection();
        urlConnection.setSSLSocketFactory((SSLSocketFactory) SSLSocketFactory.getDefault());
        response.setStatus(urlConnection.getResponseCode());
        response.setContentType(urlConnection.getContentType());
        try (InputStream inputStream = urlConnection.getInputStream(); ServletOutputStream writer = response.getOutputStream()) {
            IOUtils.copy(inputStream, writer);
        }

    }
}