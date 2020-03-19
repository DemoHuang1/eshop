package com.shop.med.entity;

import com.shop.med.entity.User;
import lombok.Data;
import org.springframework.security.crypto.password.PasswordEncoder;

@Data
public class RegistrationForm {

    private String username;
    private String password;

    public User toUser(PasswordEncoder passwordEncoder){
        return new User(username,passwordEncoder.encode(password));
    }
}
