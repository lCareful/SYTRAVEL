package com.sy.travel.utils;

import java.io.IOException;
import java.io.Serializable;
import java.util.LinkedHashMap;
import java.util.Map;

import com.fasterxml.jackson.core.JsonParser.Feature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sy.travel.exception.SYException;
/**
 * 对页面传入的数据的一种统一要求：全部传递json格式的数据
 * @author liuxin
 *
 */
public class JSON extends LinkedHashMap<String, Object> implements Serializable {
	private static final long serialVersionUID = -7830458980023645817L;
	private static ObjectMapper objectMapper = new ObjectMapper();
	private static void init() {
		objectMapper.configure(Feature.ALLOW_UNQUOTED_CONTROL_CHARS, true);
		objectMapper.configure(Feature.ALLOW_NON_NUMERIC_NUMBERS, true);
		objectMapper.configure(Feature.ALLOW_BACKSLASH_ESCAPING_ANY_CHARACTER, true);
		objectMapper.configure(Feature.ALLOW_SINGLE_QUOTES, true);
		objectMapper.configure(Feature.ALLOW_NUMERIC_LEADING_ZEROS, true);
		objectMapper.configure(Feature.ALLOW_UNQUOTED_FIELD_NAMES, true);
		objectMapper.configure(Feature.STRICT_DUPLICATE_DETECTION, true);
	}
	
	public JSON() {
	}
	public static JSON parse(Map map) {
		init();
		JSON json = new JSON();
		json.putAll(map);
		return json;
	}
	
	public static JSON parse(String jsonString) {
		init();
		try {
			return objectMapper.readValue(jsonString, JSON.class);
		} catch (IOException e) {
			throw new SYException();
		}
	}
	
	public static Map parseToMap(String jsonString) throws IOException {
		init();
		return objectMapper.readValue(jsonString, Map.class);
	}
}
