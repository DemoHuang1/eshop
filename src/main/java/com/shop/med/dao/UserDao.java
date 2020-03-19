package com.shop.med.dao;

import com.shop.med.entity.User;
import org.springframework.data.repository.CrudRepository;

public interface UserDao extends CrudRepository<User,Long> {

      User findByUsername(String username);

      User save(User user);
}
