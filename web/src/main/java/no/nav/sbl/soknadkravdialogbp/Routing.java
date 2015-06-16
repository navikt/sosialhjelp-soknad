package no.nav.sbl.soknadkravdialogbp;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

public class Routing extends HttpServlet {

    private String applicationFile;

    @Override
    public void init(ServletConfig config) throws ServletException {
        super.init(config);
        applicationFile = config.getInitParameter("applicationFile");
        if(!applicationFile.startsWith("/")) {
            applicationFile = "/" + applicationFile;
        }
    }

    @Override
    protected final void doGet(final HttpServletRequest request, final HttpServletResponse response) throws IOException {
        response.setContentType("text/html");
        try (InputStream input = getServletContext().getResourceAsStream(applicationFile);
             OutputStream output = response.getOutputStream()) {
            int bufferLength = 4096;
            byte[] bytes = new byte[bufferLength];
            int read = input.read(bytes, 0, bufferLength);
            while (read != -1) {
                output.write(bytes, 0, read);
                output.flush();
                read = input.read(bytes, 0, bufferLength);
            }
        }
    }

}
