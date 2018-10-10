package com.sy.travel.common;

import java.util.Map;
/**
 * 所有实体类的父接口(基类)
 * 都要实现此接口的toMap方法
 * @author liuxin
 *
 */
public interface SY {
	/**
	 * 对实体类的统一map处理，方便遍历时获取值
	 * @return
	 */
	public Map<String, Object> toMap();
}
