package com.sy.travel.dao;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.sy.travel.entity.User;

/**
 * 对用户信息进行数据库操作的持久层
 * @author liuxin
 *
 */
public interface SYUserRepository extends JpaRepository<User, Integer>{
	/**
	 * 通过用户名从数据库查询此用户的信息
	 * @param username	用户名
	 * @return
	 */
	public User findByUsername(String username);
	/**
	 * 通过用户名从数据库模糊查询
	 * @param username	用户名
	 * @return
	 */
	public List<User> findByUsernameLike(String username);
	public Page<User> findByUsernameLike(String username, Pageable page);
	public long countByUsernameLike(String name);
}
