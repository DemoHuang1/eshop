package com.shop.med.controller;

import com.shop.med.entity.Medicine;
import com.shop.med.service.MedicineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/detail")
public class DetailController {

    @Autowired
    private MedicineService service;


    //根据id删除药品
    @GetMapping(value = "/delete")
    public String deleteById(@RequestParam("id")int id){
        service.deleteById(id);
        return "redirect:/home";
    }

    //添加药品
    @PostMapping("/add")
    public String addMed(Medicine medicine){
        service.add(medicine);
        return "redirect:/home";
    }

}
