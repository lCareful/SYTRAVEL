package com.sy.travel.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sy.travel.entity.Logger;
/**
 * 日志的持久层
 * @author liuxin
 *
 */
public interface SYLoggerRepository extends JpaRepository<Logger, Integer>{
	
}
