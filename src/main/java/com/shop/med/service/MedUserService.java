package com.shop.med.service;

import com.shop.med.dao.UserDao;
import com.shop.med.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 *
 */
@Service(value = "medUserDetailsService")
public class MedUserService implements UserDetailsService {

    private UserDao userDao;

    @Autowired
    public MedUserService(UserDao userDao) {
        this.userDao = userDao;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user=userDao.findByUsername(username);
        if(user!=null){
            return user;
        }
        throw new UsernameNotFoundException("User '"+username+"' not found");
    }

    public User save(User user){
        return userDao.save(user);
    }
}