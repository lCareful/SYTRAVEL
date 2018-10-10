package com.sy.travel.dao;



import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.sy.travel.entity.Project;
/**
 * 对项目信息进行数据库操作的持久层
 * @author liuxin
 *
 */
public interface SYProjectRepository extends JpaRepository<Project, Integer>{
	/**
	 * 根据项目id从数据库查看此项目的信息
	 * @param id	项目id
	 * @return
	 */
	public Project findById(Integer id);
	/**
	 * 根据项目名称查询这个项目的信息：项目名不重复
	 * @param name
	 * @return
	 */
	public Project findByName(String name);
	/**
	 * 根据项目编号查询这个项目的信息：项目编号不重复
	 * @param code
	 * @return
	 */
	public Project findByCode(String code);
	/**
	 * 根据项目名模糊查询
	 * @param name
	 * @return
	 */
	public List<Project> findByNameLike(String name);
	/**
	 * 通过name模糊查询
	 * @param name
	 * @param page
	 * @return
	 */
	public Page<Project> findByNameLike(String name, Pageable page);
	/**
	 * 通过name进行模糊查询出总数
	 * @param name
	 * @return
	 */
	public long countByNameLike(String name);
	/**
	 * desc按开始日期降序排列
	 * @return
	 */
	//public List<Project> findAllOrderByBeginDateDesc();
	/**
	 * asc按开始日期升序排列
	 * @return
	 */
	//public List<Project> findAllOrderByBeginDateAsc();
	/**
	 * desc按结束日期降序排列
	 * @return
	 */
	//public List<Project> findAllOrderByEndDateDesc();
	/**
	 * asc按结束日期升序排列
	 * @return
	 */
	//public List<Project> findAllOrderByEndDateAsc();
	/**
	 * 更新项目信息
	 * @param id
	 * @return
	 */
	//public boolean updateProjectById(Integer id);
}
