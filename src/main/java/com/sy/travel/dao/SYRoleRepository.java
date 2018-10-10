package com.sy.travel.dao;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.sy.travel.entity.Role;

/**
 * 角色的数据库操作
 * @author liuxin
 *
 */
public interface SYRoleRepository extends JpaRepository<Role, Integer>{
	/**
	 * 通过团队id查看这个团队下所有角色的信息
	 * @param teamId
	 * @return
	 */
	public List<Role> findByTeamId(Integer teamId);
	public Page<Role> findByTeamId(Integer teamId, Pageable page);
	public long countByTeamId(Integer teamId);
	/**
	 * 通过角色名查看这个角色的信息
	 * @param name
	 * @return
	 */
	public Role findByName(String name);
}
