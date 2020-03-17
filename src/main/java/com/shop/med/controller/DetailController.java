package com.shop.med.controller;

import com.shop.med.entity.Medicine;
import com.shop.med.service.MedicineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("/details")
public class DetailController {

    @Autowired
    private MedicineService service;

    //根据id显示药品
    @GetMapping(value = "")
    public String showDetail(@RequestParam("id")String id, Model model){
        Medicine detail=service.findById(id);
        model.addAttribute("detail",detail);
        return "detail";
    }

    //根据id删除药品
    @GetMapping(value = "/delete")
    public String deleteById(@RequestParam("id")String id){
        service.deleteById(id);
        return "home";
    }
}
