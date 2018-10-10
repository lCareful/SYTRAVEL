package com.sy.travel.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;

import com.sy.travel.dao.SYLoggerRepository;
import com.sy.travel.entity.Logger;

/**
 * 日志的服务层处理
 * @author liuxin
 *
 */
@Service
public class SYLoggerService {
	@Autowired
	private SYLoggerRepository syLoggerRepository;
	/**
	 * 保存操作日志
	 * @param logger
	 * @return
	 */
	public Logger save(Logger logger) {
		return syLoggerRepository.save(logger);
	}
	
	/**
	 * 查看所有的操作日志信息
	 * @return
	 */
	public Map<String, Object> all(int pageNum, int pageSize){
		//先按时间倒序排序再分页
		Sort sort = new Sort(Direction.DESC, "start");
		PageRequest pageReq = new PageRequest(pageNum-1, pageSize, sort);
		Map<String, Object> resultMap = new HashMap<>();
		long count = syLoggerRepository.count();
		Page<Logger> list = syLoggerRepository.findAll(pageReq);
		if(list == null || list.getSize() == 0) {
			resultMap.put("total", count);
			resultMap.put("documents", new ArrayList<>());
			return resultMap;
		}
		List<Map<String, Object>> temp = new ArrayList<>();
		for(Logger logger : list) {
			Map<String, Object> map = new HashMap<>(logger.toMap());
			temp.add(map);
		}
		resultMap.put("total", count);
		resultMap.put("documents", temp);
		return resultMap;
	}
}
