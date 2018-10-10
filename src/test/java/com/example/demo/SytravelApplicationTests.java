package com.example.demo;

import java.text.SimpleDateFormat;
import java.util.Base64;
import java.util.Date;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;
import org.junit.Test;

import com.sy.travel.entity.Team;

public class SytravelApplicationTests {

	@Test
	public void contextLoads() {
		String pwd = "admin" + ":" + "xliu25,1,";
		byte[] encode = Base64.getEncoder().encode(pwd.getBytes());
		System.out.println(new String(encode));
	}
	/**
	 * 一个SessionFactory的创建及对hibernate的使用
	 */
	@Test
	public void getSessionFoctory() {
		Configuration conf = new Configuration().configure();
		SessionFactory sf = conf.buildSessionFactory();
		Session session = sf.openSession();
		Transaction ts = session.beginTransaction();
		
		//session.save("");
		Team team = session.get(Team.class, 1);
		
		ts.commit();
		sf.close();
		session.close();
		System.out.println(team.toString());
	}
	@Test
	public void test3() {
		/*String regex = "[S][Y][-][0-9] {8}[-][A-Z] {2}[-][A-Z] {2}[0-9] {3}";
		Scanner scanner = new Scanner(System.in);
		while(true) {
			String input = scanner.nextLine();
			if(input.matches(regex)) {
				System.out.println("匹配");
			} else {
				System.out.println("不匹配");
			}
		}*/
		
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		System.out.println(sdf.format(new Date()));
	}
}
