package com.shop.med.controller;

import com.shop.med.service.MedUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * 测试类，用来测试登录是否成功，然后并没有卵用
 */
@Controller
@RequestMapping(value = "/login")
public class LoginController {
    @Autowired
    private MedUserService service;

    @GetMapping()
    public String login(){
        return "/login";
    }

//    @PostMapping
//    public String processRegistration(User loginForm, Errors errors){
//        if(errors.hasErrors()){
//            System.out.println(errors);
//        }
//        User user=(User)service.loadUserByUsername(loginForm.getUsername());
//        Collection<? extends GrantedAuthority> sdf = loginForm.getAuthorities();
//        System.out.println(sdf);
//        if(user.getPassword().equals(loginForm.getPassword())){
//            return "redirect:/update";
//        }
//        return "/index";
//    }
}
