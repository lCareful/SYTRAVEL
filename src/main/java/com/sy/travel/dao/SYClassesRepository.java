package com.sy.travel.dao;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.sy.travel.entity.Classes;

/**
 * 分类信息的数据库操作
 * 
 * @author liuxin
 *
 */
public interface SYClassesRepository extends JpaRepository<Classes, Integer> {
	/**
	 * 通过分类名模糊查询
	 * 
	 * @param name
	 * @return
	 */
	public List<Classes> findByNameLike(String name);
	
	public Page<Classes> findByNameLike(String name, Pageable page);
	
	public long countByNameLike(String name);

	/**
	 * 通过分类名称查询这个分类的信息：在判断分类名称是否唯一时使用
	 * 
	 * @param name
	 * @return
	 */
	public Classes findByName(String name);

	/**
	 * 通过分类序号查询这个分类的信息：在判断分类序号是否唯一时使用
	 * 
	 * @param sortId
	 * @return
	 */
	public Classes findBySortId(Integer sortId);
	/**
	 * 通过父类id查询属于这个id的所有子类的信息
	 * @param parentId
	 * @return
	 */
	public List<Classes> findByParentId(Integer parentId);
}
