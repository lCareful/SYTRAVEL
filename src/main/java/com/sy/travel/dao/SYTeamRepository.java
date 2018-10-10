package com.sy.travel.dao;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.sy.travel.entity.Team;

/**
 * 对团队信息进行数据库操作的持久层：
 * 继承JpaRepository，实现对数据的操作
 * @author liuxin
 *
 */
public interface SYTeamRepository extends JpaRepository<Team, Integer>{
	/**
	 * 通过团队名称从数据库进行模糊查询
	 * @param name	团队名称
	 * @return
	 */
	public List<Team> findByNameLike(String name);
	
	public Page<Team> findByNameLike(String name, Pageable page);
	
	public long countByNameLike(String name);
	/**
	 * 通过项目ID从数据库中查看此项目下的团队信息
	 * @param id	项目id
	 * @return
	 */
	public List<Team> findByProjectId(String id);
	/**
	 * 通过团队名称查看用户信息
	 * @param name
	 * @return
	 */
	public Team findByName(String name);
	/**
	 * 利用原生的sql，通过id修改团队的信息
	 * @param name
	 * @param projectId
	 * @param valid
	 * @param id
	 *//*
	@Query(value="update team set modified_date=?1,project_id=?2,valid=?3,modified_user=?4 where id=?5", nativeQuery=true)
	@Modifying
	public void updateTeamById(Date modified, String projectId, String valid, String modifiedUser, Integer id);*/
}
