package com.shop.med.controller;

import com.shop.med.entity.RegistrationForm;
import com.shop.med.entity.User;
import com.shop.med.service.MedUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * 注册账号的控制器，用于保存user对象到数据库
 */
@Controller
@RequestMapping("/register")
public class RegistrationController {

    @Autowired
    private MedUserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping
    public String registerForm(){
        return "registration";
    }

    @PostMapping
    public String processRegistration(RegistrationForm form){
        User user=form.toUser(passwordEncoder);
        userService.save(form.toUser(passwordEncoder));
        return "redirect:/login";
    }
}
