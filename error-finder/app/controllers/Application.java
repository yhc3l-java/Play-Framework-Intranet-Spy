package controllers;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;

import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;

import com.fasterxml.jackson.databind.node.ObjectNode;

public class Application extends Controller {

	public static Result index() {
		return redirect("/index.html");
	}
	
	public static Result getStatusForIp(String ip) throws Exception {
		URL url = new URL ("http://" + ip + ":9000/");
		URLConnection connection;
		try {
			connection = url.openConnection();
		connection.setConnectTimeout(1500);
		
		connection.connect();

		if (connection instanceof HttpURLConnection)
		{
			HttpURLConnection httpConnection = (HttpURLConnection) connection;
			int code = httpConnection.getResponseCode();
			
			return returnCode(code);
		}
		} catch (IOException e) {
			return returnCode("?");
		}

		return returnCode("?");
	}

	private static Result returnCode(int code) {
		ObjectNode result = Json.newObject();
		result.put("status", code);
		return ok(result);
	}

	private static Result returnCode(String code) {
		ObjectNode result = Json.newObject();
		result.put("status", code);
		return ok(result);
	}

}
