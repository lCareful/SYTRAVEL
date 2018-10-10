package com.sy.travel.rest;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sy.travel.common.AjaxResult;
import com.sy.travel.service.SYUserService;
import com.sy.travel.utils.JSON;

/**
 * 用户模块接口
 * @author liuxin
 *
 */
@RestController
@RequestMapping(value = "/sy/user", produces = MediaType.APPLICATION_JSON_VALUE)
public class SYUserRest {
	@Autowired
	private SYUserService syUserservice;

	/**
	 * 查看所有用户信息
	 * 当name不为空时进行模糊查询
	 * @param name
	 * @return
	 */
	@RequestMapping(value = "/all", method = RequestMethod.GET)
	public AjaxResult<Map<String, Object>> queryAll(
			@RequestParam(defaultValue = "") String name,
			@RequestParam(defaultValue = "1") int currentPage,
			@RequestParam(defaultValue = "10") int pageSize) {
		return new AjaxResult<Map<String,Object>>(200, "success", syUserservice.queryAll(name, currentPage, pageSize));
	}

	/**
	 * 添加用户信息
	 * 
	 * @param json
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/add", method = RequestMethod.POST, consumes = "application/json")
	public AjaxResult<String> add(@RequestBody JSON json, HttpServletRequest request) {
		return syUserservice.add(json, request.getRemoteUser());
	}

	/**
	 * 删除用户信息
	 * @param id
	 * @param operator
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/delete", method = RequestMethod.GET)
	public AjaxResult<String> delete(@RequestParam("id") int id, @RequestParam("operator") String operator,
			HttpServletRequest request) {
		return syUserservice.delete(id, operator);
	}

	/**
	 * 修改用户信息
	 * @param json
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/update", method = RequestMethod.POST, consumes = "application/json")
	public AjaxResult<String> update(@RequestBody JSON json, HttpServletRequest request){
		return syUserservice.update(json, request.getRemoteUser());
	}
	
	/**
	 * 修改超级管理员密码
	 * @param json
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/adminpwd", method = RequestMethod.POST, consumes = "application/json")
	public AjaxResult<String> updatePwd(@RequestBody JSON json, HttpServletRequest request){
		return syUserservice.updateAdminPwd(json, request.getRemoteUser());
	}
	
	/**
	 * 通过用户名获得用户的权限
	 * @param username
	 * @return
	 */
	@RequestMapping(value = "/permission", method = RequestMethod.GET)
	public AjaxResult<String> permission(@RequestParam("name") String username) {
		return syUserservice.getPermission(username);
	}

}
