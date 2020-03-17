package com.shop.med.controller;

import com.shop.med.entity.Medicine;
import com.shop.med.service.MedicineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping()
public class MedicineController {

    @Autowired
    private MedicineService service;

    @GetMapping()
    public String home(Model model){
        List<Medicine> list=service.findAll();
        model.addAttribute("list",list);  //主页面显示的内容，list包含了所有要展示的药品列表
        return "/home";
    }

}
