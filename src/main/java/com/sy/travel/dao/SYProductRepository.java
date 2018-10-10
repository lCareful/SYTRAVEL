package com.sy.travel.dao;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.sy.travel.entity.Product;
/**
 * 对产品信息进行数据库操作的持久层
 * @author liuxin
 *
 */
public interface SYProductRepository extends JpaRepository<Product, Integer>{
	/**
	 * 根据团队id查询这个团队下的产品信息
	 * @param teamId
	 * @return
	 */
	public List<Product> findByTeamId(Integer teamId);
	/**
	 * 通过项目id查询这个项目下的所有产品信息
	 * @param projectId
	 * @return
	 */
	public List<Product> findByClassId(Integer classId);
	/**
	 * 根据产品名称进行模糊查询
	 * @param name
	 * @return
	 */
	public List<Product> findByNameLike(String name);
	public Page<Product> findByNameLike(String name, Pageable page);
	public long countByNameLike(String name);
	/**
	 * 通过产品名查找这个产品：产品的名称不能重复
	 * @param name
	 * @return
	 */
	public Product findByName(String name);
	/**
	 * 根据产品编号查看这个产品的信息：产品编号不能重复
	 * @param code
	 * @return
	 */
	public Product findByCode(String code);
}
